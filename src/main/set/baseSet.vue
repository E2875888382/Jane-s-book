<template>
<div>
    <div class="top">
        <van-image width="100" height="100" class="user_img" :src="avatar" style="margin-right:50px"></van-image>
        <van-uploader v-model="img" :max-count="2" :after-read="afterRead" :preview-image="false">
            <van-button type="primary" plain round size="small">更换头像</van-button>
        </van-uploader>
    </div>
    <div class="item">
        <span class="label">电子邮件</span>
        <span>{{email}}</span>
    </div>
    <div class="item">
        <span class="label">手机</span>
        <span>{{telephone}}</span>
    </div>
    <div class="item">
        <span class="label">QQ</span>
        <span>{{qq}}</span>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            email:'',
            telephone:'',
            avatar:'',
            qq:'',
            img:[],
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.avatar = this.$store.state.userIfo.avatar;
            this.email = this.$store.state.userIfo.email;
            this.telephone = this.$store.state.userIfo.telephone;
            this.qq = this.$store.state.userIfo.qq;
        },
        afterRead(){
            this.avatar = this.img[0].content;
            let user = localStorage.getItem('token');
            this.post("avatar",{avatar:this.img[0].content}).then((result)=>{
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
.item{
    height:73px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items:center;
}
.label{
    font-size: 15px;
    color: #969696;
    display: inline-block;
    width:150px;
}
</style>