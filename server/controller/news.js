const db = require('../model/db.js');

function sql(sql){
    return new Promise((resolve)=>{
        db(sql,(data)=>{
            resolve(data);
        })
    })
}

module.exports = {
    detail(req,res){
        let newId = req.query.newId;
        let sqlAddView = `UPDATE news SET view = view + 1  WHERE newID = ${newId}`;
        let sqlNewDetail = `SELECT * FROM news WHERE newID = ${ newId }`;
        (async ()=>{
            try{
                let addView = await sql(sqlAddView);
                let detail = await sql(sqlNewDetail);
                res.status(200).json(detail);
            }catch(e){
                console.log(e);
            }
        })()
    },
    news(req,res){
        let sqlNews = `SELECT title,newID FROM news ORDER BY RAND() LIMIT 10`;
        try{
            db(sqlNews,(result)=>{
                res.status(200).json(result);
            })
        }catch(e){
            console.log(e);
        }
    }
}