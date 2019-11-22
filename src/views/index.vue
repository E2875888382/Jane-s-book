<template>
<div class="col-9 m-auto bg">
    <div class="list">
        <articleItem
          v-for="(item,index) in articleList" :key="index"
          :img="item.img"
          :id="item.articleID"
          :title="item.title"
          :author="item.nickName"
          :reply="item.replyCount"
          :praise="item.praise"
          :view="item.view"
        />
        <el-button type="info" round @click="load" v-if="!finished">阅读更多</el-button>
        <p class="tips" v-if="finished">没有更多了</p>
    </div>
    <div>
        <news></news>
    </div>
    <el-backtop></el-backtop>
</div>
</template>

<script>
import news from '../components/news.vue';
import article from '../api/article.js';
import articleItem from '../components/articleItem.vue'

export default {
    data(){
        return {
            currentPage:1,
            articleList:[],
            count:0,
            finished:false,
        }
    },
    components:{
        news,
        articleItem
    },
    mounted(){
        this.article(this.currentPage);
    },
    methods:{
        article(n){
            article.get(n).then(({ data:{ list,count } })=>{
                this.articleList = this.articleList.concat(list);
                this.count = count[0]['COUNT(*)'];
                this.currentPage++;
            }).catch((err)=>{
                console.log(err);
            })
        },
        load(){
            let max = Math.ceil(this.count/10);
            if(this.currentPage<=max){
                this.article(this.currentPage);
            }else{
                this.finished = true;
            }
        }
    }
}
</script>

<style scoped>
.bg{
    margin-top:58px !important;
    padding-top:30px;
    display:flex;
    justify-content: space-between;
}
.list{
    padding-left:15px;
    width:640px;
    min-height:2000px;
}
.el-button{
    width:625px;
    margin-bottom: 30px;
}
.tips{
    text-align:center;
    color:#999;
    margin:20px 0;
    font-size: 13px;
}
</style>