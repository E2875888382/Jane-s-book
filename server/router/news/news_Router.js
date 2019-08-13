var express=require('express');
var router=express.Router();
var db = require('../../mysql.js');

// 查询新闻
router.get('/getNews',(request,response) =>{
    var begin = (request.query.page -1)*10;
    var sql = `SELECT * FROM news LIMIT ${ begin },10`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,newsList:result });
    })
})
// 查询新闻数目
router.get('/getNewsCount',(request,response) => {
    var sql = `SELECT COUNT(*) FROM news`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,newsCount:result });
    })
})
// 查询新闻详情
router.get('/getNewsDetails',(request,response) =>{
    var sql = `SELECT * FROM news WHERE newID = ${ request.query.newID }`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,newsList:result });
    })
})
// 查询10条最新发生的新闻
router.get('/getTenNews',(request,response) =>{
    var sql = `SELECT title,newID FROM news ORDER BY TIME DESC LIMIT 0,10`;
    db(sql,(result)=>{
        response.status(200).json({ code:200,tenNews:result });
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