const express=require('express');
const router=express.Router();
const db = require('../mysql.js');

// 修改头像
router.post('/avatar', (req,res) =>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let avatar = req.body.avatar;
    var sqlAvatar = `UPDATE USER SET avatar = "${avatar}" WHERE userID = "${current}"`;
    new Promise((resolve)=>{
        db(sqlAvatar,()=>{
            resolve()
        })
    }).then(()=>{
        res.status(200).json({message:"上传成功",code:200});
    }).catch((err)=>{
        console.log(err)
    })

})

module.exports=router;