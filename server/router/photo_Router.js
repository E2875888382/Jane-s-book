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

// 查询一组相簿
router.post('/getPhoto',(request,response) => {
    connection.connect();
    var begin = (request.body.group -1)*10;
    var sql = `SELECT * FROM photo LIMIT ${ begin },10`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,photo:result });
    })
    handleDisconnect(connection);
})

// 查询相簿的数量
router.get('/getPhotoCount',(request,response) => {
    connection.connect();
    var sql = `SELECT COUNT(*) FROM photo`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,photoCount:result[0]["COUNT(*)"] });
    })
    handleDisconnect(connection);
})

// 根据id查询相簿内容
router.post('/getPhotoDetails',(request,response) => {
    connection.connect();
    var sql = `SELECT * FROM photo where id = ${request.body.id}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,photoDetails:result });
    })
    handleDisconnect(connection);
})
//导出router
module.exports=router;