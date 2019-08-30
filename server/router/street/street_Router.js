var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');

// 增加回复
router.post('/addReply',(request,response) => {
    var sql = `INSERT INTO streetReply(streetID,userID,TIME,content) VALUES (${request.body.newReply.streetID},
    '${request.body.newReply.userID}','${request.body.newReply.time}','${request.body.newReply.content}')`;
    db(sql,(result)=>{
        response.status(200).json({ code:200 });
    })
})
// 增加帖子
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

// 增加帖子回复量
router.get('/addStreetReply',(request,response) =>{
    var sql = ` UPDATE street SET replyCount = replyCount + 1  WHERE streetID = ${request.query.streetID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'回复量增加' });
    })
})

// 修改点赞量
router.get('/streetReplyPraise',(request,response)=>{
    var sql = `UPDATE streetreply SET praise = praise + 1 WHERE streetReplyID = ${request.query.streetReplyID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'success'});
    })
})

//导出router
module.exports=router;