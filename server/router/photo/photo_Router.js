var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');

// 查询当前相簿是否已收藏
router.get('/checkPhotoCollection',(request,response)=>{
    var sql = `SELECT COUNT(*)
    FROM photocollection
    WHERE userID = ${request.session.user} AND photoID = ${request.query.photoID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,isCollection:result});
    })
})
// 查询一组相簿
router.get('/getPhoto',(request,response) => {
    var begin = (request.query.group -1)*10;
    var sql = `SELECT photo.src,photo.title,photo.photoID,user.avatar,user.nickName
    FROM USER,photo
    WHERE user.userID = photo.userID
    LIMIT ${begin},10`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,photo:result });
    })
})
// 查询相簿的数量
router.get('/getPhotoCount',(request,response) => {
    var sql = `SELECT COUNT(*) FROM photo`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,photoCount:result[0]["COUNT(*)"] });
    })
})
// 查询相簿详细内容
router.get('/getPhotoDetails',(request,response) => {
    var sql = `SELECT photo.title,user.avatar,user.nickName,photo.tags,photo.view,photo.praise,photo.time,user.level,photo.photo,user.userID
    FROM USER,photo
    WHERE user.userID = photo.userID
    AND photoID = ${request.query.photoID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,photoDetails:result });
    })
})
// 增加点赞量
router.get('/photoPraise',(request,response)=>{
    var sql = `UPDATE photo SET praise = praise + 1 WHERE photoID = ${request.query.photoID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'success'});
    })
})
// 增加阅读量
router.get('/addPhotoView',(request,response) =>{
    var sql = `UPDATE photo SET view = view + 1  WHERE photoID =${request.query.photoID} `;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'阅读量增加' });
    })
})
// 增加相簿
router.post('/addNewPhoto',(request,response)=>{
    var sql = `INSERT INTO photo (userID,tags,src,title,TIME,photo)
    VALUES(${request.session.user},'${request.body.tags}',
    '${request.body.src}','${request.body.title}','${request.body.time}',
    '${request.body.photo}')`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'success'});
    })
})
// 增加收藏一个相簿
router.post('/photoCollection',(request,response)=>{
    var sql = `INSERT INTO photocollection (userID,photoID,TIME)
    VALUES (${request.session.user},${request.body.photoID},'${request.body.time}')`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'收藏成功'});
    })
})
// 修改点赞量
router.get('/cancelPhotoPraise',(request,response)=>{
    var sql = `UPDATE photo SET praise = praise - 1 WHERE photoID = ${request.query.photoID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'success'});
    })
})
// 删除关注某个相簿
router.get('/unlikePhoto',(request,response)=>{
    var sql = `DELETE FROM photocollection
    WHERE userID = ${request.session.user} AND photoID = ${request.query.photoID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'取消收藏成功'});
    })
})


//导出router
module.exports=router;