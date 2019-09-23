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
        let {articleId} = req.query;
        let sqlAddView = `UPDATE article SET view = view + 1  WHERE articleID = ${articleId}`;
        let sqlDeatil = `SELECT user.userID,user.nickName,user.avatar,user.sign,article.*
        FROM article,USER
        WHERE article.userID = user.userID AND
        articleID = ${articleId}`;
        let sqlComments = `SELECT user.avatar,user.nickName,reply.*
        FROM USER,reply
        WHERE user.userID = reply.userID AND articleID = ${articleId}`;
        (async ()=>{
            try{
                let addview = await sql(sqlAddView);
                let detail = await sql(sqlDeatil);        
                let comments = await sql(sqlComments);
                res.status(200).json({detail,comments});
            }catch(e){
                console.log(e);
            }         
        })()
    },
    comment(req,res){
        let {article,content} = req.body;
        let token = Number(req.headers.token);
        let current = global.users.get(token);
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
        let {status,article} = req.query;
        let sql = `UPDATE article SET praise = praise - 1 WHERE articleID = ${article}`;
        if(status == 'true'){
            sql = `UPDATE article SET praise = praise + 1 WHERE articleID = ${article}`;
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
        let {streetReplyID,status} = req.query;
        let sql = `UPDATE reply SET praise = praise - 1 WHERE replyID = ${streetReplyID}`;
        if(status == 'true'){
            sql = `UPDATE reply SET praise = praise + 1 WHERE replyID = ${streetReplyID}`;
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
        let {new:{img,html,title}} = req.body;
        if(img[0]){
            img = img[0].content;
        }else{
            img = '';
        }    
        html = html.replace(/&/g, "&amp;");
        html = html.replace(/</g, "&lt;");
        html = html.replace(/>/g, "&gt;");
        html = html.replace(/ /g, "&nbsp;");
        html = html.replace(/\'/g, "&#39;");
        let sql=`INSERT INTO article(title,userID,TIME,html,img)
        VALUES('${title}','${current}','${time}','${html}','${img}')`;
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
                res.status(200).json({count,list});
            }catch(e){
                console.log(e);
            }
        })()
    }
}