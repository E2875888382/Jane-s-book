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

// 搜索步行街帖子
router.get('/searchForStreet',(request,response)=>{
    connection.connect();
    var sql = `SELECT street.topic,street.time,user.nickName,street.streetID
    FROM street,USER
    WHERE street.topic LIKE '%${request.query.content}%'
    AND user.userID = street.userID`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,street:result});
    })
    handleDisconnect(connection);
})

// 搜索相簿
router.get('/searchForPhoto',(request,response)=>{
    connection.connect();
    var sql = `SELECT photo.photoID,photo.src,user.nickName,photo.title
    FROM photo,USER
    WHERE photo.title LIKE '%${request.query.content}%'
    AND user.userID = photo.userID`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,photo:result});
    })
    handleDisconnect(connection);
})

// 搜索用户
router.get('/searchForUser',(request,response)=>{
    connection.connect();
    var sql = `SELECT userID,nickName,avatar,email,birthday,level,gender,sign
    FROM USER
    WHERE nickName LIKE '%${request.query.content}%'`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,user:result});
    })
    handleDisconnect(connection);
})

// 搜索新闻
router.get('/searchForNews',(request,response)=>{
    connection.connect();
    var sql = `SELECT title,TIME,newID,source
    FROM news
    WHERE title LIKE '%${request.query.content}%'`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,news:result});
    })
    handleDisconnect(connection);
})
//导出router
module.exports=router;