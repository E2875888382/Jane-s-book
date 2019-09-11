const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Index = require('./index/index')
const ArticleDeatil = require('./article/detail')
const ArticleNew = require('./article/new')
const User = require('./user/user')
const Login = require('./user/login')
const Follow = require('./follow/follow')
const BaseSet = require('./set/baseSet')
const UserSet = require('./set/userSet')
const News = require('./news/news')
const Photo = require('./photo/photo')
const Search = require('./search/search')

const app = express();

//配置body-parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//设置静态文件夹
app.use('/node_modules/',express.static(path.join(__dirname,'../node_modules/')));

//设置跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length,token');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(Index)
app.use(Login)
app.use(ArticleDeatil)
app.use(ArticleNew)
app.use(User)
app.use(Follow)
app.use(BaseSet)
app.use(UserSet)
app.use(News);
app.use(Photo);
app.use(Search);

app.listen(8000,function(){
    console.log('----- server on -----');
});