const db = require('../model/db.js');

global.users = new Map();

module.exports = {
    followerWork(req,res){
        let follower = req.query.userID;
        let sqlArticle = `SELECT TIME,streetID,VIEW,replyCount,topic,img FROM street WHERE userID = '${follower}'`;
        let sqlPhoto = `SELECT src,photoID,title,praise,time,VIEW FROM photo WHERE userID = '${follower}'`;
        new Promise((resolve)=>{
            db(sqlArticle,(data)=>{
                resolve(data)
            })
        }).then((article)=>{
            db(sqlPhoto,(data)=>{
                let result = {
                    article:article,
                    photo:data,
                };
                res.status(200).json(result);
            })
        }).catch((err)=>{
            console.log(err);
        })
    },
    follow(req,res){
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
        try{
            db(sql,()=>{
                res.status(200).send(`ok`);
            })
        }catch(e){
            console.log(e);
        }
    },
    avatar(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let avatar = req.body.avatar;
        let sqlAvatar = `UPDATE USER SET avatar = "${avatar}" WHERE userID = "${current}"`;
        try{
            db(sqlAvatar,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    },
    msg(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let time = new Date().toLocaleString();
        let sql = `INSERT INTO message (userID,receiverID,content,time)
        VALUES ("${current}","${ req.body.receiverID }","${ req.body.content}","${time}")`;
        try{
            db(sql,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    },
    isRead(req,res){
        let sql = `UPDATE message SET isRead = 1 WHERE messageID = "${ req.query.id }"`;
        try{
            db(sql,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    },
    update(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let nickName = req.body.ifo.nickName;
        let birth = req.body.ifo.birth;
        let gender = req.body.ifo.gender;
        let sign = req.body.ifo.sign;
        let sql = `UPDATE user SET gender ="${gender}",birthday ="${birth}",sign ="${sign}",nickName ="${nickName}"
        WHERE userID ="${current}"`;
        try{
            db(sql,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    },
    changePhone(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let sql=`UPDATE USER SET telephone = '${req.body.new }' WHERE userID = '${current}'`;
        try{
            db(sql,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    },
    changeQQ(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let sql=`UPDATE USER SET qq = '${req.body.new }' WHERE userID = '${current}'`;
        try{
            db(sql,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    },
    ifo(req,res){
        let token = Number(req.headers.token);
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
            function ifo(result,sql,prop){
                return new Promise((resolve)=>{
                    db(sql,(data)=>{
                        result[prop] = data;
                        resolve(result);
                    })
                })
            }
            (async function user(){
                try{
                    let result = {};
                    let result1 = await ifo(result,sqlUserIfo,'userIfo');
                    let result2 = await ifo(result1,sqlFriend,'friend');
                    let result3 = await ifo(result2,sqlNewMsg,'newMsg');
                    let result4 = await ifo(result3,sqlHisMsg,'hisMsg');
                    let result5 = await ifo(result4,articleCol,'articleCol');
                    let result6 = await ifo(result5,photoCol,'photoCol');
                    res.status(200).json(result6);
                }catch(e){
                    console.log(e);
                }
            })()
        }else{
            res.status(200).json({code:200});
        }
    },
    collect(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let article = req.query.article;
        let time = new Date().toLocaleString();
        let status = req.query.status;
        let sql = ``;
        if(status == 'true'){
            sql = `INSERT INTO streetcollection (userID,streetID,TIME)
            VALUES (${current},${article},'${time}')`;
        }else{
            sql = `DELETE FROM streetcollection
            WHERE userID = ${current} AND streetID = ${article}`;
        }
        try{
            db(sql,()=>{
                res.status(200).send(`ok`);
            })
        }catch(e){
            console.log(e);
        }
    },
    photoCollect(req,res){
        let time = new Date().toLocaleString();
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let photo = req.query.photoID;
        let status = req.query.status;
        let sql = ``;
        if(status == 'true'){
            sql = `INSERT INTO photocollection (userID,photoID,TIME)
            VALUES (${current},${photo},'${time}')`;
        }else{
            sql = `DELETE FROM photocollection
            WHERE userID = ${current} AND photoID = ${photo}`;
        }
        try{
            db(sql,()=>{
                res.status(200).send(`ok`);
            })
        }catch(e){
            console.log(e);
        }
    },
    new(req,res){
        let sql=`SELECT * FROM user WHERE email = "${req.body.email}"`;
        try{
            db(sql,(result)=>{
                if(result.length!==0){
                    res.status(200).json({ code:0 });
                }
                else {
                    let sql1=`INSERT INTO user (email,password) VALUES ("${req.body.email}","${req.body.password}")`;
                    db(sql1,(result)=>{
                        res.status(200).json({ code:1 });
                    })
                }
            })
        }catch(e){
            console.log(e);
        }
    },
    login(req,res){
        let sql=`SELECT * FROM user WHERE email ="${req.body.email}"AND password = "${req.body.password }"`;
        try{
            db(sql,(result)=>{
                if(result.length==0){
                    res.status(200).json({ code:0 });
                }
                else {
                  let key = Number(result[0].userID)+new Date().getTime();
                  global.users.set(key,result[0].userID);
                  res.status(200).json({ code:1,token:key });
                }
            })
        }catch(e){
            console.log(e);
        }
    },
    loginOut(req,res){
        let token = Number(req.headers.token);
        global.users.delete(token);
        res.status(200).send(`ok`);
    }
}