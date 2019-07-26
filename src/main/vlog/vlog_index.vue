<template>
<div class="bg">
    <div class="container">
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
            <li v-for="(item,index) in morePraise" :key="index">
                <div class="infinite-list-item">
                    <van-image width="50" height="50" class="avator" :src="item.avator"/>
                    <div class="log_box">
                            <div class="ifo">
                                <div>
                                    <a href="#">{{ item.user }}</a>
                                    <span class="vip1" v-if="item.isVip == 1"></span>
                                    <span class="vip2" v-if="item.isVip == 2"></span>
                                    <span class="vip3" v-if="item.isVip == 3"></span>
                                </div>
                                <div> 
                                    <el-dropdown trigger="click">
                                        <span class="el-dropdown-link">
                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item icon="el-icon-plus">关注</el-dropdown-item>
                                            <el-dropdown-item icon="el-icon-thumb">帮上头条</el-dropdown-item>
                                            <el-dropdown-item icon="el-icon-warning-outline">投诉</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </div>
                            <p v-html='highLight(item.summary)' class="msg" v-if="item.summary"></p>
                            <el-image v-if="item.img" style="width: 500px; height: 300px" :src="item.img" fit="fill"></el-image>
                            <div class="video" v-if="item.video">
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
                    <div class="item_act">
                        <ul>
                            <li><i class="el-icon-star-off"></i>收藏</li>
                            <el-divider direction="vertical"></el-divider>
                            <li><van-icon name="share" />转发 {{ item.forwarding }}</li>
                            <el-divider direction="vertical"></el-divider>
                            <li><i class="el-icon-chat-dot-square"></i>评论 {{ item.comments }}</li>
                            <el-divider direction="vertical"></el-divider>
                            <li @click="praise(item.id,$event),cancelPraise(item.id,$event)"><van-icon name="thumb-circle-o" />赞 {{ item.praise }}</li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
        <p v-if="loading" class="tips">加载中...</p>
        <p v-if="noMore" class="tips">没有更多了</p>
    </div>
    <el-backtop></el-backtop>
</div>
</template>

<script>
export default {
    data(){
        return {
            count:1,
            loading: false,
            vlog:[],
            max:10,
        }
    },
    mounted(){
        this.getVlogCount();
    },
    methods:{
        //过滤器，用于把两个#之间的文字高亮
        highLight:function(s){
            if(s){
                s = s.trim();
                var start = s.indexOf('#');
                var end = s.lastIndexOf('#');
                var key =  s.slice(start+1,end);
                var s1 = s.slice(0,start);
                var s2 = s.slice(end+1,s.length-1);
            }
            return  s1 +'<span style="color:blue">'+s[start]+'</span>'+'<span style="color:red">'+key+'</span>'+'<span style="color:blue">'+s[end]+'</span>'+ s2;
        },
        praise(id,event){
            if(!event.target.classList.contains("praise")){
                this.$http.post("praise",{ id: id }).then((result) =>{
                    if(result.body.code == 200){
                        for(var i = 0;i<this.vlog.length;i++){
                            if(this.vlog[i].id == id){
                                this.vlog[i].praise++;
                            }
                        }
                        event.target.classList.add('praise');
                    }
                })
            }
        },
        cancelPraise(id,event){
            if(event.target.classList.contains("praise")){
                this.$http.post("cancelPraise",{ id: id }).then((result) =>{
                    if(result.body.code == 200){
                        for(var i = 0;i<this.vlog.length;i++){
                            if(this.vlog[i].id == id){
                                this.vlog[i].praise--;
                            }
                        }
                        event.target.classList.remove('praise');
                    }
                })
            }
        },
        getVlogCount(){
            this.$http.get("getVlogCount").then((result) =>{
                this.max = result.body[0]['COUNT(*)'];
            })
        },
        load(){
            this.loading = true;
            setTimeout(()=>{
                this.$http.post("getVlog",{ count: this.count }).then((result) =>{
                    this.vlog.push(result.body[0]);
                    this.loading = false;
                    this.count ++;
                })
            },500)
        }
    },
    computed: {
        noMore () {
            return this.count >= this.max+1;
        },
        disabled () {
            return this.loading || this.noMore
        },
        morePraise:function(){
            return this.vlog.sort(function(a,b){
                return b.praise - a.praise;
            })
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
    margin-bottom: 20px;
    padding:16px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #eee;
    float:left;
}
.item_act{
    width:100%;
    height:40px;
    border-top: 1px solid #eee;
    float:right;
    margin-top:40px;
}
.log_box{
    width:868px;
    padding-left: 20px;
    float: right;
}
.ifo{
    width: 840px;
    height:25px;
    display: flex;
    justify-content: space-between;
}
.ifo a{
    color:#333;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
}
.ifo a:hover{
    color:#ef4d58;
}
.msg{
    width:840px;
    font-size: 14px;
    line-height: 25px;
    word-break: break-word;
    text-overflow: ellipsis;
}
.video{
    width:840px;
    height:281px;
    margin:5px 0;
}
.from{
    width:840px;
    height:25px;
    font-size: 12px;
    line-height: 25px;
    color: #808080;
}
.avator{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    float: left;
    margin-left: 15px;
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
    cursor: pointer;
}
.item_act>ul li i{
    width:15px;
    height:15px;
    margin-right:5px;
    vertical-align: middle;
    display:inline-block;
}
.item_act>ul li:hover{
    color:#ef4d58;
}
.el-divider{
    margin-top: 12px;
}
.praise{
    color:#ef4d58;
}
.vip1{
    width: 14px;
    height: 14px;
    display: inline-block;
    background: url('../../img/log.png') no-repeat ;
    background-position: 0 -75px;
}
.vip2{
    width: 14px;
    height: 14px;
    display: inline-block;
    background: url('../../img/log.png') no-repeat ;
    background-position: 0 -50px;
}
.vip3{
    width: 14px;
    height: 14px;
    display: inline-block;
    background: url('../../img/log.png') no-repeat ;
    background-position: 0 -300px;
}
</style>
