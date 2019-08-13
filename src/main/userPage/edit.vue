<template>
<div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="昵称" prop="nickName">
            <el-input v-model="ruleForm.nickName" minlength="1" maxlength="10" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="出生日期" required>
            <el-form-item prop="birth">
                <el-date-picker v-model="ruleForm.birth" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="ruleForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="个性签名" prop="sign">
            <el-input type="textarea" v-model="ruleForm.sign" resize="none" rows="4" maxlength="50" show-word-limit></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

    </el-form>
</div>
</template>

<script>
export default {
    data(){
        return {
            //更改用户信息表单
            ruleForm: {
                nickName: '',
                birth: '',
                sign: '',
                gender:'',
            },
            //规则，用于校验更改用户信息
            rules: {
                nickName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                sign: [
                    { required: true, message: '请填写个性签名', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 提交表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.post('updateUserInfo',{userID:this.$store.state.userIfo.userID,update:this.ruleForm}).then((result) =>{
                        if(result.data.code==200){
                            this.getLoginUserIfo();// 提交成功后重新请求用户信息
                            this.$message({
                                message: '修改信息成功',
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();// 提交成功后重置表单
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style scoped>

</style>
