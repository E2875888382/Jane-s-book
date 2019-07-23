var express=require('express');
var bodyParser=require('body-parser');
var fs=require('fs');
var path=require('path');
var session=require('express-session');

//导入路由
var login_Router=require('./router/login_Router');
var index_Router=require('./router/index_Router');
var userPage_Router=require('./router/userPage_Router');
var news_Router=require('./router/news_Router');
var comic_Router=require('./router/comic_Router');
var vlog_Router=require('./router/vlog_Router');
var developer_Router=require('./router/developer_Router');

//解决控制台的溢出提示
// (node:3772) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 
//11 error listeners added. Use emitter.setMaxListeners() to increase limit
require('events').EventEmitter.defaultMaxListeners = 0;

var app=express();
//配置body-parser用于处理post请求
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//设置静态文件夹
app.use('/node_modules/',express.static(path.join(__dirname,'../node_modules/')));
//设置跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//配置express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
 }));

//挂载router
app.use(login_Router);
app.use(index_Router);
app.use(userPage_Router);
app.use(news_Router);
app.use(comic_Router);
app.use(vlog_Router);
app.use(developer_Router);
//设置服务器端口
app.listen(8000,function(){
    console.log('----- Data server is on -----');
});