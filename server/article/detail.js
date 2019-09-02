const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

// 获取详情
router.get('/articleDetail',(req,res) =>{
    let sqlAddView = ` UPDATE street SET view = view + 1  WHERE streetID = ${req.query.articleId}`;
    let sqlDeatil = `SELECT user.userID,user.nickName,user.avatar,user.sign,street.*
    FROM street,USER
    WHERE street.userID = user.userID AND
    streetID = ${req.query.articleId}`;
    let sqlComments = ` SELECT user.avatar,user.nickName,streetReply.*
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
                resolve(result);
            })
        })
    }).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
    })
})

// 发表评论
router.post('/comment',(req,res)=>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let article = req.body.article;
    let content = req.body.content;
    let time = new Date().toLocaleString();
    let sqlAddCommentCount = `UPDATE street SET replyCount = replyCount + 1  WHERE streetID = ${article}`;
    let sqlAddComment = `INSERT INTO streetReply(streetID,userID,TIME,content) VALUES (${article},
    '${current}','${time}','${content}')`;
    new Promise((resolve)=>{
        db(sqlAddCommentCount,()=>{
            resolve()
        })
    }).then(()=>{
        db(sqlAddComment,()=>{
            res.status(200).json({ code:200 });
        })
    }).catch((err)=>{
        console.log(err)
    })
})

// 文章点赞/取消点赞
router.get('/praise',(req,res)=>{
    let status = req.query.status;
    let article = req.query.article;
    let sql = ``;
    if(status == 'true'){
        sql = `UPDATE street SET praise = praise + 1 WHERE streetId = ${article}`;
    }else{
        sql = `UPDATE street SET praise = praise - 1 WHERE streetId = ${article}`;
    }
    new Promise((resolve)=>{
        db(sql,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).json({ code:200 });
    }).catch((err)=>{
        console.log(err);
    })
})

// 评论点赞/取消点赞
router.get('/streetReplyPraise',(req,res)=>{
    let streetReplyID = req.query.streetReplyID;
    let status = req.query.status;
    let sql = ``;
    if(status == 'true'){
        sql = `UPDATE streetreply SET praise = praise + 1 WHERE streetReplyID = ${streetReplyID}`;
    }else{
        sql = `UPDATE streetreply SET praise = praise - 1 WHERE streetReplyID = ${streetReplyID}`;
    }
    new Promise((resolve)=>{
        db(sql,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).json({ code:200 });
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;