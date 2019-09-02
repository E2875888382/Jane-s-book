<template>
<div>
    <div class="top">
        <div class="sortBy">
            <span>最新发布</span> ·
            <span>最多评论</span> ·
            <span>最多浏览</span> ·
            <span>最多喜欢</span>
        </div>
        <span>{{$store.state.result.article.length}} 个结果</span>
    </div>
    <div class="article_item" v-for="item in $store.state.result.article" :key="item.streetID">
        <div class="author">
            <van-image width="24" height="24" class="user_img" :src="item.avatar"/>
            <span class="nick">{{item.nickName}}</span>
            <span class="time">{{ item.time | dateFormat }}天前</span>
        </div>
        <p class="title">
            <router-link :to="{name:'articleDetail',params:{articleId:item.streetID}}" v-html="highLight(item.topic)"></router-link>
        </p>
        <div class="info">
            <span><van-icon name="comment" color="#999"/>{{ item.replyCount }}</span>
            <span><van-icon name="eye" color="#999"/>{{ item.view }}</span>
            <span><van-icon name="good-job" color="#999"/>{{ item.praise }}</span>
        </div>
        <hr>
    </div>
</div>
</template>

<script>
export default {
    methods:{
        highLight:function(value){
            let search = this.$store.state.search;
            value = value.split(search).join(`<em style="color:#ea6f5a;font-style:normal">${search}</em>`)
            return value;
        },
    },
    filters:{
        dateFormat:function(value){
            let time = new Date(value);
            let now = new Date();
            return Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
        }
    }
}
</script>

<style scoped>
.top{
    width:625px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    height:40px;
    padding-bottom: 20px;
    color:#969696;
    font-size: 13px;
}
.sortBy span{
    cursor: pointer;
}
.user_img{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
.author{
    margin-bottom: 14px;
    font-size: 13px;
    display:flex;
}
.nick{
    margin:0 10px;
}
.time{
    color:#969696;
}
.title{
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 14px;
}
.title a{
    color: #333;
}
.info{
    height:20px;
    display:flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #999;
}
.info span{
    margin-right:10px;
    display:flex;
    align-items: center;
}
.info span .van-icon{
    margin-right:4px;
}
</style>