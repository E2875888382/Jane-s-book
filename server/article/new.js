const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

// 发布文章
router.post('/uploadNewStreet', (req,res) =>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let time = new Date().toLocaleString();
    var newStreet = req.body.new;
    if(req.body.new.img[0]){
        newStreet.img = req.body.new.img[0].content;
    }else{
        newStreet.img = '';
    }
    let sql=`INSERT INTO street(topic,userID,TIME,content,img)
    VALUES('${newStreet.topic}','${current}','${time}','${newStreet.content}','${newStreet.img}')`;
    new Promise((resolve)=>{
        db(sql,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).json({code:200});
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;