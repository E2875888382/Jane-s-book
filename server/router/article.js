const express = require('express');
const router = express.Router();
const controller = require('../controller/article.js');

// 首页文章
router.get('/article',controller.article);

// 获取详情
router.get('/articleDetail',controller.detail);

// 发表评论
router.post('/comment',controller.comment);

// 文章点赞/取消点赞
router.get('/praise',controller.praise);

// 评论点赞/取消点赞
router.get('/streetReplyPraise',controller.replyPraise);

// 发布文章
router.post('/uploadNewStreet',controller.new);

module.exports = router;