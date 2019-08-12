var express=require('express');
var router=express.Router();
var db = require('../mysql.js');

//获取好友列表接口
router.post('/getFriends',(request,response) =>{
    var sql =`SELECT user.userID,user.nickName,user.avatar,user.sign
    FROM USER,friend
    WHERE user.userID = friend.friendID AND friend.userID =${request.body.userID}`;
    db(sql,(result)=>{
        response.status(200).json(result);
    })
})

//获取用户信息接口
router.get('/getLoginUserInfo', (request,response) =>{
    if(request.session.user){
        var sql=`SELECT * FROM user WHERE email = "${request.session.user}"`;
        db(sql,(result)=>{
            response.status(200).json(result);
        })
    }else{
      response.status(200).json({ message:"没有登录记录",code:600 });
    }
})

//搜索好友接口
router.post('/searchFriend', (request,response) =>{
    var sql = `SELECT nickName,userID,avatar,sign FROM user  WHERE nickName like "%${ request.body.search }%"`;
    db(sql,(result)=>{
        response.status(200).json(result);
    })
})

//添加好友接口
router.post('/addFriend', (request,response) =>{
    var sql= `INSERT  INTO friend(userID,friendID) VALUES ("${ request.body.userID } ","${ request.body.friendID }")`;
    db(sql,(result)=>{
        response.status(200).json({message:'添加成功',code:200 });
    })
})

//获取好友消息接口
router.post('/getFriendsMessage', (request,response) =>{ 
    var sql=`SELECT message.time,message.content,user.nickName,message.messageID
    FROM message,USER
    WHERE message.userID = user.userID AND message.receiverID = ${request.body.userID} AND message.isRead = 0`;
    db(sql,(result)=>{
        response.status(200).json(result);
    })
})

//获取好友消息接口
router.post('/getHistoryFriendsMessage', (request,response) =>{ 
    var sql=`SELECT message.time,message.content,user.nickName,message.messageID
    FROM message,USER
    WHERE message.userID = user.userID AND message.receiverID = ${request.body.userID} AND message.isRead = 1`;
    db(sql,(result)=>{
        response.status(200).json(result);
    })
})

//设置已读状态
router.post('/isRead', (request,response) =>{
    var sql= `UPDATE message SET isRead = 1 WHERE messageID = "${ request.body.id }"`;
    db(sql,(result)=>{
        response.status(200).json({message:'已经设置为已读',code:200});
    })
})

//发送私信
router.post('/sendMsg', (request,response) =>{
    var sql=  `INSERT INTO message (userID,receiverID,content,time) VALUES ("${ request.body.userID }","${ request.body.receiverID }","${ request.body.content}","${request.body.time}")`;
    db(sql,(result)=>{
        response.status(200).json({ message:'ok', code:200 });
    })
})

//删除好友接口
router.post('/deleteFriend', (request,response) =>{
    var sql = `DELETE FROM friend WHERE userID = "${request.body.userID}" AND friendID = "${request.body.friendID}"`;
    db(sql,(result)=>{
        response.status(200).json({message:'删除成功'});
    })
})

//更新用户信息接口
router.post('/updateUserInfo', (request,response) =>{
    var sql= `UPDATE user SET nickName ="${request.body.update.nickName}",gender ="${request.body.update.gender}",birthday ="${request.body.update.birth}",sign ="${request.body.update.sign}" WHERE userID ="${request.body.userID}"`;
    db(sql,(result)=>{
        response.status(200).json({ message:"修改成功",code:200 });
    })
})

//上传头像接口
router.post('/uploadAvatar', (request,response) =>{
    var sql=`UPDATE USER SET avatar = "${request.body.img.content}" WHERE userID = "${request.body.userID}"`;
    db(sql,(result)=>{
        response.status(200).json({message:"上传成功",code:200});
    })
})

//上传头像接口
router.post('/uploadAvatarT', (request,response) =>{
    var sql=`UPDATE USER SET avatar = "${request.body.src}" WHERE userID = "${request.body.userID}"`;
    db(sql,(result)=>{
        response.status(200).json({message:"上传成功",code:200});
    })
})

// 更改密码
router.post('/changePassword',(request,response) =>{
    var sql=`UPDATE USER SET PASSWORD = '${request.body.new }' WHERE userID = '${request.body.userID }'`;
    db(sql,(result)=>{
        response.status(200).json({message:"修改成功",code:200});
    })
})

// 更改手机号
router.post('/changeTelephone',(request,response) =>{
    var sql=`UPDATE USER SET telephone = '${request.body.new }' WHERE userID = '${request.body.userID }'`;
    db(sql,(result)=>{
        response.status(200).json({message:"修改成功",code:200});
    })
})

// 更改QQ号
router.post('/changeQQ',(request,response) =>{
    var sql=`UPDATE USER SET qq = '${request.body.new }' WHERE userID = '${request.body.userID }'`;
    db(sql,(result)=>{
        response.status(200).json({message:"修改成功",code:200});
    })
})

//导出router
module.exports=router;