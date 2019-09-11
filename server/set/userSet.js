const express = require('express');
const router = express.Router();
const db = require('../mysql.js');

// 写私信
router.post('/sendMsg', (req,res) =>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let time = new Date().toLocaleString();
    let sql = `INSERT INTO message (userID,receiverID,content,time)
     VALUES ("${current}","${ req.body.receiverID }","${ req.body.content}","${time}")`;
    db(sql,()=>{
        res.status(200).json({ code:200 });
    })
})

// 消息已读
router.get('/isRead', (req,res) =>{
    let sql = `UPDATE message SET isRead = 1 WHERE messageID = "${ req.query.id }"`;
    db(sql,()=>{
        res.status(200).json({ code:200 });
    })
})

// 修改用户信息
router.post('/updateUserInfo', (req,res) =>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let nickName = req.body.ifo.nickName;
    let birth = req.body.ifo.birth;
    let gender = req.body.ifo.gender;
    let sign = req.body.ifo.sign;
    let sql = `UPDATE user SET gender ="${gender}",birthday ="${birth}",sign ="${sign}",nickName ="${nickName}"
    WHERE userID ="${current}"`;
    db(sql,()=>{
        res.status(200).json({ code:200 });
    })
})

// 修改手机号
router.post('/changeTelephone',(req,res) =>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let sql=`UPDATE USER SET telephone = '${req.body.new }' WHERE userID = '${current}'`;
    db(sql,()=>{
        res.status(200).json({ code:200 });
    })
})

// 修改QQ号
router.post('/changeQQ',(req,res) =>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let sql=`UPDATE USER SET qq = '${req.body.new }' WHERE userID = '${current}'`;
    db(sql,()=>{
        res.status(200).json({ code:200 });
    })
})

module.exports = router;