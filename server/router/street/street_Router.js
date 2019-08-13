var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');

//查询步行街帖子
router.get('/getStreet',(request,response) =>{
    var begin = (request.query.page -1)*20;
    var sql = `SELECT street.topic,street.time,street.view,street.replyCount,user.nickName,street.streetID
    FROM street,USER
    WHERE street.userID = user.userID
    LIMIT ${begin},20`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,streetList:result });
    })
})

// 查询帖子数量
router.get('/getStreetCount',(request,response) => {
    var sql = `SELECT COUNT(*) FROM street`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,streetCount:result });
    })
})

// 查询帖子正文
router.get('/getStreetDetails',(request,response) => {
    var sql = `SELECT street.topic,street.time,street.view,street.replyCount,user.nickName,user.level,user.avatar,street.replyCount,street.img,street.content
    FROM street,USER
    WHERE street.userID = user.userID AND
    streetID = ${request.query.streetID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,streetDetails:result });
    })
})

// 查询所有回复
router.get('/getStreetReply',(request,response) => {
    var sql = ` SELECT user.avatar,user.nickName,streetReply.time,streetReply.praise,user.level,streetReply.content,streetreply.streetReplyID
    FROM USER,streetReply
    WHERE user.userID = streetReply.userID AND streetID = ${request.query.streetID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,streetReply:result });
    })
})

// 添加回复
router.post('/addReply',(request,response) => {
    var sql = `INSERT INTO streetReply(streetID,userID,TIME,content) VALUES (${request.body.newReply.streetID},
    '${request.body.newReply.userID}','${request.body.newReply.time}','${request.body.newReply.content}')`;
    db(sql,(result)=>{
        response.status(200).json({ code:200 });
    })
})

// 发新帖
router.post('/uploadNewStreet', (request,response) =>{
    var newStreet = request.body.new;
    if(request.body.new.img[0]){
        newStreet.img = request.body.new.img[0].content;
    }else{
        newStreet.img = '';
    }
    var sql=`INSERT INTO street(topic,userID,TIME,content,img)
    VALUES('${newStreet.topic}','${newStreet.userID}','${newStreet.time}','${newStreet.content}','${newStreet.img}')`;
    db(sql,(result)=>{
        response.status(200).json({message:"上传成功",code:200});
    })
})

//增加帖子浏览量
router.get('/addStreetView',(request,response) =>{
    var sql = ` UPDATE street SET view = view + 1  WHERE streetID = ${request.query.streetID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'阅读量增加' });
    })
})

//增加帖子回复量
router.get('/addStreetReply',(request,response) =>{
    var sql = ` UPDATE street SET replyCount = replyCount + 1  WHERE streetID = ${request.query.streetID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'回复量增加' });
    })
})

// 查询所有最后回复
router.get('/getLastReply',(request,response) =>{
    var sql = `SELECT TIME,streetID,user.nickName
    FROM (streetReply RIGHT JOIN (SELECT MAX(TIME) AS ti ,streetId AS id FROM streetReply GROUP BY streetId) A ON streetReply.streetID =A.id AND streetReply.time=A.ti) LEFT JOIN USER ON streetReply.userID=user.userID`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,lastReply:result });
    })
})

// 评论的点赞+1
router.get('/streetReplyPraise',(request,response)=>{
    var sql = `UPDATE streetreply SET praise = praise + 1 WHERE streetReplyID = ${request.query.streetReplyID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'success'});
    })
})

//导出router
module.exports=router;