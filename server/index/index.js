const express = require('express');
const router = express.Router();
const db = require('../mysql.js');

// 首页文章
router.get('/article',(req,res) =>{
    let begin = (req.query.page -1)*10;
    let sqlCount = `SELECT COUNT(*) FROM street`;
    let sqlList = `SELECT street.topic,street.view,street.replyCount,user.nickName,street.streetID,street.praise
    FROM street,USER
    WHERE street.userID = user.userID
    LIMIT ${begin},10`;
    new Promise((resolve)=>{
        db(sqlCount,(count)=>{
            resolve(count);
        })
    }).then((count)=>{
        db(sqlList,(data)=>{
            let result = {
                count:count,
                list:data,
            };
            res.status(200).json(result);
        })
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;