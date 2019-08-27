<template>
<div class="bg">
    <div class="main">
        <div class="left">
            <div class="content">
                <h1 class="topic">{{ detail.topic }}</h1>
                <p class="info">{{ detail.time }} 阅读{{ detail.view }} 评论{{ detail.replyCount }}</p>
                <p class="text">{{ detail.content }}</p>
                <el-image v-if="detail.img" style="width:682px; height: 400px" :src="detail.img" fit="fill"></el-image>
            </div>
            <div class="comment">
                <h3 class="comment_header">
                    <span>全部评论 {{ comments.length }}</span>
                    <div class="sort">
                        <span>按时间倒序</span>
                        <span>按时间正序</span>
                    </div>
                </h3>
                <div class="comment_item" v-for="item in currentComments" :key="item.streetReplyID">
                    <van-image width="40" height="40" class="avatar" :src="item.avatar"/>
                    <div class="comment_content">
                        <p>{{ item.nickName }}</p>
                        <p>{{ item.time }}</p>
                        <p>{{ item.content }}</p>
                        <div>
                            <span>赞</span>
                        </div>
                    </div>
                </div>
                <div class="page">
                    <el-pagination
                    background
                    prev-text="上一页"
                    next-text="下一页"
                    @current-change="onePage"
                    layout="prev, pager, next"
                    :total="comments.length">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="author_info">
                <van-image width="45" height="45" class="avatar" :src="detail.avatar"/>
                <div>
                    <div class="author">
                        {{ detail.nickName }} 
                        <van-button plain type="danger" round size="mini">关注</van-button>
                    </div>
                    <p class="sign">{{ detail.sign }}</p>
                </div>
            </div>
            <hr>
        </div>
    </div>
    <el-backtop></el-backtop>
</div>
</template>

<script>
export default {
    data(){
        return {
            current:this.$route.params.articleId,
            comments:[],
            detail:{},
            currentComments:[],
        }
    },
    mounted(){
        this.load();
    },
    methods:{
        load(){
            this.jsp('articleDetail',{articleId:this.current}).then((data)=>{
                this.detail = data.detail[0];
                this.comments = data.comments;
                this.onePage(1);
            }).catch((err)=>{
                console.log(err);
            })
        },
        onePage(page){
            this.currentComments = this.comments.slice((page-1)*10,page*10);
        },
    }
}
</script>

<style scoped>
.bg{
    min-height:1000px;
    background-color: #F7F7F7;
    display:flex;
    justify-content: center;
    padding-top:10px;
}
.main{
    width:1000px;
    display: flex;
}
.left{
    width:730px;
    margin:0 10px 24px 0;
}
.right{
    width:260px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    height:300px;
    padding:16px;
}
.content{
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    min-height:500px;
    width:730px;
    padding:24px;
}
.topic{
    font-size: 32px;
    font-weight: 700;
    word-break: break-word;
    color: #404040;
    margin-bottom: 16px;
}
.info{
    line-height:19px;
    margin-bottom:32px;
    color: #969696;
    font-size: 14px;
}
.text{
    margin-bottom: 20px;
    line-height: 1.7;
    font-size: 16px;
    word-break: break-word;
}
.avatar{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
.comment{
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    min-height:400px;
    width:730px;
    padding:24px;
}
.author_info{
    height:45px;
    display:flex;
}
.author_info>div{
    width:175px;
    overflow: hidden;
}
.author{
    color: #2d2d2d;
    font-weight: 500;
    font-size: 14px;
    line-height:23px;
    width:175px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height:23px;
    margin-bottom:5px;
}
.sign{
    margin:0;
    height:17px;
    line-height:17px;
    color: #969696;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.comment_header{
    height:25px;
    margin-bottom:16px;
    padding-left:12px;
    border-left:4px solid #ec7259;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.comment_header>span{
    font-size: 18px;
    font-weight: 500;
    color: #404040;
}
.sort{
    font-size:12px;
    color:#969696;
}
.comment_item{
    display: flex;
}
.comment_content{
    margin:0 0 20px 10px;
    border-bottom: 1px solid #e6e6e6;
    width:632px;
    min-height:122px;
}
.comment_content p:nth-child(1){
    height:19px;
    margin:0;
    font-size:14px;
    line-height:19px;
}
.comment_content p:nth-child(2){
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
    margin-bottom:0;
}
.comment_content p:nth-child(3){
    margin-bottom:0;
    margin-top: 10px;
    font-size: 16px;
    line-height: 1.5;
    color: #404040;
}
.comment_content div{
    width:100%;
    margin-top:12px;
    height:21px;
}
.page{
    display: flex;
    justify-content: center;
}
.page>>>.number{
    border-radius: 50% !important;
    background-color: #fff !important;
    border: 1px solid #e6e6e6;
    font-weight: 400 !important;
}
.page>>>.active{
    background-color: #fff !important;
    border: 1px solid #ec7259 !important;
    color:#ec7259 !important;
}
.page>>>button{
    background-color: white !important;
    border-radius: 20px !important;
    border: 1px solid #e6e6e6;
    width:68px !important;
    font-weight: 400 !important;
}
</style>