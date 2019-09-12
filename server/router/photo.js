const express = require('express');
const router = express.Router();
const controller = require('../controller/photo.js')

// 获取一组相册
router.get('/photo',controller.photo);

// 相册详情
router.get('/photoDetail',controller.detail);

// 点赞/取消点赞
router.get('/photoPraise',controller.praise);

// 发布相簿
router.post('/addNewPhoto',controller.new);

module.exports = router;