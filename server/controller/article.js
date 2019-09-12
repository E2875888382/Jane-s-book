const db = require('../model/db.js');

module.exports = {
    detail(req,res){
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
            db(sqlComments,(data)=>{
                let result = {
                    detail:detail,
                    comments:data,
                };
                res.status(200).json(result);
            })
        }).catch((err)=>{
            console.log(err);
        })
    },
    comment(req,res){
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
    },
    praise(req,res){
        let status = req.query.status;
        let article = req.query.article;
        let sql = ``;
        if(status == 'true'){
            sql = `UPDATE street SET praise = praise + 1 WHERE streetId = ${article}`;
        }else{
            sql = `UPDATE street SET praise = praise - 1 WHERE streetId = ${article}`;
        }
        try{
            db(sql,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    },
    replyPraise(req,res){
        let streetReplyID = req.query.streetReplyID;
        let status = req.query.status;
        let sql = ``;
        if(status == 'true'){
            sql = `UPDATE streetreply SET praise = praise + 1 WHERE streetReplyID = ${streetReplyID}`;
        }else{
            sql = `UPDATE streetreply SET praise = praise - 1 WHERE streetReplyID = ${streetReplyID}`;
        }
        try{
            db(sql,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    },
    new(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let time = new Date().toLocaleDateString();
        let newStreet = req.body.new;
        if(req.body.new.img[0]){
            newStreet.img = req.body.new.img[0].content;
        }else{
            newStreet.img = '';
        }
        let sql=`INSERT INTO street(topic,userID,TIME,content,img)
        VALUES('${newStreet.topic}','${current}','${time}','${newStreet.content}','${newStreet.img}')`;
        try{
            db(sql,()=>{
                res.status(200).json({code:200});
            })
        }catch(e){
            console.log(e);
        }
    },
    article(req,res){
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
    }
}