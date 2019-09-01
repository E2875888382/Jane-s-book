const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

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

module.exports=router;