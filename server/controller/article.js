const db = require('../model/db.js');

function sql(sql){
    return new Promise((resolve)=>{
        db(sql,(data)=>{
            resolve(data);
        })
    })
}

module.exports = {
    detail(req,res){
        let sqlAddView = `UPDATE article SET view = view + 1  WHERE articleID = ${req.query.articleId}`;
        let sqlDeatil = `SELECT user.userID,user.nickName,user.avatar,user.sign,article.*
        FROM article,USER
        WHERE article.userID = user.userID AND
        articleID = ${req.query.articleId}`;
        let sqlComments = `SELECT user.avatar,user.nickName,reply.*
        FROM USER,reply
        WHERE user.userID = reply.userID AND articleID = ${req.query.articleId}`;
        (async ()=>{
            try{
                let addview = await sql(sqlAddView);
                let detail = await sql(sqlDeatil);        
                let comments = await sql(sqlComments);
                res.status(200).json({
                    detail:detail,
                    comments:comments,                 
                });
            }catch(e){
                console.log(e);
            }         
        })()
    },
    comment(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let article = req.body.article;
        let content = req.body.content;
        let time = new Date().toLocaleString();
        let sqlAddCommentCount = `UPDATE article SET replyCount = replyCount + 1  WHERE articleID = ${article}`;
        let sqlAddComment = `INSERT INTO reply(articleID,userID,TIME,content) VALUES (${article},
        '${current}','${time}','${content}')`;
        (async ()=>{
            try{
                let count = await sql(sqlAddCommentCount);
                let list = await sql(sqlAddComment);
                res.status(200).json({ code:200 });
            }catch(e){
                console.log(e);
            }
        })()
    },
    praise(req,res){
        let status = req.query.status;
        let article = req.query.article;
        let sql = ``;
        if(status == 'true'){
            sql = `UPDATE article SET praise = praise + 1 WHERE articleID = ${article}`;
        }else{
            sql = `UPDATE article SET praise = praise - 1 WHERE articleID = ${article}`;
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
            sql = `UPDATE reply SET praise = praise + 1 WHERE replyID = ${streetReplyID}`;
        }else{
            sql = `UPDATE reply SET praise = praise - 1 WHERE replyID = ${streetReplyID}`;
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
        let newArticle = req.body.new;
        if(req.body.new.img[0]){
            newArticle.img = req.body.new.img[0].content;
        }else{
            newArticle.img = '';
        }
        let html = newArticle.html;      
        html = html.replace(/&/g, "&amp;");
        html = html.replace(/</g, "&lt;");
        html = html.replace(/>/g, "&gt;");
        html = html.replace(/ /g, "&nbsp;");
        html = html.replace(/\'/g, "&#39;");
        let sql=`INSERT INTO article(title,userID,TIME,html,img)
        VALUES('${newArticle.title}','${current}','${time}','${html}','${newArticle.img}')`;
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
        let sqlCount = `SELECT COUNT(*) FROM article`;
        let sqlList = `SELECT article.title,article.view,article.replyCount,user.nickName,article.articleID,article.praise,article.img
        FROM article,USER
        WHERE article.userID = user.userID
        LIMIT ${begin},10`;
        (async ()=>{
            try{
                let count = await sql(sqlCount);
                let list = await sql(sqlList);
                res.status(200).json({
                    count:count,
                    list:list,
                });
            }catch(e){
                console.log(e);
            }
        })()
    }
}