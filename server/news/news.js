const express = require('express');
const router = express.Router();
const db = require('../mysql.js');

// 获取详情
router.get('/newsDetail',(req,res)=>{
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
})

// 获取最新新闻
router.get('/news',(req,res)=>{
    let sqlNews = `SELECT title,newID FROM news ORDER BY RAND() LIMIT 10`;
    try{
        db(sqlNews,(result)=>{
            res.status(200).json(result);
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;