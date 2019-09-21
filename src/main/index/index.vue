<template>
<div class="col-9 m-auto bg">
    <div class="list">
        <div class="list_item" v-for="(item,index) in articleList" :key="index">
            <div :class="{'list_item_left':item.img,'long':!item.img}">
                <p class="title">
                    <router-link :to="{name:'articleDetail',params:{articleId:item.articleID}}">{{ item.title }}</router-link>
                </p>
                <p class="abstract">毁掉一个女生有多容易？ 接近她，对她好，让她爱上你，在你已经融入她的生活，看着她对你百般依赖后，毫不留情的踢开她，没个一两年她是走不出来的。 这...</p>
                <div class="info">
                    <span>{{ item.nickName }}</span>
                    <span><van-icon name="comment" color="#999"/>{{ item.replyCount }}</span>
                    <span><van-icon name="eye" color="#999"/>{{ item.view }}</span>
                    <span><van-icon name="good-job" color="#999"/>{{ item.praise }}</span>
                </div>
            </div>
            <el-image style="width:150px; height:100px" v-if="item.img" :src="item.img" fit="fill"></el-image>
        </div>
        <el-button type="info" round @click="load" v-if="!finished">阅读更多</el-button>
        <p class="tips" v-if="finished">没有更多了</p>
    </div>
    <div>
        <div class="photo_link" @click="$router.push('/photo')"></div>
        <news></news>
    </div>
    <el-backtop></el-backtop>
</div>
</template>

<script>
import news from './news.vue';
import article from '../common/article.js';

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
        news
    },
    mounted(){
        this.article(this.currentPage);
    },
    methods:{
        article(n){
            article.get(n).then((result)=>{
                this.articleList = this.articleList.concat(result.data.list);
                this.count = result.data.count[0]['COUNT(*)'];
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
.list_item{
    height:160px;
    padding:15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.list_item_left{
    width:458px;
    height:131px;
}
.long{
    width:625px;
    height:131px;
}
.title{
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.title a{
    color:black;
}
.abstract{
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
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
.el-image{
    border-radius: 4px;
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
.photo_link{
    width:280px;
    height:50px;
    margin-bottom:10px;
    background: url('https://cdn2.jianshu.io/assets/web/banner-s-6-c4d6335bfd688f2ca1115b42b04c28a7.png') no-repeat;
    background-size: 280px 50px ;
}
</style>