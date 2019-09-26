const express = require('express');
const router = express.Router();
const controller = require('../controller/user.js');

// 增加用户
router.post('/register',controller.new);

// 查询登录
router.post('/login',controller.login);

// 退出登录
router.get('/out',controller.loginOut);

// 查用户信息
router.get('/user',controller.ifo);

// 文章收藏/取消收藏
router.get('/collect',controller.collect);

// 相册收藏/取消收藏
router.get('/photoCollect',controller.photoCollect);

// 修改用户信息
router.post('/updateUserInfo',controller.update);

// 修改手机号
router.post('/changeTelephone',controller.changePhone);

// 修改头像
router.post('/avatar',controller.avatar);

// 获取关注者的作品
router.get('/followerWork',controller.followerWork);

// 关注/取消关注
router.get('/follow',controller.follow);

module.exports = router;