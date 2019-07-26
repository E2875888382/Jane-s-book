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

//查询步行街帖子
router.post('/getStreet',(request,response) =>{
    connection.connect();
    var begin = (request.body.page -1)*20;
    var end = request.body.page*20;
    var sql = `SELECT * FROM street LIMIT ${ begin },${ end }`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,streetList:result });
    })
    handleDisconnect(connection);
})

// 查询帖子数量
router.get('/getStreetCount',(request,response) => {
  connection.connect();
  var sql = `SELECT COUNT(*) FROM street`;
  connection.query(sql,(error,result) =>{
      if(error){
          response.status(500).send('server error');
      }
      response.status(200).json({ code:200,streetCount:result });
  })
  handleDisconnect(connection);
})



//导出router
module.exports=router;