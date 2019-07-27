<template>
    <div class="container col-10">
        <div class="col-12 bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path:'/street' }">步行街</el-breadcrumb-item>
                <el-breadcrumb-item>步行街主干道</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="topic-box col-12">
            <span>{{ streetDetails.topic }}</span>
            <span>{{ streetDetails.replyCount }}回复</span>
            <span>{{ streetDetails.view }}浏览</span>
        </div>
        <div class="col-12 main">
            <van-image width="50" height="50" class="avatar" :src="streetDetails.avatar"/>
            <div>
                <div class="top_box">
                    <a href="#">{{ streetDetails.author }}</a>
                    <span class="level">（{{ streetDetails.level }}级）</span>
                    <el-tag type="info" effect="dark" size="mini">楼主</el-tag>
                    <span class="time">{{ streetDetails.time }}</span>
                    <span class="floor">楼主</span>
                </div>
                <p class="subtopic">{{ streetDetails.topic }}<span> 由 {{ streetDetails.author }} 发表在虎扑步行街·步行街主干道</span></p>
                <p class="text">{{ streetDetails.text }}</p>
                <el-image v-if="streetDetails.img" style="width: 500px; height: 300px" :src="streetDetails.img" fit="fill"></el-image>
                <p class="from">发自虎扑iPhone客户端</p>
            </div>
        </div>
        <div class="reply col-12" v-for="(item,index) in streetReply" :key="index">
            <van-image width="50" height="50" class="avatar" :src="item.avatar"/>
            <div>
                <div class="top_box">
                    <a href="#">{{ item.user }}</a>
                    <span class="level">（{{ item.level }}级）</span>
                    <span class="time">{{ item.time }}</span>
                    <span class="light">亮了({{ item.light }})</span>
                    <span class="floor">{{ index + 1 }}楼</span>
                </div>
                <p class="text">{{ item.text }}</p>
                <el-image v-if="item.img" style="width: 400px; height: 300px" :src="item.img" fit="fill"></el-image>
                <p class="from">{{ item.from }}</p>
            </div>
        </div>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            streetDetails:[],
            streetReply:[],
        }
    },
    mounted(){
        this.getStreetDetails();
        this.getStreetReply();
    },
    methods:{
        getStreetDetails(){
            this.$http.post('getStreetDetails',{ id:this.id }).then((result)=>{
                if(result.body.code == 200){
                    this.streetDetails = result.body.streetDetails[0];
                }
            })
        },
        getStreetReply(){
            this.$http.post('getStreetReply',{ id:this.id }).then((result)=>{
                if(result.body.code == 200){
                    this.streetReply = result.body.streetReply;
                }
            })
        }
    }
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
    height:40px;
    display: flex;
}
.topic-box span:nth-child(1){
    font-size:18px;
    line-height: 40px;
    font-weight:600;
}
.topic-box span:nth-child(2),.topic-box span:nth-child(3){
    display: inline-block;
    font-size:12px;
    line-height: 40px;
    color:#999;
    text-align: center;
    margin: 0 10px;
}
.top_box{
    height:25px;
    border-bottom: 1px dotted #DDD;
}
.top_box a{
    font-size:12px;
    line-height: 25px;
}
.main,.reply{
    min-height: 240px;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    display: grid;
    grid-template-columns:10% 90%;
    grid-template-rows:1fr;
    margin-bottom: 20px;
    background-color: #f1f1f1;
}
.light{
    background: url(https://b3.hoopchina.com.cn/images/img_icon_07.gif?t=2015090901) -8px -523px no-repeat;
    padding-left: 16px;
    font-size:12px;
    line-height: 25px;
}
.floor{
    float: right;
    font-size:12px;
    line-height: 25px;
}
.level{
    font-size:12px;
    line-height: 25px;
}
.time{
    font-size:12px;
    line-height: 25px;
    color:#999;
}
.subtopic{
    font-size:14px;
    line-height:22px;
    margin: 10px 0;
}
.subtopic>span{
    color:#999;
}
.from{
    font-size:12px;
    color:#999;
}
.text{
    font-size:14px;
    line-height:1.6;
    margin: 10px 0;
}
.avatar{
    margin: 10px 0 0 10px;
}
</style>
