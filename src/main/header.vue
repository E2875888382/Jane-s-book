<template>
<div class="header">
    <div class="mask"></div>
    <div class="head_content">
       <div class="right_box">
                    <el-dropdown class="select_list"  size="small">
                    <el-button type="primary">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><a  @click="toUserPage()" >我的主页</a></el-dropdown-item>
                        <el-dropdown-item>好友消息</el-dropdown-item>
                        <el-dropdown-item><a  @click="logOut()" >退出登录</a></el-dropdown-item>
                    </el-dropdown-menu>
                     
                </el-dropdown>
                <div class="new" v-if="loginFlag">                 
                    <i>{{ currentUser }}</i>
                </div>

                <div class="login" v-if="unLoginFlag">
                    <el-link :underline="false"  @click="dialogLoginVisible = true">登录</el-link>                    
                </div>
                <el-dialog title="登录" :visible.sync="dialogLoginVisible" center width="30%" >
                    <el-form :model="loginForm" :rules="rules" ref="loginForm">
                        <el-form-item label="邮箱:" :label-width="formLabelWidth" prop="email" >
                            <el-input v-model="loginForm.email" autocomplete="off"  ></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
                            <el-input v-model="loginForm.password" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item>               
                    </el-form>
                    <div slot="footer" class="dialog-footer">                       
                        <el-button type="primary" @click="login()">登 录</el-button>
                    </div>
                </el-dialog>                
                <div class="new"  v-if="unLoginFlag">
                    <el-link :underline="false"  @click="dialogNewVisible = true">注册</el-link>   
                </div>
                <el-dialog title="注册账号" :visible.sync="dialogNewVisible" center width="30%" >
                    <el-form :model="newForm" :rules="rules" ref="newForm">
                        <el-form-item label="邮箱:" :label-width="formLabelWidth" prop="email" >
                            <el-input v-model="newForm.email" autocomplete="off"  ></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
                            <el-input v-model="newForm.password" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码:" :label-width="formLabelWidth" prop="passwordAgain">
                            <el-input v-model="newForm.passwordAgain" autocomplete="off" show-password minlength="8" maxlength="10"></el-input>
                        </el-form-item> 
                    </el-form>
                    <div slot="footer" class="dialog-footer">                       
                        <el-button type="primary" @click="newUser()">注 册</el-button>
                    </div>
                </el-dialog>
                
       </div>
       <a href="//www.bilibili.com" class="head-logo"   ></a>
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
      return {
        loginFlag:false,
        unLoginFlag:true,  
        activeIndex: '1',
        activeIndex2: '1',
        dialogNewVisible: false,
        dialogLoginVisible: false,
        currentUser:'',
        newForm: {
           email:'',
           password:'',
           passwordAgain:'',    
        },
        loginForm:{
           email:'',
           password:'',            
        },
        formLabelWidth: '100px',
        rules: {        
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
          ]       
       },
       componentName:'userPage', 
 
      };
    },
    created(){
       this.getLoginUser();
    },
    methods: {
        toUserPage(){
             this.$emit('childFn', this.componentName);
        },


        getLoginUser(){
             //请求登录session，用于持久化登录状态
            this.$http.get('http://localhost:8000/getLoginUser',{ credentials: true }).then(function(result){
                if(result.body.user){
                    this.currentUser = result.body.user.email;
                    this.unLoginFlag = false;
                    this.loginFlag = true;                 
                }         
        })
        },

        handleClick() {
            alert('button click');
        },

        newUser () { 
            this.$http.post('http://localhost:8000/newUser',this.newForm,{emulateJSON:true,credentials: true}).then(function(result){
                console.log(result.body);
                this.dialogNewVisible = false;
                this.unLoginFlag = false;
                this.loginFlag = true;
                this.currentUser = result.body.user;
            },function(error){
                console.log(error);
            })
           
           
        },
        
        login(){
            this.$http.post('http://localhost:8000/login',this.loginForm,{emulateJSON:true,credentials: true}).then(function(result){
               
                if(result.body.code == 1){
                    this.dialogLoginVisible = false;
                    this.unLoginFlag = false;
                    this.loginFlag = true;
                    this.currentUser = result.body.user;
                }else{
                    console.log(result.body);
                }
                
            },function(error){
                console.log(error);
            })            
        },

        logOut(){
            this.$http.get('http://localhost:8000/logOut',{credentials: true}).then(function(result){              
                if(result.body.code == 700){
                    this.currentUser = '';
                    this.unLoginFlag = true;
                    this.loginFlag = false; 
                }else{
                    console.log(result.body);
                }
                
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
    background-color: hsla(0,0%,100%,.4);
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
.login{
    height: 42px;
    line-height: 42px;
    text-align: center;
    float: left;
    width: 60px;
    
}
.new{
    height: 42px;
    line-height: 42px;
    text-align: center;
    float: left;
    width: 60px;
    
    
}
 
.right_box{
    float: right;
    width:250px;
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
    background-color: #fff  ;
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
</style>
