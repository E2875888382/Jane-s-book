const express = require('express');
const router = express.Router();
const db = require('../mysql.js');

// 获取一组相册
router.get('/photo',(req,res) =>{
    let begin = (req.query.page -1)*10;
    let sqlCount = `SELECT COUNT(*) FROM photo`;
    let sqlList = `SELECT photo.src,photo.title,photo.photoID,user.avatar,user.nickName
    FROM USER,photo
    WHERE user.userID = photo.userID
    LIMIT ${begin},10`;
    new Promise((resolve)=>{
        db(sqlCount,(count)=>{
            resolve(count);
        })
    }).then((count)=>{
        return new Promise((resolve)=>{
            db(sqlList,(data)=>{
                let result = {
                    count:count,
                    list:data,
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

// 相册详情
router.get('/photoDetail',(req,res)=>{
    let photoID = req.query.photoID;
    let sqlAddView = `UPDATE photo SET view = view + 1  WHERE photoID =${photoID} `;
    let sqlDetail = `SELECT photo.title,user.avatar,user.nickName,photo.tags,photo.view,photo.praise,photo.time,photo.photo,user.userID
    FROM USER,photo
    WHERE user.userID = photo.userID
    AND photoID = ${photoID}`;
    new Promise((resolve)=>{
        db(sqlAddView,()=>{
            resolve()
        })
    }).then(()=>{
        return new Promise((resolve)=>{
            db(sqlDetail,(result)=>{
                resolve(result);
            })
        })
    }).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
    })
})

// 点赞/取消点赞
router.get('/photoPraise',(req,res)=>{
    let photoID = req.query.photo;
    let status = req.query.status;
    let sql = ``;
    if(status == 'true'){
        sql = `UPDATE photo SET praise = praise + 1 WHERE photoID = ${photoID}`;
    }else{
        sql = `UPDATE photo SET praise = praise - 1 WHERE photoID = ${photoID}`;
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

// 发布相簿
router.post('/addNewPhoto',(req,res)=>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let sql = `INSERT INTO photo (userID,tags,src,title,TIME,photo)
    VALUES(${current},'${req.body.tags}',
    '${req.body.src}','${req.body.title}','${req.body.time}',
    '${req.body.photo}')`;
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

module.exports = router;