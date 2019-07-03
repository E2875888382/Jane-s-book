<template>
    <div class="content">
        <h3>{{ newsDetails.title }}</h3>
        <div class="time_read_box">
            <span>来源：{{ newsDetails.source }} 发布时间：{{ newsDetails.time }}</span>
            <span>阅读：{{ newsDetails.read }}</span>
        </div>
        <el-divider></el-divider>
        <div class="news_content">
            <van-image width="600" height="400" :src="newsDetails.img"/>
            <div class="right_box">
                <p>{{ newsDetails.details }}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsDetails:{},
        }
    },
    created(){
        this.getNewsDetails();
    },
    methods:{
        getNewsDetails(){
            this.$http.post("getNewsDetails",{ id:this.id }).then((result) =>{
                if(result.body.code == 200){
                    this.newsDetails = result.body.newsList[0];                                        
                }
            })
        }
    }
}
</script>

<style scoped>
.content{
    width: 1000px;
    margin: 40px auto;
}
.time_read_box{
    display: flex;
    justify-content: space-between;
}
.time_read_box span{
    font-size: 14px;
    color: #989da2;
}
.news_content{
    width: 1000px;
    display: flex;
    justify-content: space-between;
}
.right_box{
    width: 380px;
}
</style>
