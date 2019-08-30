var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');

// 增加私信
router.post('/sendMsg', (request,response) =>{
    var sql=  `INSERT INTO message (userID,receiverID,content,time) VALUES ("${ request.session.user }","${ request.body.receiverID }","${ request.body.content}","${request.body.time}")`;
    db(sql,(result)=>{
        response.status(200).json({ message:'ok', code:200 });
    })
})
// 修改已读状态
router.get('/isRead', (request,response) =>{
    var sql= `UPDATE message SET isRead = 1 WHERE messageID = "${ request.query.id }"`;
    db(sql,(result)=>{
        response.status(200).json({message:'已经设置为已读',code:200});
    })
})
// 修改用户信息
router.post('/updateUserInfo', (request,response) =>{
    var sql= `UPDATE user SET nickName ="${request.body.update.nickName}",gender ="${request.body.update.gender}",birthday ="${request.body.update.birth}",sign ="${request.body.update.sign}" WHERE userID ="${request.session.user}"`;
    db(sql,(result)=>{
        response.status(200).json({ message:"修改成功",code:200 });
    })
})
// 修改头像
router.post('/uploadAvatar', (request,response) =>{
    var sql=`UPDATE USER SET avatar = "${request.body.img.content}" WHERE userID = "${request.session.user}"`;
    db(sql,(result)=>{
        response.status(200).json({message:"上传成功",code:200});
    })
})
// 修改头像
router.post('/uploadAvatarT', (request,response) =>{
    var sql=`UPDATE USER SET avatar = "${request.body.src}" WHERE userID = "${request.session.user}"`;
    db(sql,(result)=>{
        response.status(200).json({message:"上传成功",code:200});
    })
})
// 修改密码
router.post('/changePassword',(request,response) =>{
    var sql=`UPDATE USER SET PASSWORD = '${request.body.new }' WHERE userID = '${request.session.user }'`;
    db(sql,(result)=>{
        response.status(200).json({message:"修改成功",code:200});
    })
})
// 修改手机号
router.post('/changeTelephone',(request,response) =>{
    var sql=`UPDATE USER SET telephone = '${request.body.new }' WHERE userID = '${request.session.user }'`;
    db(sql,(result)=>{
        response.status(200).json({message:"修改成功",code:200});
    })
})
// 修改QQ号
router.post('/changeQQ',(request,response) =>{
    var sql=`UPDATE USER SET qq = '${request.body.new }' WHERE userID = '${request.session.user}'`;
    db(sql,(result)=>{
        response.status(200).json({message:"修改成功",code:200});
    })
})

//导出router
module.exports=router;