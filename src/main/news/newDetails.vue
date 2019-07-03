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
                <p>{{ newsDetails.details | cut }}</p>                       
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
    filters:{
        cut:function(s){
            if(s){
                s = s.replace(/。/g,"。\n");
            }
            return  s; 
        }
    },
    created(){
        this.addNewsRead();
        this.getNewsDetails();       
    },
    methods:{
        //获取新闻详情
        getNewsDetails(){
            this.$http.post("getNewsDetails",{ id:this.id }).then((result) =>{
                if(result.body.code == 200){
                    this.newsDetails = result.body.newsList[0];                                                                
                }
            })
        },
        //增加文章阅读量
        addNewsRead(){
            this.$http.post("addNewsRead",{ id:this.id }).then((result) =>{
              
            },(error) =>{
                console.log(error);
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
.right_box p{
    font-size: 14px;
    line-height: 24px;
    white-space:pre-wrap;
    text-indent: 2em;
}
</style>
