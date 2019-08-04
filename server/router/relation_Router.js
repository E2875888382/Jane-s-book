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

// 判断当前用户是否已关注
router.post('/checkFriend',(request,response)=>{
    connection.connect();
    var sql = `SELECT COUNT(*)
    FROM friend WHERE userID = ${request.body.userID} AND friendID = ${request.body.friendID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,isFriend:result});
    })
    handleDisconnect(connection);
})

// 收藏一个相簿
router.post('/photoCollection',(request,response)=>{
  connection.connect();
  var sql = `INSERT INTO photocollection (userID,photoID,TIME)
  VALUES (${request.body.userID},${request.body.photoID},'${request.body.time}')`;
  connection.query(sql,(error,result) =>{
      if(error){
          response.status(500).send('server error');
      }
      response.status(200).json({ code:200,message:'收藏成功'});
  })
  handleDisconnect(connection);
})

// 检查当前相簿是否被收藏过
router.post('/checkPhotoCollection',(request,response)=>{
  connection.connect();
  var sql = `SELECT COUNT(*)
  FROM photocollection
  WHERE userID = ${request.body.userID} AND photoID = ${request.body.photoID}`;
  connection.query(sql,(error,result) =>{
      if(error){
          response.status(500).send('server error');
      }
      response.status(200).json({ code:200,isCollection:result});
  })
  handleDisconnect(connection);
})

//导出router
module.exports=router;