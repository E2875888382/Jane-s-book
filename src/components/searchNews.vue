<template>
<div>
    <div class="top">
        <div class="sortBy">
            <span @click="function(){sortBy(item.value);active = item.value}"
            v-for="item in sortOption"
            :key="item.value"
            :class="{'active':active == item.value}">
            {{item.name}}
            </span>
        </div>
        <span>{{$store.state.result.news.length}} 个结果</span>
    </div>
    <div class="article_item" v-for="item in news" :key="item.newID">
        <div class="author">
            <span>{{item.source}}</span>
            <span>{{ item.TIME | dateFormat }}天前</span>
        </div>
        <p class="title">
            <router-link :to="{name:'newsDetails',params:{id:item.newID}}" v-html="highLight(item.title)"></router-link>
        </p>
        <div class="info">
            <span><van-icon name="eye" color="#999"/>{{ item.view }}</span>
        </div>
        <hr>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            sortOption:[
                {name:'最新发布',value:'time'},
                {name:'最多浏览',value:'view'},
            ],
            active:'time',
            news:this.$store.state.result.news,
        }
    },
    mounted(){
        this.sortBy('time');
    },
    methods:{
        sortBy(type){
            if(type == 'time'){
                this.news.sort((a,b)=>{
                    return new Date(b.TIME).getTime() - new Date(a.TIME).getTime();
                })
            }else{
                this.news.sort((a,b)=>{
                    return b[type] - a[type];
                })
            }
        },
        highLight:function(value){
            let search = this.$store.state.search;
            value = value.split(search).join(`<em style="color:#ea6f5a;font-style:normal">${search}</em>`)
            return value;
        },
    },
    filters:{
        dateFormat:function(value){
            let time = new Date(value);
            let now = new Date();
            return Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
        }
    }
}
</script>


<style scoped>
.active,.sortBy span:hover{
    color:#ea6f5a;
}
.top{
    width:625px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    height:40px;
    padding-bottom: 20px;
    color:#969696;
    font-size: 13px;
}
.sortBy span{
    cursor: pointer;
    margin-right:10px;
}
.author{
    margin-bottom: 14px;
    font-size: 13px;
    display:flex;
    color:#969696;
}
.author span{
    margin-right:10px;
}
.title{
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 14px;
}
.title a{
    color: #333;
}
.info{
    height:20px;
    display:flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #999;
}
.info span{
    margin-right:10px;
    display:flex;
    align-items: center;
}
.info span .van-icon{
    margin-right:4px;
}
</style>