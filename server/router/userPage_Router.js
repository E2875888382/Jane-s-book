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
//获取好友列表接口
router.post('/getFriends',(request,response) =>{
      connection.connect();
      var sql = `SELECT * FROM friend  WHERE userEmail = "${ request.body.user} "`;
      connection.query(sql,  (error, result) => {
          if (error){
              response.status(500).send('server error');
          }
          response.status(200).json(result);
      });
      handleDisconnect(connection);
  })

//获取用户信息接口
router.get('/getLoginUserInfo', (request,response) =>{
    if(request.session.user){
        connection.connect();
        var sql=`SELECT * FROM user WHERE email = "${request.session.user.email}"`;
        connection.query(sql, (error, result) =>{
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

//搜索好友接口
router.post('/searchFriend', (request,response) =>{
    connection.connect();
    var sql = `SELECT email , nickName FROM user  WHERE email = "${ request.body.search }"`;
    connection.query(sql,  (error, result) => {
        if (error){
            response.status(500).send('server error');
        }
        response.status(200).json(result);
    });
    handleDisconnect(connection);
})

//添加好友接口
router.post('/addFriend', (request,response) =>{
      connection.connect();
      var sql= `INSERT  INTO friend(userEmail,friendEmail,friendNickName) VALUES ("${ request.body.user } ","${ request.body.addEmail }","${request.body.addNickName}")`;
      connection.query(sql,  (error, result) => {
          if (error){
              response.status(500).send('server error');
          }
          response.status(200).json({message:'删除成功',code:200 });
      });
      handleDisconnect(connection);
})

//获取好友消息接口
router.post('/getFriendsMessage', (request,response) =>{
      connection.connect();  
      var sql=`SELECT * FROM message WHERE receiver = "${ request.body.user }" AND isRead = 0`;
      connection.query(sql, (error, result) =>{
          if (error){
              response.status(500).send('server error');
          }
          response.status(200).json(result);
      });
      handleDisconnect(connection);
})

//设置已读状态
router.post('/isRead', (request,response) =>{
    connection.connect();
    var sql= `UPDATE message SET isRead = 1 WHERE id = "${ request.body.id }"`;
    connection.query(sql, (error, result) =>{
        if (error){
            response.status(500).send('server error');
        }
        response.status(200).json({message:'已经设置为已读',code:200});
    });
    handleDisconnect(connection);
})

//存储私信
router.post('/sendMsg', (request,response) =>{
    if(request.session.user){
      connection.connect();
      var sql=  `INSERT INTO message (sender,receiver,content,sendTime) VALUES ("${ request.session.user.email }","${ request.body.receiver }","${ request.body.content}","${request.body.sendTime}")`;
      connection.query(sql, (error, result) =>{
          if (error){
              response.status(500).send('server error');
          }
          response.status(200).json({ message:'ok', code:200 });
      });
      handleDisconnect(connection);
    }
})

//删除好友接口
router.post('/deleteFriend', (request,response) =>{
      connection.connect();
      var sql = `DELETE FROM friend WHERE userEmail = "${request.body.user}" AND friendEmail = "${request.body.delete}"`;
      connection.query(sql, (error, result) =>{
          if (error){
              response.status(500).send('server error');
          }
          response.status(200).json({message:'删除成功'});
      });
      handleDisconnect(connection);
})

//更新用户信息接口
router.post('/updateUserInfo', (request,response) =>{
    connection.connect();
    var sql= `UPDATE user SET nickName ="${request.body.update.nickName}",gender ="${request.body.update.gender}",birthday ="${request.body.update.birth}",sign ="${request.body.update.sign}",telephone ="${request.body.update.telephone}" WHERE email ="${request.body.email}"`;
    connection.query(sql,  (error, result) => {
      if (error){
          response.status(500).send('server error');
      }
          response.status(200).json({  message:"修改成功",code:200  });
      });
    handleDisconnect(connection);
})

//获取用户安全信息接口
router.post('/getSafeIfo', (request,response) =>{
      connection.connect();
      var sql=`SELECT qq,telephone,safenum FROM USER WHERE email = "${request.body.user}"`;
      connection.query(sql, function (error, result) {
          if (error){
              response.status(500).send('server error');
          }
          response.status(200).json(result);
      });
      handleDisconnect(connection);
})

//上传头像接口
router.post('/uploadAvatar', (request,response) =>{
    connection.connect();
    var sql=`UPDATE USER SET avatar = "${request.body.img.content}" WHERE email = "${request.body.email}"`;
    connection.query(sql, (error, result) =>{
        if (error){
            response.status(500).send('server error');
        }
        response.status(200).json({message:"上传成功",code:200});
    });
    handleDisconnect(connection);
})

//上传头像接口
router.post('/uploadAvatarT', (request,response) =>{
    connection.connect();
    var sql=`UPDATE USER SET avatar = "${request.body.src}" WHERE email = "${request.body.email}"`;
    connection.query(sql,  (error, result) => {
        if (error){
            response.status(500).send('server error');
        }
        response.status(200).json({message:"上传成功",code:200});
    });
    handleDisconnect(connection);
})

//导出router
module.exports=router;