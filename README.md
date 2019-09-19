- 功能：
	- [x] 浏览文章
	- [x] 浏览新闻
	- [x] 浏览相册
	- [x] 新闻随机更换
	- [x] 关注用户
	- [x] 用户信息设置、个人主页
	- [x] 关注者主页
	- [x] 评论、点赞
	- [x] 收藏文章、相册
	- [x] 搜索
	- [x] 写文章(只支持markdown)
	- [x] 注册、登录
	- [x] 发布相册

- 技术栈：
	- vue、vuex、vue-router
	- jsonp、axios
	- webpack
	- express
	- vue-infinite-scroll
	- vue-waterfall-easy
	- elementUI、vant、bootstrap

- 运行方式
	- 1.安装依赖
		- ```npm i  ```
	- 2.创建本地数据库（MySQL）
		- 修改model下db.config.js配置
	- 3.开启后台服务器（app.js），端口号：8000
		- ```node app.js ```
	- 4.在根目录下开启webpack-dev-server，端口号：3000
		- ```npm run dev ```
	- 5.webpack打包完成自动打开浏览器（loaclhost:3000/）


