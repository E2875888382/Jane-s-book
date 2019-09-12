const db = require('../model/db.js');

module.exports = {
    detail(req,res){
        let newId = req.query.newId;
        let sqlAddView = `UPDATE news SET view = view + 1  WHERE newID = ${newId}`;
        let sqlNewDetail = `SELECT * FROM news WHERE newID = ${ newId }`;
        new Promise((resolve)=>{
            db(sqlAddView,()=>{
                resolve()
            })
        }).then(()=>{
            db(sqlNewDetail,(result)=>{
                res.status(200).json(result);
            })
        }).catch((err)=>{
            console.log(err)
        })
    },
    news(req,res){
        let sqlNews = `SELECT title,newID FROM news ORDER BY RAND() LIMIT 10`;
        try{
            db(sqlNews,(result)=>{
                res.status(200).json(result);
            })
        }catch(err){
            console.log(err);
        }
    }
}