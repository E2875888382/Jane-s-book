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
    var sql = `SELECT photo.src,photo.title,photo.photoID,user.avatar,user.nickName
    FROM USER,photo
    WHERE user.userID = photo.userID
    LIMIT ${begin},10`;
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
    var sql = `SELECT photo.title,user.avatar,user.nickName,photo.tags,photo.view,photo.praise,photo.time,user.level,photo.photo
    FROM USER,photo
    WHERE user.userID = photo.userID
    AND photoID = ${request.body.photoID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,photoDetails:result });
    })
    handleDisconnect(connection);
})

// 点赞+1
router.post('/photoPraise',(request,response)=>{
    connection.connect();
    var sql = `UPDATE photo SET praise = praise + 1 WHERE photoID = ${request.body.photoID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,message:'success'});
    })
    handleDisconnect(connection);
})

// 点赞-1
router.post('/cancelPhotoPraise',(request,response)=>{
    connection.connect();
    var sql = `UPDATE photo SET praise = praise - 1 WHERE photoID = ${request.body.photoID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,message:'success'});
    })
    handleDisconnect(connection);
})

//增加阅读量
router.post('/addPhotoView',(request,response) =>{
    connection.connect();
    var sql = `UPDATE photo SET view = view + 1  WHERE photoID =${request.body.photoID} `;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,message:'阅读量增加' });
    })
    handleDisconnect(connection);
})

// 获取评论
router.post('/getPhotoReply',(request,response)=>{
    connection.connect();
    var begin = (request.body.currentPage -1)*5;
    var sql = `SELECT user.nickName,photoreply.time,photoreply.content,photoreply.praise,user.avatar,photoreply.down,photoreply.photoReplyID
    FROM USER,photoreply
    WHERE user.userID = photoreply.userID
    AND photoID = ${request.body.photoID} LIMIT ${begin},5`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,photoReply:result });
    })
    handleDisconnect(connection);
})

// 获取评论数量
router.post('/getPhotoCount',(request,response) => {
    connection.connect();
    var sql = `SELECT  COUNT(*)
    FROM photoreply
    WHERE  photoID = ${request.body.photoID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,photoCount:result });
    })
    handleDisconnect(connection);
})

// 新增评论
router.post('/addPhotoReply',(request,response)=>{
    connection.connect();
    var sql = `INSERT INTO photoreply(photoID,userID,TIME,content)
    VALUES (${request.body.photoID},${request.body.userID},'${request.body.time}','${request.body.content}')`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,message:'评论成功' });
    })
    handleDisconnect(connection);
})

// 评论的点赞+1
router.post('/photoReplyPraise',(request,response)=>{
    connection.connect();
    var sql = `UPDATE photoreply SET praise = praise + 1 WHERE photoReplyID = ${request.body.photoReplyID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,message:'success'});
    })
    handleDisconnect(connection);
})

// 评论的踩+1
router.post('/photoReplyDown',(request,response)=>{
    connection.connect();
    var sql = `UPDATE photoreply SET down = down + 1 WHERE photoReplyID = ${request.body.photoReplyID}`;
    connection.query(sql,(error,result) =>{
        if(error){
            response.status(500).send('server error');
        }
        response.status(200).json({ code:200,message:'success'});
    })
    handleDisconnect(connection);
})
//导出router
module.exports=router;