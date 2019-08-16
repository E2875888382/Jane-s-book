<template>
<div class="header col-12">
    <div class="mask"></div>
    <div class="head_content">
        <div class="top_box">
            <div class="left_box">
                <ul>
                    <li><router-link to="/street" class="top_link">步行街</router-link></li>
                    <li><router-link to="/news" class="top_link">新闻</router-link></li>
                    <li><router-link to="/photo" class="top_link">相簿</router-link></li>
                    <li><router-link to="/developer" class="top_link">开发者</router-link></li>
                </ul>
            </div>
            <search></search>
            <div class="right_box">
                <!-- 登录后状态框 -->
                <div class="new" v-if="$store.state.loginFlag">
                    <el-badge :is-dot="Boolean($store.state.messageCount)" >
                        <van-image @click="function(){$router.push({ path:'/userPage'})}" width="32" height="32" class="user_img" :src="$store.state.userIfo.avatar"/>
                    </el-badge>
                    <el-button type="warning" plain icon="el-icon-switch-button" circle size="mini" @click="logOut()"></el-button>
                </div>
                <!-- 登录按钮 -->
                <div class="login_btn" v-if="!$store.state.loginFlag">
                    <el-link :underline="false"  @click="()=>{dialogLoginVisible = true;this.slider=0}">登录</el-link>
                </div>
                <!-- 注册按钮  -->
                <div class="new_btn"  v-if="!$store.state.loginFlag">
                    <el-link :underline="false"  @click="()=>{dialogNewVisible = true;this.slider=0}">注册</el-link>
                </div>
                <!-- 登录模态框 -->
                <el-dialog title="登录" :visible.sync="dialogLoginVisible" center width="35%" :close-on-click-modal="false">
                    <el-form :model="loginForm" :rules="rules" ref="loginForm">
                        <el-form-item label="邮箱:" label-width="70px" prop="email">
                            <el-input v-model="loginForm.email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" label-width="70px" prop="password">
                            <el-input v-model="loginForm.password" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码:" label-width="70px" prop="code">
                            <el-input v-model="loginForm.code" autocomplete="off" style="max-width:150px"></el-input>
                            <valid-code :value.sync="validCode" style="float:right"></valid-code>
                        </el-form-item>
                    </el-form>
                    <el-slider v-model="slider" :show-tooltip="false" @input="change()"></el-slider>
                    <div slot="footer" class="dialog-footer" v-if="showBtn">
                        <el-button type="primary" @click="login()">登 录</el-button>
                    </div>
                </el-dialog>
                <!-- 注册模态框 -->
                <el-dialog title="注册账号" :visible.sync="dialogNewVisible" center width="35%" :close-on-click-modal="false">
                    <el-form :model="newForm" :rules="rules" ref="newForm" label-position="right">
                        <el-form-item label="邮箱:" label-width="90px" prop="email">
                            <el-input v-model="newForm.email" autocomplete="off"  ></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" label-width="90px" prop="password">
                            <el-input v-model="newForm.password" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码:" label-width="90px" prop="passwordAgain">
                            <el-input v-model="newForm.passwordAgain" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码:" label-width="90px" prop="code">
                            <el-input v-model="newForm.code" autocomplete="off" style="max-width:130px"></el-input>
                            <valid-code :value.sync="validCode" style="float:right"></valid-code>
                        </el-form-item>
                    </el-form>
                    <el-slider v-model="slider" :show-tooltip="false" @input="change()"></el-slider>
                    <div slot="footer" class="dialog-footer" v-if="showBtn">
                        <el-button type="primary" @click="newUser()">注 册</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <div class="bottom_box">
            <a href="//www.bilibili.com" class="head-logo"></a>
        </div>
    </div>
</div>
</template>

<script>
import search from './search.vue'
import md5 from 'js-md5';
import validCode from './validCode.vue'

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
        let checkCode = (rule,value,callback)=>{
            if(value.toLowerCase() !== this.validCode.toLowerCase()){
                callback(new Error('请再次确认验证码'))
            } else {
                callback()
            }
        }
        return {
            validCode:'',
            showBtn:false,
            slider:0,
            dialogNewVisible: false,//控制注册模态框标志
            dialogLoginVisible: false,//控制登录模态框标志
            newForm: { //注册表单
                email:'',
                password:'',
                passwordAgain:'',
                code:'',
            },
            loginForm:{ //登录表单
                email:'',
                password:'',
                code:'', 
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
                code:[
                    { validator: checkCode, trigger: 'blur' },
                    {'required': 'true', 'message': '请输入验证码', 'trigger': 'blur'}
                ]
            },
        };
    },
    components:{
        search,
        'valid-code':validCode,
    },
    created(){
        this.getStatus();//组件创建后获取登录者的基本信息
    },
    methods:{
        // 查询用户信息
        getStatus(){
            this.get('getLoginUserInfo').then((result)=>{
                if(result.data[0]){
                    this.$store.commit('userIfo',result.data[0]);
                    this.$store.commit('userStatus',true);
                    this.getFriendsMessage();
                    this.getHistoryMessage();
                    this.getFriends();
                    this.getPhotoCollection();
                    this.getStreetCollection();
                }
            })
        },
        // 注册
        newUser(){
            this.$refs['newForm'].validate((valid) => {
                if(valid){
                    let newForm = {
                        email:this.newForm.email,
                        password:md5(this.newForm.password),
                    }
                    //注册新用户，提交表单并获取返回的登录信息
                    this.post('newUser',newForm).then((result)=>{
                        if(result.data.code == 0){
                            this.$message({
                                message:'该邮箱已被注册',
                                type:'warning'
                            })
                        }else{
                            this.dialogNewVisible = false;
                            this.$message({
                                message:'注册成功',
                                type:'success'
                            });
                            this.post('login',newForm).then((result)=>{
                                if(result.data.code == 1){
                                    this.dialogLoginVisible = false;
                                    this.getStatus(); //登录后获取用户信息
                                    this.$router.push({ path:'/street'});// 登录后重定向到首页
                                }else{
                                    this.$message({
                                        message:'账号或密码错误',
                                        type:'warning'
                                    })
                                }
                            })
                        }
                    })
                }else{
                    return false;
                }
            })
        },
        // 登录
        login(){
            this.$refs['loginForm'].validate((valid) => {
                if(valid){
                    let form = {
                        email:this.loginForm.email,
                        password:md5(this.loginForm.password),
                    }
                    this.post('login',form).then((result)=>{
                        if(result.data.code == 1){
                            this.dialogLoginVisible = false;
                            this.getStatus(); //登录后获取用户信息
                            this.$router.push({ path:'/street'});// 登录后重定向到首页
                        }else{
                            this.$message({
                                message:'账号或密码错误',
                                type:'warning'
                            })
                        }
                    })
                }else{
                    return false;
                }
            })
        },
        change(){
            var bar = document.getElementsByClassName('el-slider__bar');
            var btn = document.getElementsByClassName('el-slider__button');
            if(this.slider == 100){
                this.showBtn = true;
                for(let i = 0;i<bar.length;i++){
                    bar[i].style.backgroundColor = 'rgb(102,204,102)';
                }
                for(let i = 0;i<btn.length;i++){
                    btn[i].style.backgroundPosition = '249px -1px';
                }
            }else{
                this.showBtn = false;
                for(let i = 0;i<bar.length;i++){
                    bar[i].style.backgroundColor = 'rgb(255,255,102)';
                }
                for(let i = 0;i<btn.length;i++){
                    btn[i].style.backgroundPosition = '323px -202px';
                }
            }
        }
    }
}
</script>

<style scoped>
.el-slider{
    margin-left:30px;
}
.right_box>>>.el-dialog{
    padding:0 60px 0 40px;
}
.el-slider>>>.el-slider__runway{
    margin:0;
    height:40px;
    border-radius:40px;
}
.el-slider>>>.el-slider__bar{
    height:40px;
    border-radius:40px 0 0 40px;
    background-color: rgb(255,255,102);
}
.el-slider>>>.el-slider__button-wrapper{
    top:0;
}
.el-slider>>>.el-slider__button{
    height:40px;
    width:40px;
    background-image: url(../../img/log.png);
    background-position: 323px -202px;
    background-color: white;
}
.new>>>.el-badge__content.is-fixed{
    top:8px;
}
.header{
    background-image: url('../../img/header.png');
    height:170px;
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
    width:100%;
    height: 170px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
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
    width:100%;
    line-height: 42px;
    text-align: center;
    display: flex;
    justify-content:space-evenly;
    align-items:center; 
}
.right_box{
    float: right;
    width: 150px;
    height: 42px;
    display: flex;
    flex-direction: row-reverse;
}
.head-logo{
    width: 220px;
    height: 105px;
    background: transparent no-repeat 0;
    z-index: 10;
    background-image:url('../../img/head-logo.png'); 
}
.top_box{
    display: flex;
    width: 100%;
    justify-content: space-around;
}
.left_box{
    width:320px;
    height: 42px;
}
.left_box>ul{
    list-style: none;
}
.bottom_box{
    width:100%;
    height:128px;
    display: flex;
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
.top_link:first-child{
    display: flex;
    justify-content: center;
    align-items: center;
}
.header_icon{
    background: url('https://www.bilibili.com/favicon.ico') no-repeat;
    width:20px;
    height: 21px;
    display: block;
    background-size: 100%;
}
.user_img{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
</style>
