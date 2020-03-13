<template>
<div>
    <div class="top">
        <el-avatar shape="circle" :size="100" :src="ava" style="margin-right:50px"/>
        <van-uploader v-model="img" :max-count="2" :after-read="afterRead" :preview-image="false">
            <el-button round size="small">更换头像</el-button>
        </van-uploader>
    </div>
    <div class="item">
        <span class="label">电子邮件</span>
        <span>{{$store.state.userIfo.email}}</span>
    </div>
    <div class="item">
        <span class="label">手机</span>
        <span>{{$store.state.userIfo.tel}}</span>
    </div>
</div>
</template>

<script>
import user from '@api/user.js'
export default {
    data(){
        return {
            img:[],
            avatar:'',
        }
    },
    computed:{
        ava:{
            get(){
                this.avatar = this.$store.state.userIfo.avatar
                return this.avatar;
            },
            set(value){
                this.avatar = value;
            }
        }
    },
    methods:{
        afterRead(){
            this.ava = this.img[0].content;
            user.avatar(this.avatar).then(({data:{code}})=>{
                if(code == 200){
                    this.$message({
                        message:' 切换头像成功',
                        type:'success',
                        offset:100,
                    });
                    this.$store.dispatch('userIfo');
                    this.img = [];
                }
            })
        }
    }
}
</script>

<style scoped>
.top {
    width:625px;
    height:120px;
    padding-bottom: 20px;
    display: flex;
    align-items:center;
}
div>>>.van-uploader__upload,div>>>.van-uploader__preview {
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
.item {
    height:73px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items:center;
}
.label {
    font-size: 15px;
    color: #969696;
    display: inline-block;
    width:150px;
}
.el-button {
    border:1px solid #91de1be0;
    color:green;
    cursor: pointer;
}
</style>