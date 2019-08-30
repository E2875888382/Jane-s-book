const express=require('express');
const router=express.Router();
const db = require('../../mysql.js');

router.get('/userIfo',(req,res) =>{
    let token = Number(req.query.token)
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
                result.userIfo = data;
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
                    resolve(JSON.stringify(result));
                })
            })
        }).then((result)=>{
            res.type('text/javascript');
            res.status(200).send(`${req.query.callback}(${result})`);
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        res.status(200).send(`${req.query.callback}()`);
    }
})

router.get('/out',(req,res)=>{
    let token = Number(req.query.token);
    global.users.delete(token);
    res.type('text/javascript');
    res.status(200).send(`${req.query.callback}()`);
})

router.get('/follow',(req,res)=>{
    let token = Number(req.query.token);
    let current = global.users.get(token);
    let friend = req.query.friend;
    let sqlFollow = `INSERT  INTO friend(userID,friendID) VALUES ("${ current } ","${ friend }")`;
    new Promise((resolve)=>{
        db(sqlFollow,()=>{
            resolve()
        })
    }).then(()=>{
        res.type('text/javascript');
        res.status(200).send(`${req.query.callback}({msg:'ok'})`);
    })
})

router.get('/unfollow',(req,res)=>{
    let token = Number(req.query.token);
    let current = global.users.get(token);
    let friend = req.query.friend;
    let sqlUnFollow = `DELETE FROM friend WHERE userID = "${current}" AND friendID = "${friend}"`;
    new Promise((resolve)=>{
        db(sqlUnFollow,()=>{
            resolve()
        })
    }).then(()=>{
        res.type('text/javascript');
        res.status(200).send(`${req.query.callback}({msg:'ok'})`);
    })
})

router.get('/collect',(req,res)=>{
    let token = Number(req.query.token);
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
        res.type('text/javascript');
        res.status(200).send(`${req.query.callback}({msg:'ok'})`);
    })
})

router.get('/uncollect',(req,res)=>{
    let token = Number(req.query.token);
    let current = global.users.get(token);
    let article = req.query.article;
    let sqlUnCollect = `DELETE FROM streetcollection
    WHERE userID = ${current} AND streetID = ${article}`;
    new Promise((resolve)=>{
        db(sqlUnCollect,()=>{
            resolve()
        })
    }).then(()=>{
        res.type('text/javascript');
        res.status(200).send(`${req.query.callback}({msg:'ok'})`);
    })
})
module.exports=router;