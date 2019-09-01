const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const session=require('express-session');

//导入路由
const Index = require('./index/index')
const ArticleDeatil = require('./article/detail')
const ArticleNew = require('./article/new')
const User = require('./user/user')
const Login = require('./user/login')
const Follow = require('./follow/follow')
const BaseSet = require('./set/baseSet')
const UserSet = require('./set/userSet')

const news_Router=require('./news/news')
const photo_Router=require('./photo/photo')
const search_Router=require('./search/search')

//解决控制台的内存溢出提示
require('events').EventEmitter.defaultMaxListeners = 0;

var app=express();

//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//设置静态文件夹
app.use('/node_modules/',express.static(path.join(__dirname,'../node_modules/')));

//设置跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length,userID');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//配置express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    name:'user',
    saveUninitialized: true,
    cookie:{
        maxAge:24*60*60*1000
    }
}));

app.use(Index)
app.use(Login)
app.use(ArticleDeatil)
app.use(ArticleNew)
app.use(User)
app.use(Follow)
app.use(BaseSet)
app.use(UserSet)

app.use(news_Router);
app.use(photo_Router);
app.use(search_Router);

app.listen(8000,function(){
    console.log('----- server on -----');
});