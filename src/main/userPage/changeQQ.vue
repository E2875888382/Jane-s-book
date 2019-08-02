<template>
<div class="container">
    <el-form :model="Form" status-icon :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="QQ号" prop="newQQ">
            <el-input type="password" v-model="Form.newQQ" autocomplete="off"></el-input>
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
      return {
            Form:{
                newQQ:'',
            },
            rules: {
                newQQ: [
                    { min:8,  message: '请输入正确的QQ号码', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$http.post('changeQQ',{new:this.Form.newQQ,userID:this.$store.state.userIfo.userID}).then((result)=>{
                  if(result.body.code == 200){
                      this.$message({
                          message:'绑定QQ成功',
                          type:'success'
                      });
                      this.getLoginUserIfo();
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
        //获取用户信息并保存到vuex
        getLoginUserIfo(){
             //请求登录session，用于持久化登录状态
            this.$http.get('getLoginUserInfo',{ credentials: true }).then( (result) =>{
                if(result.body[0]){
                    this.$store.commit('userIfo',result.body[0]);
                }
            })
        },
    }
}
</script>

<style scoped>
.container{
    margin-top: 20px;
    height:110px;
}
</style>
