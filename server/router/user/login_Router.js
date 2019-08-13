var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');
const nodemailer = require('nodemailer');

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

// 发送邮件验证码
router.post('/sendSms', (request,response) =>{
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: '2875888382@qq.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: 'gzubotdktaesdfai',
        }
    });
    var smsNum='';
    for(var i=0;i<6;i++){
      smsNum+=Math.floor(Math.random()*10);
    }

    var mailOptions = {
      from: '2875888382@qq.com', // sender address
      to: request.body.email, // list of receivers
      subject: 'Hello', // Subject line
      // 发送text或者html格式
      // text: 'Hello world?', // plain text body
      html: '<h3>你的验证码为：</h3><b>'+smsNum+'</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    response.status(200).json({message:"验证码已发送",code:200,sms:smsNum});
})

//导出router
module.exports=router;