<template>
<div class="comment_box">
    <van-image width="40" height="40" class="avatar" :src="$store.state.userIfo.avatar"/>
    <div class="comment_right">
        <el-input
        type="textarea"
        resize="none"
        rows="4"
        maxlength="100"
        placeholder="写下你的评论..."
        v-model="comment">
        </el-input>
        <div class="btn_box">
            <van-button type="default" round size="small" @click="comment = ''">取消</van-button>
            <van-button type="danger" color="#ec7259" round size="small" @click="submit">发布</van-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['article'],
    data(){
        return {
            comment:'',
        }
    },
    methods:{
        submit(){
            let user = localStorage.getItem('token');
            this.post('comment',{token:user,article:this.article,content:this.comment}).then((data)=>{
                this.$message({
                    message:'评论成功',
                    type:'success'
                })
            })
        }
    }
}
</script>

<style scoped>
.comment_box{
    width:730px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    height:300px;
    padding: 24px;
    height:199px;
    display:flex;
    margin-bottom: 10px;
    justify-content: space-between;
}
.avatar{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
.comment_right{
    width:632px;
    height:151px;
}
.comment_box>>>.el-textarea__inner{
    background-color: whitesmoke;
}
.btn_box{
    width:632px;
    height:50px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
}
.van-button{
    margin-right:8px;
}
</style>