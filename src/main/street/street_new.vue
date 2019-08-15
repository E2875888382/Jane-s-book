<template>
    <div class="container col-10">
        <div class="bread col-12">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path:'/street' }">步行街</el-breadcrumb-item>
                <el-breadcrumb-item>发新帖（仅限图文）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="Form" :rules="rules" ref="Form"  class="demo-ruleForm col-12">
            <el-form-item prop="topic" label="主题">
                <el-input v-model="Form.topic" maxlength="40" show-word-limit></el-input>
            </el-form-item>
            <el-form-item prop="text" label="文字描述">
                <el-input type="textarea" v-model="Form.text" :rows="8" resize="none" maxlength="500" show-word-limit></el-input>
            </el-form-item>
            <van-uploader @oversize="oversize" v-model="Form.img" multiple  :max-count="1" :max-size="1000000" preview-size="200"/>
            <el-form-item>
                <el-button type="primary" @click="submitForm('Form')">发帖</el-button>
                <el-button @click="resetForm('Form')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
export default {
    data() {
      return {
        Form:{
            topic:'',
            text:'',
            img:[],
        },
        rules:{
            topic: [
                { required: true, message: '请填写主题', trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
        // 提交表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var newStreet = {
                        topic:this.Form.topic,
                        content:this.Form.text,
                        img:this.Form.img,
                        userID:this.$store.state.userIfo.userID,
                        time:new Date().toLocaleString(),
                    }
                    this.post('uploadNewStreet',{ new:newStreet }).then((result)=>{
                        if(result.data.code == 200){
                            this.$message.success('发帖成功，快去步行街看看吧');
                        }
                    })
                } else {
                    this.$message.error('服务器错误，请稍后再试');
                    return false;
                }
            });
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 图片oversize处理
        oversize(){
            this.$message( '请上传小于1M的图片');
        },
    }
}
</script>

<style scoped>
.container{
    margin-top:40px;
    margin-bottom: 40px;
    min-height:1000px;
}
.bread{
    height:30px;
    display: flex;
    align-items: center;
}
 
</style>
