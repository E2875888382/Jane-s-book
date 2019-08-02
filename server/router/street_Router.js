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
    var sql = `SELECT street.topic,street.time,street.view,street.replyCount,user.nickName,street.streetID
    FROM street,USER
    WHERE street.userID = user.userID
    LIMIT ${begin},20`;
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

// 查询帖子正文
router.post('/getStreetDetails',(request,response) => {
  connection.connect();
  var sql = `SELECT street.topic,street.time,street.view,street.replyCount,user.nickName,user.level,user.avatar,street.replyCount,street.img,street.content
  FROM street,USER
  WHERE street.userID = user.userID AND
  streetID = ${request.body.streetID}`;
  connection.query(sql,(error,result) =>{
      if(error){
          response.status(500).send('server error');
      }
      response.status(200).json({ code:200,streetDetails:result });
  })
  handleDisconnect(connection);
})

// 根据id查询所有回复
router.post('/getStreetReply',(request,response) => {
  connection.connect();
  var sql = ` SELECT user.avatar,user.nickName,reply.time,reply.praise,user.level,reply.content
  FROM USER,reply
  WHERE user.userID = reply.userID AND streetID = ${request.body.streetID}`;
  connection.query(sql,(error,result) =>{
      if(error){
          response.status(500).send('server error');
      }
      response.status(200).json({ code:200,streetReply:result });
  })
  handleDisconnect(connection);
})

// 添加回复
router.post('/addReply',(request,response) => {
    connection.connect();
    var sql = `INSERT INTO reply(streetID,userID,TIME,content) VALUES (${request.body.newReply.streetID},
        '${request.body.newReply.userID}','${request.body.newReply.time}','${request.body.newReply.content}')`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200 });
    })
    handleDisconnect(connection);
})

// 发新帖
router.post('/uploadNewStreet', (request,response) =>{
    var newStreet = request.body.new;
    if(request.body.new.img[0]){
        newStreet.img = request.body.new.img[0].content;
    }else{
        newStreet.img = '';
    }
    connection.connect();
    var sql=`INSERT INTO street(topic,userID,TIME,content,img)
    VALUES('${newStreet.topic}','${newStreet.userID}','${newStreet.time}','${newStreet.content}','${newStreet.img}')`;
    connection.query(sql,  (error, result) => {
        if (error){
            response.status(500).send('server error');
        }
        response.status(200).json({message:"上传成功",code:200});
    });
    handleDisconnect(connection);
})

//增加帖子浏览量
router.post('/addStreetView',(request,response) =>{
    connection.connect();
    var sql = ` UPDATE street SET view = view + 1  WHERE streetID = ${request.body.streetID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,message:'阅读量增加' });
    })
    handleDisconnect(connection);
})

//增加帖子回复量
router.post('/addStreetReply',(request,response) =>{
    connection.connect();
    var sql = ` UPDATE street SET replyCount = replyCount + 1  WHERE streetID = ${request.body.streetID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,message:'回复量增加' });
    })
    handleDisconnect(connection);
})

// 查询所有最后回复
router.get('/getLastReply',(request,response) =>{
    connection.connect();
    var sql = `SELECT TIME,streetID,user.nickName
    FROM (reply RIGHT JOIN (SELECT MAX(TIME) AS ti ,streetId AS id FROM reply GROUP BY streetId) A ON reply.streetID =A.id AND reply.time=A.ti) LEFT JOIN USER ON reply.userID=user.userID`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,lastReply:result });
    })
    handleDisconnect(connection);
})

//导出router
module.exports=router;