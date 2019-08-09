<template>
<div class="content col-11">
    <h3>NBA新闻</h3> 
    <el-divider></el-divider>
    <div class="media" v-for="item in newsList" :key="item.newID">
        <div class="media-left">
            <van-image width="150" height="100" class="user_img" :src="item.img"/>
        </div>
        <div class="media-body">
            <h5 class="media-heading"><router-link :to="'/newsDetails/'+item.newID">{{ item.title }}</router-link></h5>
            <p>{{ item.abstract }}</p>
            <div class="time_read_box">
                <span>来源：{{ item.source }} 发布时间：{{ item.time }} </span>
                <span>阅读：{{ item.view }}</span>
            </div>
            <el-divider></el-divider>
        </div>
    </div>
    <div class="block">
        <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="newsCount">
        </el-pagination>
    </div>
    <el-backtop></el-backtop>
</div>
</template>

<script>
export default {
    data(){
        return {
            newsList:[],// 新闻数组
            newsCount:0,// 新闻数量
            currentPage:1,// 当前页
        }
    },
    created(){
        this.getNews(1);
        this.getNewsCount();
    },
    methods:{
        // 页数变化触发请求一组新数据
        handleCurrentChange(val) {
            this.getNews(val);
        },
        // 获取新闻组
        getNews(num){
            this.$http.post("getNews",{ page:num }).then((result) =>{
                if(result.body.code == 200){
                    this.newsList = result.body.newsList;
                }
            })
        },
        // 获取新闻数量
        getNewsCount(){
            this.$http.get("getNewsCount").then((result) =>{
                if(result.body.code == 200){
                    this.newsCount = result.body.newsCount[0]["COUNT(*)"];
                }
            })
        },
    }
}
</script>

<style scoped>
.content{
    margin: 40px auto;
}
.time_read_box{
    display: flex;
    justify-content: space-between;
}
.time_read_box span{
    font-size: 12px;
    color: #989da2;
}
.block{
    margin-left: 300px;
}
.media-body{
    padding-left:40px;
}
</style>
