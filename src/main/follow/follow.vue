<template>
<div class="container m-auto">
    <div class="aside">
        <p class="aside_top">
            <span>全部关注</span>
            <span><van-icon name="add" class="add"/>添加关注</span>
        </p>
        <div class="follow_item" :class="{'active':activeId == item.userID}" @click="choose(item)" v-for="item in $store.state.friendsList" :key="item.userID">
            <van-image width="40" height="40" class="user_img" :src="item.avatar"/>
            <span>{{ item.nickName }}</span>
        </div>
    </div>
    <div class="follow_main" v-if="follower">
        <div class="follow_header">
            <van-image width="80" height="80" class="user_img" :src="follower.avatar"/>
            <div>
                <div class="follow_ifo">
                    <p class="nickName">
                        {{follower.nickName}}
                        <i class="el-icon-male" v-if="follower.gender == '男'"></i>
                        <i class="el-icon-female" v-if="follower.gender == '女'"></i>
                    </p>
                    <p class="sign">{{follower.sign}}</p>
                </div>
                <div class="btn_box">
                    <van-button plain type="primary" round>发简信</van-button>
                    <van-button plain type="primary" round @click="unFollow(follower.userID)">取消关注</van-button>
                </div>
            </div>
        </div>
        <div class="follow_work">
            <el-tabs v-model="activeName">
                <el-tab-pane name="article">
                    <span slot="label" class="tabs"><van-icon name="new" />最新发布</span>
                    <div class="article_item" v-for="item in followerWork.article" :key="item.streetID">
                        <div :class="{'short':item.img,'long':!item.img}">
                            <p class="article_topic">
                                <router-link :to="{name:'articleDetail',params:{articleId:item.streetID}}">{{ item.topic }}</router-link>
                            </p>
                            <p class="article_ob">xaxsxaxsaxsax</p>
                            <div class="meta">
                                <span><van-icon name="eye" color="#999"/>{{item.VIEW}}</span>
                                <span><van-icon name="comment" color="#999"/>{{item.replyCount}}</span>
                                <span>{{item.TIME}}</span>
                            </div>
                        </div>
                        <el-image v-if="item.img" style="width:125px; height:100px" :src="item.img" fit="fill"></el-image>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="photo">
                    <span slot="label" class="tabs"><van-icon name="photo" />最新相簿</span>
                    <div class="article_item" v-for="item in followerWork.photo" :key="item.photoID">
                        <div class="short">
                            <p class="article_topic">
                                <router-link :to="{name:'photoDetails',params:{id:item.photoID}}">{{ item.title }}</router-link>
                            </p>
                            <div class="meta">
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
    </div>
</div>
</template>

<script>
import user from '../common/user.js'
export default {
    data(){
        return {
            activeName:'article',
            activeId:'',
            follower:null,
            followerWork:{},
        }
    },
    methods:{
        choose(item){
            this.follower = item;
            this.activeId = item.userID;
            user.followerWork(item.userID).then((result)=>{
                this.followerWork = result.data;
            })
        },
        unFollow(friend){
            user.follow(friend,false).then(()=>{
                this.userIfo();
            })
            this.follower = null;
            this.followerWork = {};
        }
    }
}
</script>

<style scoped>
.container{
    width:960px;
    margin-top:58px !important;
    padding:30px 15px;
    min-height:1000px;
}
.aside{
    position: fixed;
    top: 0;
    bottom: 0;
    margin: 86px 0 60px;
    width: 280px;
    overflow: auto;
    border-right: 1px solid #f0f0f0;
}
.aside_top{
    margin-bottom:7px;
    height:34px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
}
.aside_top .add{
    margin-right: 5px;
}
.aside_top span:nth-child(1){
    line-height:17px;
    font-size:15px;
    display:flex;
    align-items:center;
}
.aside_top span:nth-child(2){
    line-height:17px;
    font-size:13px;
    display:flex;
    align-items:center;
    margin-right:10px;
}
.user_img{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
.follow_item{
    display:flex;
    align-items: center;
    height:60px;
    padding:10px 13px;
    width:279px;
}
.follow_item span{
    margin-left:5px;
    font-size:14px;
}
.follow_ifo{
    max-width:350px;
    overflow: hidden;
}
.follow_item:hover,.active{
    background-color: #f0f0f0;
}
.btn_box{
    width:175px;
    display:flex;
    justify-content: space-between;
}
.follow_main{
    width:625px;
    min-height:2000px;
    float:right;
}
.follow_header{
    height:80px;
    display:flex;
    justify-content: space-between;
    margin-bottom: 18px;
}
.follow_header>div{
    width:525px;
    height:80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nickName{
    margin: 0;
    height:40px;
    font-size: 21px;
    font-weight: 700;
    line-height:40px;
}
.sign{
    margin: 0;
    height:40px;
    line-height:40px;
    font-size: 14px;
    color: #969696;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.el-icon-male{
    color:blue;
}
.el-icon-female{
    color:#ea6f5a;
}
.follow_work{
    width:625px;
    min-height:1500px;
}
.tabs{
    display:flex;
    align-items: center;
    justify-content: center;
    width:100px;
    color:#999;
}
.container>>>.el-tabs__active-bar{
    width:100px !important;
    background-color: black;
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
.article_topic a{
    color:#333;
}
.article_ob{
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
}
.meta{
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #b4b4b4;
    display:flex;
}
.meta span{
    margin-right:10px;
    display: flex;
    align-items: center;
}
.meta span .van-icon{
    margin-right:4px;
}
.el-image{
    border-radius: 4px;
    border: 1px solid #f0f0f0;
}
</style>