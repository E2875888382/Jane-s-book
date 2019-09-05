const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

router.get('/search',(req,res)=>{
    let search = req.query.search;
    let sqlArticle = `SELECT street.topic,street.time,user.nickName,user.avatar,street.streetID,street.view,street.replyCount,street.praise
    FROM street,USER
    WHERE street.topic LIKE '%${search}%'
    AND user.userID = street.userID`;
    let sqlPhoto = `SELECT photo.photoID,photo.src,user.nickName,photo.title,photo.time,photo.view
    FROM photo,USER
    WHERE photo.title LIKE '%${search}%'
    AND user.userID = photo.userID`;
    let sqlUser = `SELECT userID,nickName,avatar,email,birthday,gender,sign
    FROM USER
    WHERE nickName LIKE '%${search}%'`;
    let sqlNews = `SELECT title,TIME,newID,source,view
    FROM news
    WHERE title LIKE '%${search}%'`;
    new Promise((resolve)=>{
        db(sqlArticle,(data)=>{
            let result = {
                article:data,
            }
            resolve(result)
        })
    }).then((result)=>{
        return new Promise((resolve)=>{
            db(sqlPhoto,(data)=>{
                result.photo = data;
                resolve(result)
            })
        })
    }).then((result)=>{
        return new Promise((resolve)=>{
            db(sqlUser,(data)=>{
                result.user = data;
                resolve(result)
            })
        })
    }).then((result)=>{
        return new Promise((resolve)=>{
            db(sqlNews,(data)=>{
                result.news = data;
                resolve(result)
            })
        })
    }).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports=router;