<template>
<div class="bg">
    <div class="container">
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
            <li v-for="(item,index) in vlog" :key="index" class="infinite-list-item">
                <div class="item_feed">
                    <div class="avator">
                        <van-image width="50" height="50" class="user_img" :src="item.avator"/>
                    </div>
                    <div class="log_box">
                        <div class="ifo">
                            <div>
                                <a href="#">{{ item.user }}</a>
                                <span>V</span>
                            </div>
                            <div>举报</div>
                        </div>
                        <div class="msg">
                            <p>{{ item.summary }}</p>
                        </div>
                        <div class="video">
                            <video width="500" height="281" controls>
                                <source :src="item.video" type="video/mp4">
                                <source :src="item.video" type="video/ogg">
                                <source :src="item.video" type="video/webm">
                            </video>
                        </div>
                        <div class="from">
                            <p>{{ item.time }} 来自 {{ item.from }}</p>
                        </div>
                    </div>
                </div>
                <div class="item_act">
                    <ul>
                        <li>收藏</li>
                        <el-divider direction="vertical"></el-divider>
                        <li>转发 {{ item.forwarding }}</li>
                        <el-divider direction="vertical"></el-divider>
                        <li>评论 {{ item.comments }}</li>
                        <el-divider direction="vertical"></el-divider>
                        <li>赞 {{ item.praise }}</li>
                    </ul>
                </div>
            </li>
        </ul>
        <p v-if="loading" class="tips">加载中...</p>
        <p v-if="noMore" class="tips">没有更多了</p>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            count:0,
            loading: false,
            vlog:[],
        }
    },
    methods:{
        load(){
            this.loading = true;
            setTimeout(()=>{
                this.$http.get("getVlog").then((result) =>{
                    this.vlog.push(result.body[0]);
                    this.loading = false;
                    this.count ++;
                })
            },500)
        }
    },
    computed: {
      noMore () {
        return this.count >= 10
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
}
</script>

<style scoped>
.tips{
    text-align:center;
    margin:0;
}
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
