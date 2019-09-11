const express = require('express');
const router = express.Router();
const db = require('../mysql.js');

// 修改头像
router.post('/avatar', (req,res) =>{
    let token = Number(req.headers.token);
    let current = global.users.get(token);
    let avatar = req.body.avatar;
    let sqlAvatar = `UPDATE USER SET avatar = "${avatar}" WHERE userID = "${current}"`;
    db(sqlAvatar,()=>{
        res.status(200).json({ code:200 });
    })
})

module.exports = router;