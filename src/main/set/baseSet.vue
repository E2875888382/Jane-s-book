<template>
<div>
    <div class="top">
        <van-image width="100" height="100" class="user_img" :src="avatar" style="margin-right:50px"></van-image>
        <van-uploader v-model="img" :max-count="2" :after-read="afterRead" :preview-image="false">
            <van-button type="primary" plain round size="small">更换头像</van-button>
        </van-uploader>
    </div>
    <div class="nickName"></div>
    <div></div>
</div>
</template>

<script>
export default {
    data(){
        return {
            avatar:'',
            img:[],
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.avatar = this.$store.state.userIfo.avatar;
        },
        afterRead(){
            this.avatar = this.img[0].content;
            let user = localStorage.getItem('token');
            this.post("avatar",{token:user,avatar:this.img[0].content}).then((result)=>{
                if(result.data.code == 200){
                    this.$message({
                        message:' 切换头像成功',
                        type:'success'
                    });
                    this.userIfo();
                    this.img = [];
                }
            })
        }
    }
}
</script>

<style scoped>
.top{
    width:625px;
    height:120px;
    padding-bottom: 20px;
    display: flex;
    align-items:center;
}
div>>>.van-uploader__upload,div>>>.van-uploader__preview,.user_img{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
</style>