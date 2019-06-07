<template>
    <div class="content">
        <el-tabs tab-position="left" style="height: 1000px;"  type="border-card">
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-s-home"></i> 个人主页
                </span>
                <div v-if="loginFlag">
                    <div class="user_info_head">
                        <van-image width="64" height="64" class="user_img" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                        <span class="user_name">{{ currentUser }}</span>
                        <van-progress :percentage="level"  :pivot-text="'LV'+ level " class="process_bar" color="#f2826a"/>
                    </div>

                    <el-divider content-position="left">基本信息</el-divider>

                    <div class="user_info_footer">
                        <div class="user_info_item">
                            <span class="font_label">用户ID：</span><span class="msg">{{ userId }}</span> 
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">出生日期：</span><span class="msg">{{ birth }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的手机：</span><span class="msg">{{ telephone }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的邮箱：</span><span class="msg">{{ email }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">性别：</span><span class="msg">{{ gender }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的等级：</span><span class="msg">{{ level }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的签名：</span><span class="msg">{{ sign }}</span>
                        </div>                                                                                                 
                    </div>

                </div>
                <div v-if="!loginFlag">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-user"></i> 我的信息
                </span>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-picture-outline-round"></i> 我的头像
                </span>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-lock"></i> 账号安全
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
export default {
    data(){
        return{
            currentUser:'',
            loginFlag:false,
            birth:'',
            email:'',
            gender:'',
            userId:'',
            telephone:'',
            level:'',
            sign:'',

        }
    },
    created(){
       this.getLoginUser();
        
    },
    mounted(){
        
    },
    methods:{
        getLoginUser(){
             //请求登录session，用于持久化登录状态
            this.$http.get('http://localhost:8000/getLoginUserInfo',{ credentials: true }).then(function(result){
                if(result.body){                
                    this.currentUser = result.body[0].nickName;
                    this.birth = result.body[0].birthday;
                    this.email = result.body[0].email;
                    this.gender = result.body[0].gender;
                    this.userId = result.body[0].id;
                    this.telephone = result.body[0].telephone;
                    this.level = result.body[0].level;
                    this.sign = result.body[0].sign;
                    this.loginFlag = true;           
                }         
            })
        },
      

    }
}
</script>

<style scoped>
 
.content{
     width:1000px;
     height:1000px;
     margin:100px auto;
}
.user_info_head{
    width: 800px;
    height: 150px;
    margin: 20px;
    position: relative;
}
.user_info_footer{
    width: 800px;
    height: 600px;
    margin: 20px;
    position: relative;
   
}
.process_bar{
    width: 300px;
    height: 20px;
    position: absolute;
    top: 50px;
    left: 100px;
}
.user_name{
    font-size: 18px;
    font-weight: 700;
    color: #222;
    cursor: default;
    position: absolute;
    top: 10px;
    left: 100px;
}
.user_info_item{
    width: 800px;
    height: 60px;
}
.font_label{
    font-size: 14px;
    color: #48576a;
    width: 95px;
    text-align: right;
    margin-right: 20px;
    float: left;
    line-height: 30px;
    padding: 0;
}
.msg{
    font-size: 14px;
    color: #48576a;  
    float: left;
    line-height: 30px;
    padding: 0;    
}
.user_img{
    width: 64px;
    height: 64px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
</style>
