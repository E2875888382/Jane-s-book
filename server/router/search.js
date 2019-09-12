const express = require('express');
const router = express.Router();
const controller = require('../controller/search.js');

// 搜索
router.get('/search',controller.search);

module.exports = router;