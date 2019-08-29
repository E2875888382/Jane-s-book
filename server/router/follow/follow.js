const express=require('express');
const router=express.Router();
const db = require('../../mysql.js');

router.get('/followerWork',(req,res)=>{
    let follower = req.query.userID;
    let sqlArticle = `SELECT TIME,streetID,VIEW,replyCount,topic,img FROM street WHERE userID = '${follower}'`;
    let sqlPhoto = `SELECT src,photoID,title,praise,VIEW FROM photo WHERE userID = '${follower}'`;
    new Promise((resolve)=>{
        db(sqlArticle,(data)=>{
            resolve(data)
        })
    }).then((article)=>{
        return new Promise((resolve)=>{
            db(sqlPhoto,(data)=>{
                let result = {
                    article:article,
                    photo:data,
                };
                resolve(JSON.stringify(result))
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