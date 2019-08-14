var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');

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
                //使用session记录登录状态
                request.session.user=request.body;
                response.status(200).json({  message:"注册成功",code:1 ,user:request.session.user.email  });
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
          response.status(200).json({  message:"登录成功",code:1 });
        }
    })
});

// 退出登录
router.get('/logOut', (request,response) =>{
    request.session.user=null;
    response.status(200).json({  message:"退出成功",code:700  });
})

//导出router
module.exports=router;