- 项目功能:
  - 1.用户系统
    - 登录（邮箱作为账号）
    - 注册（发送邮箱验证码）
    - 个人信息（查看、修改）
    - 查看账号安全状况
    - 修改密码，修改绑定手机号、QQ号
    - 修改头像（支持上传本地图片）
    - 好友消息（读取、发送）
    - 管理好友（添加好友、删除好友、搜索好友）
    - 查看收藏（相簿、帖子）
  - 2.步行街模块
    - 帖子列表（查看最后回复）
    - 查看帖子详情、回复
    - 发表回复
    - 发表新帖子
    - 浏览量、回复量增加
    - 点赞、收藏
  - 3.新闻模块
    - 新闻列表
    - 查看新闻详情
    - 浏览量增加
  - 4.相簿模块
    - 主页瀑布流照片墙
    - 无限加载
    - 相簿详情
    - 点赞、收藏
    - 发表评论
  - 5.开发者模块
    - 开发者主页
  - 6.搜索
    - 主页字段搜索（搜索结果按模块内容分类）
- 技术栈：
  - vue.js
  - webpack
  - express
  - vuex
  - vue-router
  - axios
  - vue-infinite-scroll（无限加载插件）
  - vue-waterfall-easy（瀑布流布局插件）
  - elementUI
  - vant
  - bootstrap
- 运行方式
  - 1.安装依赖
    - ```npm i  ```
  - 2.创建本地数据库（MySQL）
    - sql结构文件已提交，数据库连接出现问题请修改server文件夹下的路由配置（关于本地数据库名称和密码的配置）
  - 3.开启后台服务器（app.js），端口号：8000
    - ```node app.js ```
  - 4.在根目录下开启webpack-dev-server，端口号：3000
    - ```npm run dev ```
- webpack编译完成会自动打开浏览器（loaclhost:3000/）
- 踩过的坑：
  - 1.vue-router的router-link如果跳转的是同一个组件，会发生地址栏改变数据却没有更新的情况
    - 原因：两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效
    - 复用机制导致数据没有重新渲染
    - 新闻组件是通过:newID来跳转页面的，同组件时新闻数据没法更新
    - 解决：使用watch监听路由变化，
    ```
    watch:{
            '$route':function(){
              this.id = this.$route.params.id;
              this.addNewsRead();
              this.getNewsDetails();
              this.getTenNews();
            }
          },
    ```
  - 2.已经登录用户刷新页面后，nodejs报错：Cannot set headers after they are sent to the client
    - 原因：header组件和collection组件在mounted阶段都调用了请求收藏列表的方法，浏览器发出同名的请求，服务器返回了2次及2次以上的响应
    - 解决：collection去掉请求就行了，只要header请求到就可以了，因为收藏列表数据保存在vuex中，子组件可以随时调用，没有必要重复请求

