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

//获取轮播图接口
router.get('/getLunBo',(request,response) => {
  connection.connect();
  var sql='SELECT  * FROM `shufflingfigure`limit 0,5';
  connection.query(sql, (error, result) => {
      if (error){
          response.status(500).send('server error');
      }                
      response.send( result );  
  });
  handleDisconnect(connection);
}) 

//获取娱乐视频接口
router.get('/getEntertainmentVideo', (request,response) =>{
  connection.connect();
  var sql='SELECT  * FROM `entertainmentvideo`limit 0,8';
  connection.query(sql, (error, result) => {
      if (error){
          response.status(500).send('server error');
      }                
      response.send( result );
  });
  handleDisconnect(connection);
}) 
//获取篮球视频接口
router.get('/getBasketballVideo', (request,response) => {
  connection.connect();
  var sql='SELECT  * FROM `basketballvideo`limit 0,8';
  connection.query(sql, (error, result) => {
      if (error){
          response.status(500).send('server error');
      }                
      response.send( result );
  });
  handleDisconnect(connection);
}) 
//获取推荐视频接口
router.get('/getRecommendVideo', (request,response) => {
  connection.connect();
  var sql='SELECT  * FROM `recommendvideo`limit 0,4';
  connection.query(sql, (error, result) =>  {
      if (error){
          response.status(500).send('server error');
      }                
      response.send( result );
  });
  handleDisconnect(connection);
}) 
 
//导出router
module.exports=router;