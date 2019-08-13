var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');

// 判断当前用户是否已关注
router.post('/checkFriend',(request,response)=>{
    var sql = `SELECT COUNT(*)
    FROM friend WHERE userID = ${request.body.userID} AND friendID = ${request.body.friendID}`;
    db(sql,(result)=>{
      response.status(200).json({ code:200,isFriend:result});
    })
})

// 收藏一个相簿
router.post('/photoCollection',(request,response)=>{
    var sql = `INSERT INTO photocollection (userID,photoID,TIME)
    VALUES (${request.body.userID},${request.body.photoID},'${request.body.time}')`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'收藏成功'});
    })
})

// 检查当前相簿是否被收藏过
router.post('/checkPhotoCollection',(request,response)=>{
    var sql = `SELECT COUNT(*)
    FROM photocollection
    WHERE userID = ${request.body.userID} AND photoID = ${request.body.photoID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,isCollection:result});
    })
})

// 检查当前步行街帖子是否被收藏过
router.post('/checkStreetCollection',(request,response)=>{
    var sql = `SELECT COUNT(*)
    FROM streetcollection
    WHERE userID = ${request.body.userID} AND streetID = ${request.body.streetID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,isCollection:result});
    })
})

// 收藏一个步行街帖子
router.post('/streetCollection',(request,response)=>{
    var sql = `INSERT INTO streetcollection (userID,streetID,TIME)
    VALUES (${request.body.userID},${request.body.streetID},'${request.body.time}')`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'收藏成功'});
    })
})

// 查询用户收藏的相簿
router.get('/getPhotoCollection',(request,response)=>{
    if(request.session.user){
        var sql = `SELECT photo.userID,photo.src,photocollection.time,photocollection.photoID,photo.title
        FROM photo,photocollection
        WHERE photo.photoID = photocollection.photoID
        AND photocollection.userID = ${request.session.user}`;
        db(sql,(result)=>{
            response.status(200).json({ code:200,photoCollection:result});
        })
    }

})

// 取消关注某个相簿
router.post('/unlikePhoto',(request,response)=>{
    var sql = `DELETE FROM photocollection
    WHERE userID = ${request.body.userID} AND photoID = ${request.body.photoID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'取消收藏成功'});
    })
})

// 取消关注某个步行街帖子
router.post('/unlikeStreet',(request,response)=>{
    var sql = `DELETE FROM streetcollection
    WHERE userID = ${request.body.userID} AND streetID = ${request.body.streetID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'取消收藏成功'});
    })
})

// 查询用户收藏的步行街帖子
router.get('/getStreetCollection',(request,response)=>{
    if(request.session.user){
        var sql = ` SELECT street.streetID,streetcollection.time,street.topic
        FROM street,streetcollection
        WHERE street.streetID = streetcollection.streetID
        AND streetcollection.userID = ${request.session.user}`;
        db(sql,(result)=>{
            response.status(200).json({ code:200,streetCollection:result});
        })
    }
})

//导出router
module.exports=router;