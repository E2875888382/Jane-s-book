var fs=require('fs');
var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    port: '3306', 
    database:'videos'
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
 












  //导出router
module.exports=router;