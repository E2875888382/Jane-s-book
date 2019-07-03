# webpack-vue-express
- 项目名称：视频社交社区
  - 已经实现的功能
    - 1.好友系统
      - 登录（邮箱作为账号）
      - 注册（发送邮箱验证码）
      - 查看个人信息
      - 修改个人信息
      - 查看账号安全状况
      - 读好友消息
      - 管理好友（添加好友，删除好友）
      - 发送好友私信
    - 2.新闻系统
      - 新闻列表
      - 新闻详情查看
- 技术栈：
  - vue.js（前端主要框架）
  - webpack (资源打包)
  - express （node.js后端框架）
  - vuex （vue状态管理工具）
  - vue-router （vue的路由插件）
  - vue-resource （vue的ajax插件）
  - element UI （UI）
  - vant （UI）
  - bootstrap （UI）
- 运行方式
  - 1.安装依赖
    - ```npm i  ```
  - 2.在app.js下开启后台服务器（app.js），端口号：8000
    - ```node app.js ```
  - 3.在根目录下开启webpack-dev-server的服务器（打包前端资源），端口号：3000
    - ```npm run dev ```
- webpack编译完成会自动打开浏览器（loaclhost:3000/）
    
  
    
