<template>
<div class="content">
    <h3>NBA新闻</h3> 
    <el-divider></el-divider>
    <div class="media">
        <div class="media-left">
            <a href="#">
            <img class="media-object" src="https://i1.hdslb.com/bfs/face/f2fb25676db69bf9b75c4c853633bc6f0f800278.jpg@96w_96h_100Q_1c.webp" >
            </a>
        </div>
        <div class="media-body">
            <h5 class="media-heading">Shams：快船提前执行路易斯-威廉姆斯2020-21球队选项</h5>
            <p>虎扑7月2日讯 据The Athletic记者Shams Charania报道，消息人士透露，快船将提前执行威廉姆斯2020-21赛季的球队选项。</p>
            <div class="time_read_box">
                <div>发布时间：2019-07-2</div>
                <div>阅读：1023</div>
            </div>
            <el-divider></el-divider>
        </div>      
    </div>
    <div class="media">
        <div class="media-left">
            <a href="#">
            <img class="media-object" src="https://i1.hdslb.com/bfs/face/f2fb25676db69bf9b75c4c853633bc6f0f800278.jpg@96w_96h_100Q_1c.webp" >
            </a>
        </div>
        <div class="media-body">
            <h5 class="media-heading">Shams：快船提前执行路易斯-威廉姆斯2020-21球队选项</h5>
            <p>虎扑7月2日讯 据The Athletic记者Shams Charania报道，消息人士透露，快船将提前执行威廉姆斯2020-21赛季的球队选项。</p>
            <div class="time_read_box">
                <div>发布时间：2019-07-2</div>
                <div>阅读：1023</div>
            </div>
            <el-divider></el-divider>
        </div>      
    </div>    
</div>    
</template>

<script>
export default {
    data(){
        return {
            newsList:[],
        }
    },
    created(){

    },
    methods:{
        getNews(){
            this.$http("getNews").then((result) =>{
                if(result.body.status == 0){
                    this.newsList = result.body.newsList ; 
                }
            })
        }
    }
}
</script>

<style scoped>
.content{
    width:1000px;
    margin: 40px auto; 
}
.time_read_box{
    display: flex;
    justify-content: space-between;
}
</style>
