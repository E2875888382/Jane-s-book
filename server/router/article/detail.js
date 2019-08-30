const express=require('express');
const router=express.Router();
const db = require('../../mysql.js');

router.get('/articleDetail',(req,res) =>{
    let sqlAddView = ` UPDATE street SET view = view + 1  WHERE streetID = ${req.query.articleId}`;
    let sqlDeatil = `SELECT street.topic,street.time,street.view,street.replyCount,user.userID,user.nickName,user.avatar,user.sign,street.replyCount,street.img,street.content
    FROM street,USER
    WHERE street.userID = user.userID AND
    streetID = ${req.query.articleId}`;
    let sqlComments = ` SELECT user.avatar,user.nickName,streetReply.time,streetReply.praise,streetReply.content,streetreply.streetReplyID
    FROM USER,streetReply
    WHERE user.userID = streetReply.userID AND streetID = ${req.query.articleId}`;
    new Promise((resolve)=>{
        db(sqlAddView,()=>{
            resolve();
        })
    }).then(()=>{
        return new Promise((resolve)=>{
            db(sqlDeatil,(detail)=>{
                resolve(detail);
            })
        })
    }).then((detail)=>{
        return new Promise((resolve)=>{
            db(sqlComments,(data)=>{
                let result = {
                    detail:detail,
                    comments:data,
                };
                resolve(JSON.stringify(result));
            })
        })
    }).then((result)=>{
        res.type('text/javascript');
        res.status(200).send(`${req.query.callback}(${result})`);
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;