const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

// 获取关注者的作品
router.get('/followerWork',(req,res)=>{
    let follower = req.query.userID;
    let sqlArticle = `SELECT TIME,streetID,VIEW,replyCount,topic,img FROM street WHERE userID = '${follower}'`;
    let sqlPhoto = `SELECT src,photoID,title,praise,time,VIEW FROM photo WHERE userID = '${follower}'`;
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
                resolve(result)
            })
        })
    }).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
    })
})

// 关注/取消关注
router.get('/follow',(req,res)=>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let friend = req.query.friend;
    let status = req.query.status;
    let sql = ``;
    if(status == 'true'){
        sql = `INSERT  INTO friend(userID,friendID) VALUES ("${ current } ","${ friend }")`;
    }else{
        sql = `DELETE FROM friend WHERE userID = "${current}" AND friendID = "${friend}"`;
    }
    new Promise((resolve)=>{
        db(sql,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).send(`ok`);
    })
})

module.exports=router;