<template>
<div class="container">
    <div class="top"></div>
    <div class="collect_item" v-for="item in article" :key="item.articleID">
        <p class="article_topic">
            <router-link :to="{name:'articleDetail',params:{articleId:item.articleID}}">{{ item.title }}</router-link>
        </p>
        <p class="article_content">xxxxxx</p>
        <div class="meta">
            <span class="article_view">
                <i class="iconfont">&#xe640;</i>
                {{item.view}}
            </span>
            <span class="article_replyCount">
                <i class="iconfont">&#xe62b;</i>
                {{item.replyCount}}
            </span>
            <span class="article_time">
                {{item.time}}
            </span>
            <span class="article_cancel" @click="unCollect(item.articleID)">取消收藏</span>
        </div>
    </div>
</div>
</template>

<script>
import user from '@api/user.js'
export default {
    data(){
        return {
            article:null,
        }
    },
    activated(){
        this.load();
    },
    methods:{
        load(){
            this.article = this.$store.state.streetCollection;
        },
        unCollect(articleID){
            new Promise((resolve)=>{
                user.collect(articleID,false).then(()=>{
                    this.$store.dispatch('userIfo');
                })
                resolve()
            }).then(()=>{
                setTimeout(()=>{
                    this.load();
                },500)
            })
        }
    }
}
</script>

<style scoped>
.container{
    margin-top:58px !important;
    min-height:600px;
    width:720px;
    padding:30px 15px;
    margin:58px auto;
}
.top{
    width:690px;
    height:110px;
    margin-bottom: 30px;
    background: url('https://cdn2.jianshu.io/assets/web/collect-note-955d8c71641a360924390da9da4b0151.png') no-repeat;
    background-size: 690px 110px;
}
.collect_item{
    margin: 0 0 15px;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    height:136px;
}
.article_topic{
    margin: -7px 0 4px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
}
.article_topic a{
    color: #969696;
}
.meta{
    display: flex;
}
i{
    font-size:12px;
}
.article_view,.article_replyCount,.article_time,.article_cancel{
    display:flex;
    align-items: center;
    margin-right: 10px;
    color: #b4b4b4;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
}
.article_content{
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
}
</style>