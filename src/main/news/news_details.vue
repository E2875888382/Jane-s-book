<template>
    <div class="content col-11">
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
            <div style="width:300px;min-height:400px">
                <p class="ranking_head">24小时新闻排行榜</p>
                <p class="ranking_item" v-for="(item,index) in tenNews" :key="index">
                    <span :class="{ number:index<3 }">{{ index+1 }}</span><router-link :to="'/newsDetails/'+item.newID">{{ item.title }}</router-link>
                </p>
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
            newsDetails:{},
            imgContent:[],
            tenNews:[],
        }
    },
    mounted(){
        this.addNewsRead();
        this.getNewsDetails();
        this.getTenNews();
    },
    watch:{
        '$route':function(){
            this.id = this.$route.params.id;
            this.addNewsRead();
            this.getNewsDetails();
            this.getTenNews();
        }
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
            this.get("getNewsDetails",{ newID:this.id }).then((result) =>{
                if(result.data.code == 200){
                    this.newsDetails = result.data.newsList[0];
                    if(this.newsDetails.imgContent){
                        this.imgContent = this.newsDetails.imgContent.split(',')
                    }
                }
            })
        },
        //增加文章阅读量
        addNewsRead(){
            this.get("addNewsRead",{ newID:this.id }).then((result) =>{

            })
        },
        getTenNews(){
            this.get("getTenNews").then((result)=>{
                if(result.data.code == 200){
                    this.tenNews = result.data.tenNews;
                }
            })
        }
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
.ranking_head{
    font-size: 18px;
    font-weight: 400;
    color: #1a2939;
    font-family: "Microsoft Yahei";
}
.ranking_item{
    line-height: 20px;
    font-size: 12px;
    padding:3px;
    margin:0;
}
.ranking_item a{
    color: #989da2 !important;
    text-decoration-line: none;
}
.ranking_item span{
    font-style: italic;
    font-weight: 700;
    width:25px;
    display: inline-block;
}
.number{
    color: #ad0007;
}
</style>
