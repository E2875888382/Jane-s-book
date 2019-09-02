const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

// 查用户信息
router.get('/user',(req,res) =>{
    let token = Number(req.headers.token)
    let current = global.users.get(token);
    if(current){
        let sqlUserIfo = `SELECT * FROM user WHERE userID = "${current}"`;
        let sqlFriend = `SELECT user.userID,user.nickName,user.avatar,user.sign
        FROM USER,friend
        WHERE user.userID = friend.friendID AND friend.userID =${current}`;
        let sqlNewMsg = `SELECT message.time,message.content,user.nickName,message.messageID
        FROM message,USER
        WHERE message.userID = user.userID AND message.receiverID = ${current} AND message.isRead = 0`;
        let sqlHisMsg = `SELECT message.time,message.content,user.nickName,message.messageID
        FROM message,USER
        WHERE message.userID = user.userID AND message.receiverID = ${current} AND message.isRead = 1`;
        let articleCol = `SELECT street.streetID,streetcollection.time,street.topic,street.view,street.replyCount
        FROM street,streetcollection
        WHERE street.streetID = streetcollection.streetID
        AND streetcollection.userID = ${current}`;
        let photoCol = `SELECT photo.userID,photo.src,photocollection.time,photocollection.photoID,photo.title
        FROM photo,photocollection
        WHERE photo.photoID = photocollection.photoID
        AND photocollection.userID = ${current}`;
        new Promise((resolve)=>{
            let result = {};
            db(sqlUserIfo,(data)=>{
                result.userIfo = data[0];
                resolve(result);
            })
        }).then((result)=>{
            return new Promise((resolve)=>{
                db(sqlFriend,(data)=>{
                    result.friend = data;
                    resolve(result);
                })
            })
        }).then((result)=>{
            return new Promise((resolve)=>{
                db(sqlNewMsg,(data)=>{
                    result.newMsg = data;
                    resolve(result);
                })
            })
        }).then((result)=>{
            return new Promise((resolve)=>{
                db(sqlHisMsg,(data)=>{
                    result.hisMsg = data;
                    resolve(result);
                })
            })
        }).then((result)=>{
            return new Promise((resolve)=>{
                db(articleCol,(data)=>{
                    result.articleCol = data;
                    resolve(result);
                })
            })
        }).then((result)=>{
            return new Promise((resolve)=>{
                db(photoCol,(data)=>{
                    result.photoCol = data;
                    resolve(result);
                })
            })
        }).then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        res.status(200).json({code:200});
    }
})

// 收藏
router.get('/collect',(req,res)=>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let article = req.query.article;
    let time = new Date().toLocaleString();
    let sqlCollect = `INSERT INTO streetcollection (userID,streetID,TIME)
    VALUES (${current},${article},'${time}')`;
    new Promise((resolve)=>{
        db(sqlCollect,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).send(`ok`);
    })
})

// 取消收藏
router.get('/uncollect',(req,res)=>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let article = req.query.article;
    let sqlUnCollect = `DELETE FROM streetcollection
    WHERE userID = ${current} AND streetID = ${article}`;
    new Promise((resolve)=>{
        db(sqlUnCollect,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).send(`ok`);
    })
})

// 收藏相册
router.get('/photoCollect',(req,res)=>{
    let time = new Date().toLocaleString();
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let photo = req.query.photoID;
    let sqlPhotoCol = `INSERT INTO photocollection (userID,photoID,TIME)
    VALUES (${current},${photo},'${time}')`;
    new Promise((resolve)=>{
        db(sqlPhotoCol,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).send(`ok`);
    }).catch((err)=>{
        console.log(err);
    })
})

// 取消收藏相册
router.get('/unPhotoCollect',(req,res)=>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let photo = req.query.photoID;
    var sqlUnphotoCol = `DELETE FROM photocollection
    WHERE userID = ${current} AND photoID = ${photo}`;
    new Promise((resolve)=>{
        db(sqlUnphotoCol,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).send(`ok`);
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;