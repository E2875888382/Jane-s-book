- 功能：
	- [x] 注册、登录
	- [x] 文章列表
	- [x] 文章评论、点赞、收藏
	- [x] 发布文章(暂只支持markdown格式)
	- [x] 新闻排行榜
	- [x] 新闻随机更换
	- [x] 相册墙
	- [x] 相册点赞、收藏
	- [x] 发布相册	
	- [x] 关注用户、被关注者主页
	- [x] 用户信息设置、个人主页
	- [x] 收藏页
	- [x] 搜索

- 待完成功能：
	- 发布文章添加富文本编辑器
	- markdown格式支持图片自由上传
	- 发送简信
	- 关注者新动态提醒

- 技术栈：
	- elementUI、vant、bootstrap
	- vue、vuex、vue-router
	- axios
	- webpack
	- express

- 运行方式：
	1.
		```
		npm i 
		```
	2. 创建MySQL数据库并修改db.config.js配置
	3. 开启后台服务器，端口号：8000
		```
		cd server
		node app.js 
		```
	4. 在根目录下开启webpack-dev-server，端口号：3000
		```
		npm run dev 
		```
	5. 打包完成自动打开loaclhost:3000/


