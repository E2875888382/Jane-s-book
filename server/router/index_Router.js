var fs=require('fs');
var express=require('express');
var router=express.Router();
var mysql=require('mysql');
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

//处理登录请求
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

//返回登陆状态列表
router.get('/getLoginUser',function(request,response){
  if(request.session.user){  
    response.status(200).json({user:request.session.user });
  }else{
    response.status(200).json({  message:"没有登录记录",code:600  });
  }

})


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

//刷新用户数据接口
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




  //导出router
module.exports=router;