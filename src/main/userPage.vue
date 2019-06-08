<template>
    <div class="content" >
        <el-tabs tab-position="left" style="height: 1000px;"  type="border-card">
            <el-tab-pane>
                <span slot="label" @click="getLoginUser()">
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
                <div v-if="!loginFlag" class="warn">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                 <span slot="label">
                    <i class="el-icon-user"></i> 我的信息
                </span>
                <div v-if="loginFlag">
               
                
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="昵称" prop="nickName">
                        <el-input v-model="ruleForm.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="telephone">
                        <el-input v-model="ruleForm.telephone"></el-input>
                    </el-form-item>                       
                    <el-form-item label="出生日期" required>                        
                        <el-form-item prop="birth">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
                        </el-form-item>                                                
                    </el-form-item>                                        
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="ruleForm.gender">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="个性签名" prop="sign">
                        <el-input type="textarea" v-model="ruleForm.sign"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>     
                </div>

                <div v-if="!loginFlag"  class="warn">
                    <h1>请先登录</h1>
                </div>
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
            result:{},
            ruleForm: {
                nickName: '',
                telephone: '',
                birth: '',                                                             
                sign: '',
                gender:'',
            },
            rules: {
                nickName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                ],
                telephone:[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min:11,  message: '11 个数字', trigger: 'blur' }   
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],                                      
                sign: [
                    { required: true, message: '请填写个性签名', trigger: 'blur' }
                ]
            }     
        }
    },
    created(){
       
        
    },
    mounted(){
        this.getLoginUser();
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //发送数据到后台
                    this.$http.post('http://localhost:8000/updateUserInfo',{email:this.email,update:this.ruleForm, credentials: true }).then(function(result){
                        if(result.body.code==200){
                            this.$message({
                                message: '修改信息成功',
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();                         
                        }       
                    })                    
                    
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },



        getLoginUser(){
             //请求登录session，用于持久化登录状态
            this.$http.get('http://localhost:8000/getLoginUserInfo',{ credentials: true }).then(function(result){
                if(result.body[0]){
                    this.result= result.body[0];                                                                        
                    this.currentUser = this.result.nickName;
                    this.birth = this.result.birthday;
                    this.email = this.result.email;
                    this.gender = this.result.gender;
                    this.userId = this.result.id;
                    this.telephone =this.result.telephone;
                    this.level = this.result.level;
                    this.sign = this.result.sign;
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
.warn{
    margin: 0 auto;
    display: block;
    width: 300px;
    height:100px;
    text-align: center;
}
</style>
