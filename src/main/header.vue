<template>
<div class="header">
    <div class="mask"></div>
    <div class="head_content">
        <div class="top_box">
            <div class="left_box">
                <ul>
                    <li><router-link to="/index" class="top_link"><i class="header_icon"></i>首页</router-link></li>
                    <li><router-link to="/news" class="top_link">新闻中心</router-link></li>
                    <li><router-link to="/comic" class="top_link">漫画</router-link></li>
                    <li><router-link to="/index" class="top_link">NBA论坛</router-link></li>
                    <li><router-link to="/index" class="top_link">步行街</router-link></li>
                </ul>
            </div>
            <div class="right_box">
                <!-- 更多 -->
                <el-dropdown class="select_list"  size="small"  v-if="$store.state.loginFlag">
                    <el-button type="primary">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><i class="el-icon-user"></i><a href="#/userPage" >我的主页</a></el-dropdown-item>
                        <el-dropdown-item><i class="el-icon-switch-button"></i><a @click="logOut()" href="#/index" >退出登录</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 登录后状态框 -->
                <div class="new" v-if="$store.state.loginFlag">
                    <ul>
                        <li>
                            <van-image width="32" height="32" class="user_img" :src="$store.state.userIfo.avatar"/>
                        </li>
                        <li>
                            <span>{{ $store.state.userIfo.nickName }}</span>
                        </li>
                        <li>
                            <el-badge :value="$store.state.messageCount" class="item">
                                <i class="el-icon-message"></i><a href="#/userPage" >消息</a>
                            </el-badge>
                        </li>
                    </ul>
                </div>
                <!-- 登录按钮 -->
                <div class="login_btn" v-if="$store.state.unLoginFlag">
                    <el-link :underline="false"  @click="dialogLoginVisible = true">登录</el-link>
                </div>
                <!-- 登录模态框 -->
                <el-dialog title="登录" :visible.sync="dialogLoginVisible" center width="30%">
                    <el-form :model="loginForm" :rules="rules" ref="loginForm">
                        <el-form-item label="邮箱:" label-width="100px" prop="email">
                            <el-input v-model="loginForm.email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" label-width="100px" prop="password">
                            <el-input v-model="loginForm.password" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="login()">登 录</el-button>
                    </div>
                </el-dialog>
                <!-- 注册按钮  -->
                <div class="new_btn"  v-if="$store.state.unLoginFlag">
                    <el-link :underline="false"  @click="dialogNewVisible = true">注册</el-link>
                </div>
                <!-- 注册模态框 -->
                <el-dialog title="注册账号" :visible.sync="dialogNewVisible" center width="30%" >
                    <el-form :model="newForm" :rules="rules" ref="newForm">
                        <el-form-item label="邮箱:" label-width="100px" prop="email" >
                            <el-input v-model="newForm.email" autocomplete="off"  ></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" label-width="100px" prop="password">
                            <el-input v-model="newForm.password" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码:" label-width="100px" prop="passwordAgain">
                            <el-input v-model="newForm.passwordAgain" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="输入邮箱验证码:" label-width="100px" prop="sms">
                            <el-input v-model="newForm.sms" autocomplete="off"><el-button slot="append" @click="sendSms">发送验证码</el-button></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="newUser()">注 册</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <a href="//www.bilibili.com" class="head-logo"></a>
        <!-- 头部搜索框 -->
        <div class="search_box">
            <a href="//www.bilibili.com/ranking" target="_blank" class="link-ranking"><span>排行榜</span></a>
            <div class="search-form" >
                <div class="input-group">
                    <input type="text" class="form-control search-input" placeholder="Search for...">
                    <button class="form-btn"></button>
                </div> 
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
     data() {
        let checkEmail = (rule, value, callback) => {
            let reEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!reEmail.test(value)) {
            callback(new Error('请输入正确的邮箱格式'))
            } else {
            callback()
            }
        }
        let checkPassword= (rule, value, callback) => {
            let rePassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/;
            if (!rePassword.test(value)) {
            callback(new Error('请输入8-10位的混合密码（数字，字母）'))
            } else {
            callback()
            }
        }
        let checkPasswordAgain= (rule, value, callback) => {  
            if (value !== this.newForm.password) {
            callback(new Error('请再次确认密码'))
            } else {
            callback()
            }
        }
        let checkSms=(rule, value, callback) => {  
            if (value !== this.sms) {
            callback(new Error('请再次确认验证码'))
            } else {
            callback()
            }
        }
        return {
            sms:'',//中间验证码
            dialogNewVisible: false,//控制注册模态框标志
            dialogLoginVisible: false,//控制登录模态框标志
            newForm: { //注册表单
                email:'',
                password:'',
                passwordAgain:'',
                sms:'',
            },
            loginForm:{ //登录表单
                email:'',
                password:'', 
            }, 
            rules: { //模态框输入规则
                email: [
                    { validator: checkEmail, trigger: 'blur' },
                    {'required': 'true', 'message': '请输入邮箱', 'trigger': 'blur'}
                ],
                password: [
                    { validator: checkPassword, trigger: 'blur' },
                    {'required': 'true', 'message': '请输入密码', 'trigger': 'blur'}
                ],
                passwordAgain:[
                    { validator: checkPasswordAgain, trigger: 'blur' },
                    {'required': 'true', 'message': '请输入密码', 'trigger': 'blur'}
                ],
                sms:[
                    { validator: checkSms, trigger: 'blur' },
                    {'required': 'true', 'message': '请输入验证码', 'trigger': 'blur'}
                ]
            },
        };
    },
    created(){
        this.getLoginUser();//组件创建后获取登录状态
        this.getLoginUserIfo();//组件创建后获取登录者的基本信息
    },
    methods:{
        getLoginUser(){
            //请求登录session，用于持久化登录状态
            this.$http.get('getLoginUser',{ credentials: true }).then(function(result){
                if(result.body.user){
                   this.$store.commit('userStatus',{currentUser:result.body.user.email,loginFlag:false,unLoginFlag:true});
                }
            })
            
        },
        getLoginUserIfo(){
            //请求登录者的基本信息，并保存到vuex
            this.$http.get('getLoginUserInfo',{ credentials: true }).then( (result) =>{
                if(result.body[0]){
                    this.$store.commit('userIfo',result.body[0]);
                }
            })
        },
        newUser(){
            //注册新用户，提交表单并获取返回的登录信息
            this.$http.post('newUser',this.newForm,{emulateJSON:true,credentials: true}).then(function(result){
                this.dialogNewVisible = false;
                this.$store.commit('userStatus',{ currentUser:result.body.user,loginFlag:true,unLoginFlag:false});
                location.href="#/";//注册并且登录完成，重定向到首页
            },function(error){
                console.log(error);
            })
        },
        login(){
            //登录，提交表单并获取登录信息
            this.$http.post('login',this.loginForm,{emulateJSON:true,credentials: true}).then((result) =>{
                if(result.body.code == 1){
                    this.dialogLoginVisible = false;
                    this.$store.commit('userStatus',{currentUser:result.body.user,unLoginFlag:false,loginFlag:true});
                    location.href="#/";//登录完成，重定向到首页
                }else{
                    console.log(result.body);
                }
            },(error) => {
                console.log(error);
            })
        },
        logOut(){
            //退出登录，获取返回状态
            this.$http.get('logOut',{credentials: true}).then((result) => {
                if(result.body.code == 700){
                    this.$store.commit('userStatus',{currentUser:'',unLoginFlag:true,loginFlag:false});
                }else{
                    console.log(result.body);
                }
            },(error) => {
                console.log(error);
            })
        },
        sendSms(){
            //发送验证码，获取返回验证码并对比
            this.$http.post('sendSms',this.newForm,{emulateJSON:true,credentials: true}).then(function(result){
                this.sms = result.body.sms;
            },function(error){
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
.header{
    background-image: url('../img/header.png');
    display: block;
    height:170px;
    width: 100%;
    background-position: center -10px;
    background-repeat: no-repeat;
}
.mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 42px;
    background-color: hsla(0,0%,90%,.4);
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
}
.head_content{
    width:1000px;
    height: 170px;
    margin: 0 auto;
    position: relative;
}
.select_list{
    float: right;
    height: 42px;
   
}
.login_btn,.new_btn{
    height: 42px;
    line-height: 42px;
    text-align: left;
    float: right;
    width: 60px;
}
.new{
    height: 42px;
    line-height: 42px;
    text-align: center;
    float: left;
    width: 300px;
}
.new ul{
    display: flex;
    justify-content: space-between;
}
.new ul li{
    width: 100px;
    height: 42px;
    position: relative;
}
.new ul li a,.new ul li span{
    text-decoration: none;
    color: #222;
    font-size: 14px;
}
.new ul li:before,
.new ul li:after{
    content: "";
}
.right_box{
    float: right;
    width: 400px;
    height: 42px;
}
.head-logo{
    position: absolute;
    width: 220px;
    height: 105px;
    left: 24px;
    top: 55px;
    background: transparent no-repeat 0;
    z-index: 10;
    background-image:url('../img/head-logo.png'); 
}
.search_box{
    position: absolute;
    bottom: 20px;
    right: 0;
    width: 342px;
    height: 32px;
    padding: 2px 2px 2px 72px;
    background-color: rgba(0,0,0,.12);
    border-radius: 6px;
    font-size: 12px;
    z-index: 10;
}
.search-form{
    width:268px;
    height:32px;
    padding:0;
    margin:0;
    background-color: hsla(0,0%,100%,.88);
    border-radius: 4px;
    transition: background-color 0.2s;
}
.search-form:hover{
    background-color: #fff;
    cursor: pointer;
}
.search-input{
    float: left;
    width: 200px;
    color: #222;
    font-size: 12px;
    overflow: hidden;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    border: 0;
    box-shadow: none;
    background-color: transparent;
} 
.form-btn{
    display: block;
    position: absolute;
    right: 0;
    width: 48px;
    min-width: 0;
    cursor: pointer;
    height: 32px;
    background: url("../img/icons.png") -653px -720px;
    margin: 0;
    padding: 0;
    border: 0;
}
.link-ranking{
    position: absolute;
    left: 2px;
    top: 2px;
    height: 32px;
    line-height: 32px;
    background-color: hsla(0,0%,100%,.88);
    border-radius: 4px;
    width: 68px;
    transition: background-color 0.2s;
    text-decoration: none;
    cursor: pointer;
}
.link-ranking>span{
    padding-left: 26px;
    color: #f25d8e;
    display: inline-block;
    background: url("../img/icons.png") -659px -655px no-repeat;
}
.link-ranking:hover{
    background-color: #fff;
}
.top_box{
    display: flex;
    position: absolute;
    top: 0;
    width: 1000px;
    justify-content: space-between;
}
.left_box{
    width:400px;
    height: 42px;
}
.left_box>ul{
    list-style: none;
}
.left_box>ul li{
    float: left;
    width: 80px;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    text-align: center;
}
.left_box>ul li:hover{
    background-color:hsla(0,0%,100%,.4);
}
.top_link{
    display: block;
    color:#222;
    height: 42px;
    widows: 80px;
    text-decoration: none;
    font-size: 12px;
    font-weight: 600;
}
.header_icon{
    background: url('https://www.bilibili.com/favicon.ico') no-repeat;
    width:20px;
    height: 21px;
    display: block;
    position: absolute;
    top: 10px;
    left:2px;
    background-size: 100%;
}
.user_img{
    position: absolute;
    top: 5px;
    left: 60px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
</style>
