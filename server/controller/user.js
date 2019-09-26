const db = require('../model/db.js');

global.users = new Map();

module.exports = {
    followerWork(req,res){
        let follower = req.query.userID;
        let sqlArticle = `SELECT TIME,articleID,VIEW,replyCount,title,img FROM article WHERE userID = '${follower}'`;
        let sqlPhoto = `SELECT src,photoID,title,praise,time,VIEW FROM photo WHERE userID = '${follower}'`;
        new Promise((resolve)=>{
            db(sqlArticle,(data)=>{
                resolve(data)
            })
        }).then((article)=>{
            db(sqlPhoto,(photo)=>{
                res.status(200).json({article,photo});
            })
        }).catch((e)=>{
            console.log(e);
        })
    },
    follow(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let {friend,status} = req.query;
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
    update(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let {nickName,birth,gender,sign} = req.body.ifo;
        let sql = `UPDATE user SET gender ="${gender}",birth ="${birth}",sign ="${sign}",nickName ="${nickName}"
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
    ifo(req,res){
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        if(current){
            let sqlUserIfo = `SELECT * FROM user WHERE userID = "${current}"`;
            let sqlFriend = `SELECT user.userID,user.nickName,user.avatar,user.sign,user.gender
            FROM USER,friend
            WHERE user.userID = friend.friendID AND friend.userID =${current}`;
            let articleCol = `SELECT article.articleID,articlecol.time,article.title,article.view,article.replyCount
            FROM article,articlecol
            WHERE article.articleID = articlecol.articleID
            AND articlecol.userID = ${current}`;
            let photoCol = `SELECT photo.userID,photo.src,photocol.time,photocol.photoID,photo.title
            FROM photo,photocol
            WHERE photo.photoID = photocol.photoID
            AND photocol.userID = ${current}`;
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
                    let result3 = await ifo(result2,articleCol,'articleCol');
                    let result4 = await ifo(result3,photoCol,'photoCol');
                    res.status(200).json(result4);
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
        let time = new Date().toLocaleString();
        let {article,status} = req.query;
        let sql = `DELETE FROM articlecol
        WHERE userID = ${current} AND articleID = ${article}`;
        if(status == 'true'){
            sql = `INSERT INTO articlecol (userID,articleID,TIME)
            VALUES (${current},${article},'${time}')`;
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
        let {photoID,status} = req.query;
        let sql = `DELETE FROM photocol
        WHERE userID = ${current} AND photoID = ${photoID}`;
        if(status == 'true'){
            sql = `INSERT INTO photocol (userID,photoID,TIME)
            VALUES (${current},${photoID},'${time}')`;
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
        let {email,password} = req.body;
        let sql=`SELECT * FROM user WHERE email = "${email}"`;
        try{
            db(sql,(result)=>{
                if(result.length!==0){
                    res.status(200).json({ code:0 });
                }
                else {
                    let sql1=`INSERT INTO user (email,pwd) VALUES ("${email}","${password}")`;
                    db(sql1,()=>{
                        res.status(200).json({ code:1 });
                    })
                }
            })
        }catch(e){
            console.log(e);
        }
    },
    login(req,res){
        let {email,password} = req.body; 
        let sql=`SELECT * FROM user WHERE email ="${email}"AND pwd = "${password}"`;
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