const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

global.users = new Map();

// 增加用户
router.post('/newUser',(req,res) =>{
    var sql=`SELECT * FROM user WHERE email = "${req.body.email}"`;
    db(sql,(result)=>{
        if(result.length!==0){
            res.status(200).json({ code:0 });
        }
        else {
            var sql1=`INSERT INTO user (email,password) VALUES ("${req.body.email}","${req.body.password}")`;
            db(sql1,(result)=>{
                res.status(200).json({ code:1 });
            })
        }
    })
})

// 查询登录
router.post('/login', (req,res) =>{
    var sql=`SELECT * FROM user WHERE email ="${req.body.email}"AND password = "${req.body.password }"`;
    db(sql,(result)=>{
        if(result.length==0){
            res.status(200).json({ code:0 });
        }
        else {
          let key = Number(result[0].userID)+new Date().getTime();
          global.users.set(key,result[0].userID);
          res.status(200).json({ code:1,token:key });
        }
    })
})

// 退出登录
router.get('/out',(req,res)=>{
    let token = Number(req.headers.token);
    global.users.delete(token);
    res.status(200).send(`ok`);
})

module.exports=router;