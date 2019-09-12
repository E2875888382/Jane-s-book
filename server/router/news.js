const express = require('express');
const router = express.Router();
const controller = require('../controller/news.js');

// 获取详情
router.get('/newsDetail',controller.detail);

// 获取最新新闻
router.get('/news',controller.news);

module.exports = router;