const express=require('express');
const router=express.Router();
const db = require('../../mysql.js');

global.users = new Map();

// 增加用户
router.post('/newUser',(request,response) =>{
    var sql='SELECT * FROM user WHERE email ='+ '"'+request.body.email+'"';
    db(sql,(result)=>{
        if(result.length!==0){
            response.status(200).json({  message:"该邮箱已经注册过了" ,code:0 });
        }
        else {
            var sql1='INSERT INTO user (email,password) VALUES ('+'"'+request.body.email+'",'+'"'+request.body.password+'")';
            db(sql1,(result)=>{
                response.status(200).json({  message:"注册成功",code:1 });
            })
        }
    })
})

// 查询登录
router.post('/login', (request,response) =>{
    var sql=`SELECT * FROM user WHERE email ="${request.body.email}"AND password = "${request.body.password }"`;
    db(sql,(result)=>{
        if(result.length==0){
            response.status(200).json({  message:"账号或密码错误" ,code:0 });
        }
        else {
          //使用session记录登录状态
          request.session.user=result[0].userID;
          let key = Number(result[0].userID)+new Date().getTime();
          global.users.set(key,result[0].userID);
          response.status(200).json({  message:"登录成功",code:1,token:key });
        }
    })
});

//导出router
module.exports=router;