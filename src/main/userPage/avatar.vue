<template>
    <div>
        <div style="position:relative">
            <van-uploader @oversize="oversize" v-model="Form.img" multiple  :max-count="1" :max-size="1000000" preview-size="200"/>
            <el-button type="primary" @click="useAvatar" class="using" >使用自定义头像</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            Form:{
                img:[],
            },
        }
    },
    methods: {
        // 上传图片超出限制触发oversize
        oversize(){
            this.$message( '请上传小于100KB的图片');
        },
        // 上传自定义头像
        useAvatar(){
            if(this.Form.img[0]){
                // 此时可以自行将文件上传至服务器

            }
        },
    }
}
</script>

<style scoped>
.user_img{
    width: 64px;
    height: 64px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    top: 42px;
    left: 46px;
}
.using{
    position: absolute;
    left: 230px;
    top: 30px;
}
.using-o{
    position: absolute;
    right: 100px;
    top: 30px;
}
.preview{
    width: 64px;
    height: 64px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    top: 20px;
    left: 400px;
}
</style>
