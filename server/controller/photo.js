const db = require('../model/db.js');

function sql(sql){
    return new Promise((resolve)=>{
        db(sql,(data)=>{
            resolve(data);
        })
    })
}

module.exports = {
    photo(req,res){
        let begin = (req.query.page -1)*10;
        let sqlCount = `SELECT COUNT(*) FROM photo`;
        let sqlList = `SELECT photo.src,photo.title,photo.photoID,user.avatar,user.nickName
        FROM USER,photo
        WHERE user.userID = photo.userID
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
    },
    detail(req,res){
        let photoID = req.query.photoID;
        let sqlAddView = `UPDATE photo SET view = view + 1  WHERE photoID =${photoID} `;
        let sqlDetail = `SELECT photo.title,user.avatar,user.nickName,photo.tags,photo.view,photo.praise,photo.time,photo.photo,user.userID
        FROM USER,photo
        WHERE user.userID = photo.userID
        AND photoID = ${photoID}`;
        (async ()=>{
            try{
                let addView = await sql(sqlAddView);
                let detail = await sql(sqlDetail);
                res.status(200).json(detail);
            }catch(e){
                console.log(e);
            }
        })()
    },
    praise(req,res){
        let {photo,status} = req.query;
        let sql = `UPDATE photo SET praise = praise - 1 WHERE photoID = ${photo}`;
        if(status == 'true'){
            sql = `UPDATE photo SET praise = praise + 1 WHERE photoID = ${photo}`;
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
        let {tags,src,title,time,photo} = req.body;
        let token = Number(req.headers.token);
        let current = global.users.get(token);
        let sql = `INSERT INTO photo (userID,tags,src,title,TIME,photo)
        VALUES(${current},'${tags}','${src}','${title}','${time}','${photo}')`;
        try{
            db(sql,()=>{
                res.status(200).json({ code:200 });
            })
        }catch(e){
            console.log(e);
        }
    }
}