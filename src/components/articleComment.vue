<template>
<div class="comment_box">
    <el-avatar shape="circle" :size="40" :src="$store.state.userIfo.avatar"/>
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
            <el-button round size="small" @click="comment = ''">取消</el-button>
            <el-button type="danger" round size="small" @click="submit">发布</el-button>
        </div>
    </div>
</div>
</template>

<script>
import article from '../api/article.js'
export default {
    props: ['article'],
    data(){
        return {
            comment:'',
        }
    },
    methods:{
        submit(){
            article.comment(this.article,this.comment).then((data)=>{
                this.$message({
                    message:'评论成功',
                    type:'success',
                    offset:100,
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
.el-button{
    margin-right:8px;
}
</style>