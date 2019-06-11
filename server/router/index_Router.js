var fs=require('fs');
var express=require('express');
var router=express.Router();
var mysql=require('mysql');
const nodemailer = require('nodemailer');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    port: '3306', 
    database:'videos',
    multipleStatements: true // 支持执行多条 sql 语句
});

//https://blog.csdn.net/bipedal_bit/article/details/48246963
//用于处理第二次连接数据库出现error的问题
function handleDisconnect(connection) {
    connection.on('error', function(err) {
      if (!err.fatal) {
        return;
      }
   
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
      }
   
      console.log('Re-connecting lost connection: ' + err.stack);
   
      connection = mysql.createConnection(connection.config);
      handleDisconnect(connection);
      connection.connect();
    });
};

//获取轮播图接口
router.get('/getLunBo',function(request,response){
  connection.connect();
  var sql='SELECT  * FROM `shufflingfigure`limit 0,5';
  connection.query(sql, function (error, result) {
      if (error){
          response.status(500).send('server error');
      }                
      response.send(  result    );  
  });
  handleDisconnect(connection);
}) 

//获取娱乐视频接口
router.get('/getEntertainmentVideo',function(request,response){
  connection.connect();
  var sql='SELECT  * FROM `entertainmentvideo`limit 0,8';
  connection.query(sql, function (error, result) {
      if (error){
          response.status(500).send('server error');
      }                
      response.send(  result    );
  });
  handleDisconnect(connection);
}) 
//获取篮球视频接口
router.get('/getBasketballVideo',function(request,response){
  connection.connect();
  var sql='SELECT  * FROM `basketballvideo`limit 0,8';
  connection.query(sql, function (error, result) {
      if (error){
          response.status(500).send('server error');
      }                
      response.send(  result    );
  });
  handleDisconnect(connection);
}) 
//获取推荐视频接口
router.get('/getRecommendVideo',function(request,response){
  connection.connect();
  var sql='SELECT  * FROM `recommendvideo`limit 0,4';
  connection.query(sql, function (error, result) {
      if (error){
          response.status(500).send('server error');
      }                
      response.send(  result    );
  });
  handleDisconnect(connection);
}) 
//注册接口
router.post('/newUser',function(request,response){

  connection.connect();
  var sql='SELECT * FROM user WHERE email ='+ '"'+request.body.email+'"';
  connection.query(sql, function (error, result) {
      if (error) {
          response.status(500).json({  message:"server error",code:500  });           
      }             
      if(result.length!==0){
          response.status(200).json({  message:"该邮箱已经注册过了" ,code:0 }); 
                  
      }
      else {
          var sql1='INSERT INTO user (email,password) VALUES ('+'"'+request.body.email+'",'+'"'+request.body.password+'")';
          connection.query(sql1,function(error,result){
              if(error){
                  response.status(500).json({  message:"server error",code:500  });
              }else{
                  //使用session记录登录状态
                  request.session.user=request.body;                 
                  response.status(200).json({  message:"注册成功",code:1 ,user:request.session.user.email  }); 
              }
          });           
      }      
  });
  handleDisconnect(connection);
})

//处理登录请求接口
router.post('/login',function(request,response){
  connection.connect();
  //查找账号密码是否存在
  var sql='SELECT * FROM user WHERE email ='+ '"'+request.body.email+'"AND password = "'+request.body.password +'"';
  connection.query(sql, function (error, result) {
      if (error) {
          response.status(500).json({  message:"server error",code:500  });           
      }             
      if(result.length==0){
          response.status(200).json({  message:"账号或密码错误" ,code:0 }); 
                  
      }
      else {          
          //使用session记录登录状态
          request.session.user=request.body;
          
          response.status(200).json({  message:"登录成功",code:1,user:request.session.user.email  });                 
          
      }      
  });
  handleDisconnect(connection);
  
}); 

//返回登陆状态列表接口
router.get('/getLoginUser',function(request,response){
  if(request.session.user){  
    response.status(200).json({user:request.session.user });
  }else{
    response.status(200).json({  message:"没有登录记录",code:600  });
  }

})

//退出登录接口
router.get('/logOut',function(request,response){
    request.session.user=null;
    response.status(200).json({  message:"退出成功",code:700  });
})

//获取用户信息接口
router.get('/getLoginUserInfo',function(request,response){
  if(request.session.user){    
      connection.connect();
      var sql='SELECT * FROM user WHERE email ='+ '"'+request.session.user.email+'"';
      connection.query(sql, function (error, result) {
          if (error){
              response.status(500).send('server error');
          }                
          response.status(200).json(result); 
      });
      handleDisconnect(connection);  
  }else{
    response.status(200).json({  message:"没有登录记录",code:600  });
  }

  
})

//更新用户信息接口
router.post('/updateUserInfo',function(request,response){
  connection.connect();  
      var sql= 'UPDATE `user` SET `nickName` ="'+request.body.update.nickName+'",`gender`="'+request.body.update.gender+'",`birthday`="'+request.body.update.birth+'",`sign`="'+request.body.update.sign+'",`telephone`="'+request.body.update.telephone+'" WHERE `email` ='+'"'+request.body.email +'"';
      connection.query(sql, function (error, result) {
          if (error){
              response.status(500).send('server error');
          }                
          response.status(200).json({  message:"修改成功",code:200  });
      });
      handleDisconnect(connection);   
})

//上传头像接口
router.post('/uploadAvatar',function(request,response){
  connection.connect();  
  
  var sql=' UPDATE USER SET avatar = "'+request.body.content+'" WHERE email = "'+request.session.user.email+'"';
  connection.query(sql, function (error, result) {
      if (error){
          response.status(500).send('server error');
      }                
      response.status(200).json({message:"上传成功",code:200});
  });
  handleDisconnect(connection);   
})

//上传头像接口
router.post('/uploadAvatarT',function(request,response){
  connection.connect(); 
  var sql=' UPDATE USER SET avatar = "'+request.body.src+'" WHERE email = "'+request.session.user.email+'"';
  connection.query(sql, function (error, result) {
      if (error){
          response.status(500).send('server error');
      }                
      response.status(200).json({message:"上传成功",code:200});
  });
  handleDisconnect(connection);   
})

//发送邮件验证码接口
router.post('/sendSms',function(request,response){
      
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

//获取用户安全信息接口
router.get('/getSafeIfo',function(request,response){
  if(request.session.user){     
    connection.connect();
    var sql='SELECT qq,telephone,safenum FROM USER WHERE email = "'+request.session.user.email+'"';
    connection.query(sql, function (error, result) {
        if (error){
            response.status(500).send('server error');
        }                
        response.status(200).json(result);
    });
    handleDisconnect(connection);
  }   
})

//删除好友接口
router.post('/deleteFriend',function(request,response){
  if(request.session.user){    
    connection.connect();  
    var sql = 'DELETE FROM friend WHERE userEmail = "'+request.session.user.email +'" AND friendEmail = "'+request.body.delete+'"';
    connection.query(sql, function (error, result) {
        if (error){
            response.status(500).send('server error');
        }                
        response.status(200).json({message:'删除成功'});
    });
    handleDisconnect(connection);
  }   
})

//获取好友列表接口
router.get('/getFriends',function(request,response){
  if(request.session.user){    
    connection.connect();  
    var sql = 'SELECT * FROM friend  WHERE userEmail = "'+  request.session.user.email +'"'; 
    connection.query(sql, function (error, result) {
        if (error){
            response.status(500).send('server error');
        }                
        response.status(200).json(result);
    });
    handleDisconnect(connection);
  }   
})

//导出router
module.exports=router;