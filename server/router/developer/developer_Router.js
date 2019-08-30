const express=require('express');
const router=express.Router();
const db = require('../../mysql.js');

// 查询developer
router.get('/getDeveloper',(request,response)=>{
    var sql = `SELECT * FROM developer `;
    db(sql,(result)=>{
        response.status(200).json(result);
    })
})

//导出router
module.exports=router;