<template>
    <div class="container col-10">
        <div class="col-12 bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>步行街</el-breadcrumb-item>
                <el-breadcrumb-item>步行街主干道</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="topic-box col-12">
            <span>为什么南方帅哥美女那么多，中国的明星都是南方人</span>
            <span>10回复</span>
            <span>555浏览</span>
        </div>
        <div class="col-12 main">
            <van-image width="50" height="50" class="avator" src=" "/>
            <div class="content">
                <div class="top_box">
                    <a href="#">虎扑用户180085</a>
                    <span>（1级）</span>
                    <el-tag type="info">楼主</el-tag>
                    <span>2019-07-26 16:38</span>
                </div>
                <p>南方人好时尚啊，到处帅哥美女，南方人眼睛大，皮肤白，又有钱，都是绅士淑女</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.container{
    margin-top:40px;
    margin-bottom: 40px;
    border:1px solid #ccc;
    min-height:1000px;
}
.bread{
    height:30px;
    display: flex;
    align-items: center;
}
.topic-box{
    height:30px;
    display: flex;
}
.topic-box span:nth-child(1){
    font-size:18px;
    line-height: 30px;
    font-weight:600;
}
.topic-box span:nth-child(2),.topic-box span:nth-child(3){
    display: inline-block;
    font-size:12px;
    line-height: 30px;
    color:#999;
    text-align: center;
    margin: 0 10px;
}
.top_box{
    border-bottom: 1px dotted #DDD;
}
.main{
    min-height: 240px;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    display: grid;
    grid-template-columns:10% 90%;
    grid-template-rows:1fr;
}
</style>
