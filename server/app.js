const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const session=require('express-session');

//导入路由
const Index = require('./router/index/index')
const ArticleDeatil = require('./router/article/detail')
const ArticleNew = require('./router/article/new')
const User = require('./router/user/user')
const Login = require('./router/user/login')
const Follow = require('./router/follow/follow')
const BaseSet = require('./router/set/baseSet')
const UserSet = require('./router/set/userSet')

const news_Router=require('./router/news/news_Router');//新闻模块路由
const photo_Router=require('./router/photo/photo_Router');//相簿模块路由
const search_Router=require('./router/search/search_Router');//搜索模块路由(主页搜索框)

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

//挂载router
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

//设置服务器端口
app.listen(8000,function(){
    console.log('----- server on -----');
});