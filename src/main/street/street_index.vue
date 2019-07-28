<template>
    <div class="container col-10">
        <div class="row">
            <el-page-header content="步行街主干道" class="top col-10" @back="back"></el-page-header>
            <div class="col-2 link-box" v-if="$store.state.loginFlag">
                <router-link to="/street/new">发新帖<i class="link_icon"></i></router-link>
            </div>
        </div>
        <div class="content">
            <div class="top_title row col-12 m-auto ">
                <div class="col-6"><p>主题</p></div>
                <div class="col-2"><p>作者</p></div>
                <div class="col-2"><p>回复/浏览</p></div>
                <div class="col-2"><p>最后回复</p></div>
            </div>
            <div class="item row col-12 m-auto" v-for="(item,index) in streetList" :key="index">
                <div class="col-6 title"><router-link :to="'/streetDetails/'+item.id">{{ item.topic }}</router-link></div>
                <div class="col-2 author">
                    <a>{{ item.author }}</a>
                    <p>{{ item.time }}</p>
                </div>
                <div class="col-2 watch">{{ item.view }}/{{ item.replyCount }}</div>
                <div class="col-2 last-reply">
                    <p>2019-07-25</p>
                    <a>圆形的方块</a>
                </div>
            </div>
        </div>
        <div class="pages col-12">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="streetCount">
            </el-pagination>
        </div>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
export default {
    data(){
        return {
            currentPage:0,
            streetList:[],
            streetCount:0,
        }
    },
    mounted(){
        this.getStreetList(1);
        this.getStreetCount();
    },
    methods:{
        back(){

        },
        handleCurrentChange(val) {
            this.getStreetList(val);
        },
        getStreetList(n){
            this.$http.post('getStreet',{ page:n }).then((result)=>{
                if(result.body.code == 200){
                    this.streetList = result.body.streetList;
                }
            })
        },
        getStreetCount(){
            this.$http.get('getStreetCount').then((result)=>{
                this.streetCount = result.body.streetCount[0]['COUNT(*)'];
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
    height:1150px;
}
.content{
    height: 1010px;
}
.top{
    height:50px;
    line-height:50px;
}
.top_title{
    border-bottom: 1px solid #ccc;
    height:48px;
}
.top_title p{
    height:48px;
    margin:0;
    line-height:48px;
    font-size:14px;
    font-weight: 600;
}
.item{
    border-bottom: 1px solid #ccc;
    height:48px;
}
.item:hover{
    background-color: #ccc;
}
.title,.author,.last-reply,.watch{
    height:48px;
    line-height: 48px;
    margin:0;
}
.title a{
    font-size: 12px;
    line-height:48px;
}
.author a,.author p,.last-reply a,.last-reply p{
    display: block;
    height:24px;
    font-size:12px;
    line-height:24px;
    margin: 0;
}
.pages{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height:80px;
}
.link_icon{
    vertical-align: top;
    margin-left: 6px;
    background-image: url(https://163.bilibili.com/images/sprites/icon.png?acc9c4274adc16d47e7033a34b17c167);
    background-position: 0 -36px;
    width: 28px;
    height: 28px;
    background-repeat: no-repeat;
    display: inline-block;
}
.link-box{
    display: flex;
    justify-content: center;
    align-items: center;
}
.link-box a{
    height:28px;
    display: inline-block;
    line-height:28px;
    font-size:12px;
}
</style>
