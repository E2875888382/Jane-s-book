<template>
<div class="bg">
    <div class="container">
        <ul class="infinite-list" v-infinite-scroll="load">
            <li v-for="i in count" :key="i" class="infinite-list-item">
                <div class="item_feed">
                    <div class="avator">
                        <van-image width="50" height="50" class="user_img" src="https://i2.hdslb.com/bfs/face/156d5d3b3f4b66d940365b3b0e3a809e1fcc0d97.jpg@96w_96h_100Q_1c.webp"/>
                    </div>
                    <div class="log_box">
                        <div class="ifo">
                            <div>
                                <a href="#">新浪体育</a>
                                <span>V</span>
                            </div>
                            <div>举报</div>
                        </div>
                        <div class="msg">
                            <p>【律师：孙杨要求国际体育仲裁法庭听证会公开受理】#孙杨要求9月听证会公开审理# 新华网消息中国游泳奥运冠军孙杨的律师团队19日发表声明说，孙杨要求国际体育仲裁法庭（CAS）举行听证会的时候，向公众开放，以求公开透明，证明自己的清白。</p>
                        </div>
                        <div class="video">
                            <video width="500" height="281" controls>
                                <source src="http://v.hoopchina.com.cn/hupuapp/bbs/0/0/thread__0_20190721065050_28492.mp4?auth_key=1563719923-0-0-b36ad1a304a0e157aeef93d584deb179" type="video/mp4">
                                <source src="http://v.hoopchina.com.cn/hupuapp/bbs/0/0/thread__0_20190721065050_28492.mp4?auth_key=1563719923-0-0-b36ad1a304a0e157aeef93d584deb179" type="video/ogg">
                                <source src="http://v.hoopchina.com.cn/hupuapp/bbs/0/0/thread__0_20190721065050_28492.mp4?auth_key=1563719923-0-0-b36ad1a304a0e157aeef93d584deb179" type="video/webm">
                            </video>
                        </div>
                        <div class="from">
                            <p>07月20日 19:35 来自 微博 weibo.com</p>
                        </div>
                    </div>
                </div>
                <div class="item_act">
                    <ul>
                        <li>收藏</li>
                        <el-divider direction="vertical"></el-divider>
                        <li>转发12489</li>
                        <el-divider direction="vertical"></el-divider>
                        <li>评论394</li>
                        <el-divider direction="vertical"></el-divider>
                        <li>赞23948</li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            count:0,
        }
    },
    methods:{
        load(){
            this.count += 2;
        }
    }
}
</script>

<style scoped>
.bg{
    background: #f7f7f7;
    padding-top:40px;
}
.container{
    width:1000px;
    margin:0 auto;
    min-height:2000px;
}
.infinite-list{
    width: 970px;
}
.infinite-list-item{
    display: block;
    width:970px;
    height:540px;
    margin-bottom: 20px;
    padding:16px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #eee;
}
.item_act{
    width:100%;
    height:40px;
    border-top: 1px solid #eee;
}
.item_feed{
    width:100%;
    height:466px;
    position: relative;
}
.item_feed .log_box{
    position: absolute;
    left:70px;
    top:0;
    width:868px;
    height:466px;
    padding-left: 20px;
}
.log_box>.ifo{
    width: 840px;
    height:25px;
    display: flex;
    justify-content: space-between;
}
.log_box>.msg{
    width:840px;
    height: 105px;
    font-size: 14px;
    line-height: 25px;
    word-break: break-word;
}
.log_box>.video{
    width:840px;
    height:281px;
    margin:5px 0;
}
.log_box>.from{
    width:840px;
    height:25px;
    font-size: 12px;
    line-height: 25px;
    color: #808080;
}
.avator{
    width:70px;
    height:70px;
    position:relative;
}
.user_img{
    position: absolute;
    top: 5px;
    left: 20px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.item_act>ul{
    list-style: none;
    width:936px;
    height:40px;
    display: flex;
    justify-content:space-between; 
}
.item_act>ul li{
    text-align: center;
    display:inline-block;
    width:230px;
    line-height: 40px;
    font-size:14px;
}
.el-divider{
    margin-top: 12px;
}
</style>
