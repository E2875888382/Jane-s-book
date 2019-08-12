<template>
<div class="container">
    <el-form :model="Form" status-icon :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="Form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="Form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="submitForm('Form')">提交</el-button>
            <el-button size="small" @click="resetForm('Form')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            let rePassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/;
            if (!rePassword.test(value)) {
                callback(new Error('请输入8-10位的混合密码（数字，字母）'))
            } else {
                callback()
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.Form.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
        };
        return {
            Form: {
                pass: '',
                checkPass: '',
            },
            rules: {
                pass: [
                  { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                  { validator: validatePass2, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        // 提交表单
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http.post('changePassword',{new:this.Form.pass,userID:this.$store.state.userIfo.userID}).then((result)=>{
                    if(result.body.code == 200){
                        this.$message({
                            message:'修改密码成功',
                            type:'success'
                        });
                        this.$router.push({path:'/'});// 修改密码后重定向到首页
                        this.$message('请重新登陆');// 提示重新登陆
                        this.logOut();// 退出登录请求
                    }
                })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        // 重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.container{
    margin-top: 30px;
    height:180px;
}
</style>
