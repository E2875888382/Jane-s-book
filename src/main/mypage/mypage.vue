<template>
<div class="content_box m-auto">
    <div class="left">
        <div class="top">
            <van-image width="80" height="80" class="user_img" :src="user.avatar" style="margin-right:20px"></van-image>
            <div class="info">
                <p class="name">{{user.nickName}}</p>
                <div class="meta">
                    <div>
                        <span>{{follow}}</span>
                        <router-link to="/follow" class="text">关注</router-link>
                    </div>
                    <div>
                        <span>{{article.length}}</span>
                        <span class="text">文章</span>
                    </div>
                    <div>
                        <span>{{photo.length}}</span>
                        <span class="text">相册</span>
                    </div>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="change">
            <el-tab-pane name="article">
                <span slot="label" class="label"><i class="el-icon-s-order"></i>文章</span>
                <div class="article_item" v-for="item in article" :key="item.streetID">
                    <div :class="{'short':item.img,'long':!item.img}">
                        <p class="article_topic">
                            <router-link :to="{name:'articleDetail',params:{articleId:item.streetID}}">{{ item.topic }}</router-link>
                        </p>
                        <p class="article_ob">xaxsxaxsaxsax</p>
                        <div class="metas">
                            <span><van-icon name="eye" color="#999"/>{{item.VIEW}}</span>
                            <span><van-icon name="comment" color="#999"/>{{item.replyCount}}</span>
                            <span>{{item.TIME}}</span>
                        </div>
                    </div>
                    <el-image v-if="item.img" style="width:125px; height:100px" :src="item.img" fit="fill"></el-image>
                </div>
            </el-tab-pane>
            <el-tab-pane name="photo">
                <span slot="label" class="label"><i class="el-icon-picture"></i>相册</span>
                <div class="article_item" v-for="item in photo" :key="item.photoID">
                    <div class="short">
                        <p class="article_topic">
                            <router-link :to="{name:'photoDetails',params:{id:item.photoID}}">{{ item.title }}</router-link>
                        </p>
                        <div class="metas">
                            <span><van-icon name="eye" color="#999"/>{{item.VIEW}}</span>
                            <span><van-icon name="good-job" color="#999"/>{{item.praise}}</span>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                    <el-image style="width:125px; height:100px" :src="item.src" fit="fill"></el-image>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <div class="right">
        <p style="color:#969696">个人介绍</p>
        <p>{{user.sign}}</p>
        <hr>
        <p class="link">
            <van-icon name="like-o"/>
            <router-link to="/collect">我收藏的文章/相册</router-link>
        </p>
        <hr>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            article:[],
            photo:[],
            follow:[],
            user:{},
            activeName:'article'
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            let user = this.$store.state.userIfo.userID;
            this.get('followerWork',{userID:user}).then((result)=>{
                this.article = result.data.article;
                this.photo = result.data.photo;
            })
            this.follow = this.$store.state.friendsList.length;
            this.user = this.$store.state.userIfo;
        },
        change(){
            console.log(this.activeName);
        }
    }
}
</script>

<style scoped>
.content_box{
    margin-top:58px !important;
    width:960px;
    min-height:500px;
    padding-top:30px;
    display:flex;
    justify-content: space-between;
}
.left{
    width:640px;
    padding-left:15px;
}
.user_img{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
.top{
    height:80px;
    display:flex;
    margin-bottom:30px;
}
.info{
    width:525px;
    height:80px;
}
.name{
    margin:0;
    height:34px;
    line-height: 34px;
    font-size: 21px;
    font-weight: 700;
}
.meta{
    height:40px;
    margin-top:6px;
    display: flex;
}
.meta>div{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #f0f0f0;
    min-width:50px;
}
.meta .text{
    font-size:14px;
    line-height:16px;
    color:#969696;
}
.right{
    width:280px;
    height:300px;
    font-size:14px;
}
a{
    color:#333;
}
.link{
    display: flex;
    align-items: center;
}
.link .van-icon{
    margin-right:10px;
}
.left>>>.el-tabs__item{
    width:120px;
    height:50px;
    font-size: 15px;
    font-weight: 700;
    padding:0;
    margin-right:20px;
}
.label{
    display: flex;
    width:120px;
    align-items: center;
    justify-content: center;
    color:#333;
}
.left>>>i{
    margin-right:10px;
}
.left>>>.el-tabs__active-bar{
    background-color:#333;
    width:120px !important;
}
.article_item{
    height:136px;
    margin: 0 0 15px;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    display:flex;
    justify-content: space-between;
}
.short{
    width:500px;
}
.long{
    width:625px;
}
.article_topic{
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    color: #333;
}
.article_ob{
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
}
.metas{
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #b4b4b4;
    display:flex;
}
.metas span{
    margin-right:10px;
    display: flex;
    align-items: center;
}
.metas span .van-icon{
    margin-right:4px;
}
.el-image{
    border-radius: 4px;
    border: 1px solid #f0f0f0;
}
</style>