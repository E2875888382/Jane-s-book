<template>
    <div class="content col-8">
        <h3>{{ newsDetails.title }}</h3>
        <div class="time_read_box">
            <span>{{ newsDetails.source }} 发布时间：{{ newsDetails.time }}</span>
            <span>阅读：{{ newsDetails.view }}</span>
        </div>
        <el-divider></el-divider>
        <div class="news_content col-12">
            <div style="width:660px">
                <van-image width="660" :src="newsDetails.imgTop"/>
                <div class="content_box">
                    <p>{{ newsDetails.abstract }}。</p>
                    <div v-html="cut(newsDetails.content)"></div>
                    <van-image width="660" v-for="(item,index) in imgContent" :key="index" :src="item"/>
                </div>
                <p class="editor">{{ newsDetails.editor }}</p>
            </div>
        </div>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import news from '../common/news.js'
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsDetails:{},
            imgContent:[],
        }
    },
    mounted(){
        this.getNewsDetails();
    },
    methods:{
        //过滤器，用于把句号换为换行符
        cut:function(s){
            if(s){
                s = s.split('。');
                for(let i = 0;i<s.length;i++){
                    if(i<s.length-1){
                        s[i] = `<p style="font-size:14px;margin:10px 0">${s[i]}。</p>`;
                    }else{
                        s[i] = `<p style="font-size:14px;margin:10px 0">${s[i]}</p>`;
                    }
                }
                s = s.join('')
            }
            return  s;
        },
        //获取新闻详情
        getNewsDetails(){
            news.detail(this.id).then((result) =>{
                this.imgContent = [];//防止前面的内容重叠
                this.newsDetails = result.data[0];
                if(this.newsDetails.imgContent){
                    this.imgContent = this.newsDetails.imgContent.split(',')
                }
            })
        },
    }
}
</script>

<style scoped>
.content{
    margin: 70px auto;
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
    display: flex;
    justify-content: space-between;
}
.content_box p{
    font-size: 14px;
    line-height: 24px;
    white-space:pre-wrap;
    margin: 10px 0;
}
.editor{
    color: #1a2939;
    line-height: 24px;
    font-size: 14px;
    margin-top:10px;
}
</style>
