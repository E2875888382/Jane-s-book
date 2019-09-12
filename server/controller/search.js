const db = require('../model/db.js');

module.exports = {
    search(req,res){
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
        function sql(result,sql,prop){
            return new Promise((resolve)=>{
                db(sql,(data)=>{
                    result[prop] = data;
                    resolve(result)
                })
            })
        }
        (async function search(){
            try{
                let result = {};
                let result1 = await sql(result,sqlArticle,'article');
                let result2 = await sql(result1,sqlPhoto,'photo');
                let result3 = await sql(result2,sqlUser,'user');
                let result4 = await sql(result3,sqlNews,'news');
                res.status(200).json(result4);
            }catch(e){
                console.log(e);
            }
        })()
    } 
}