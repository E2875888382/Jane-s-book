<template>
    <div>
        <van-uploader :after-read="afterRead" @oversize="oversize"  v-model="fileList" multiple  :max-count="1" :max-size="100000" />
        <el-button type="primary" @click="useAvatar">使用头像</el-button>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            fileList: []
        }
    },
    methods: {
        afterRead(file) {
        // 此时可以自行将文件上传至服务器
            this.$http.post("http://localhost:8000/uploadAvatar",file,{credentials: true}).then(function(result){
                console.log(result.body)
            })
            
        },
        oversize(){
            this.$message( '请上传小于100KB的图片');
        },
        useAvatar(){
            if(this.fileList.length!==0){
                this.$message( '切换头像成功');
                this.fileList.shift();
            }
            
        }
    }
}
</script>

<style scoped>

</style>
