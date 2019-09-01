const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

// 写私信
router.post('/sendMsg', (request,response) =>{
    let token = Number(req.body.token);
    let current = global.users.get(token);
    let time = new Date().toLocaleString();
    var sql=  `INSERT INTO message (userID,receiverID,content,time)
     VALUES ("${current}","${ request.body.receiverID }","${ request.body.content}","${time}")`;
    db(sql,()=>{
        response.status(200).json({ message:'ok', code:200 });
    })
})

// 消息已读
router.get('/isRead', (request,response) =>{
    var sql= `UPDATE message SET isRead = 1 WHERE messageID = "${ request.query.id }"`;
    db(sql,(result)=>{
        response.status(200).json({message:'已经设置为已读',code:200});
    })
})

// 修改用户信息
router.post('/updateUserInfo', (req,res) =>{
    let token = Number(req.body.token);
    let current = global.users.get(token);
    let nickName = req.body.ifo.nickName;
    let birth = req.body.ifo.birth;
    let gender = req.body.ifo.gender;
    let sign = req.body.ifo.sign;
    let sql= `UPDATE user SET gender ="${gender}",birthday ="${birth}",sign ="${sign}",nickName ="${nickName}"
    WHERE userID ="${current}"`;
    new Promise((resolve)=>{
        db(sql,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).json({ code:200 });
    }).catch((err)=>{
        console.log(err)
    })
})

// 修改手机号
router.post('/changeTelephone',(request,response) =>{
    let token = Number(req.body.token);
    let current = global.users.get(token);
    var sql=`UPDATE USER SET telephone = '${request.body.new }' WHERE userID = '${current}'`;
    db(sql,(result)=>{
        response.status(200).json({message:"修改成功",code:200});
    })
})

// 修改QQ号
router.post('/changeQQ',(request,response) =>{
    let token = Number(req.body.token);
    let current = global.users.get(token);
    var sql=`UPDATE USER SET qq = '${request.body.new }' WHERE userID = '${current}'`;
    db(sql,(result)=>{
        response.status(200).json({message:"修改成功",code:200});
    })
})

module.exports=router;