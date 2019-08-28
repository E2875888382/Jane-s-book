var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');

// 查询新闻详情
router.get('/getNewsDetails',(request,response) =>{
    var sql = `SELECT * FROM news WHERE newID = ${ request.query.newID }`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,newsList:result });
    })
})

router.get('/news',(req,res)=>{
    let sqlNews = `SELECT title,newID FROM news ORDER BY RAND() LIMIT 10`;
    new Promise((resolve)=>{
        db(sqlNews,(data)=>{
            resolve(JSON.stringify(data))
        })
    }).then((data)=>{
        res.type('text/javascript');
        res.status(200).send(`${req.query.callback}(${data})`);
    }).catch((err)=>{
        console.log(err)
    })
})

// 增加新闻阅读量
router.get('/addNewsRead',(request,response) =>{
    var sql = ` UPDATE news SET view = view + 1  WHERE newID = ${request.query.newID}`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,message:'阅读量增加' });
    })
})



//导出router
module.exports=router;