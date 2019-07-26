<template>
    <div class="container col-10">
        <el-page-header content="步行街主干道" class="top col-12" @back="back"></el-page-header>
        <div class="content">
            <div class="top_title row col-12 m-auto ">
                <div class="col-6"><p>主题</p></div>
                <div class="col-2"><p>作者</p></div>
                <div class="col-2"><p>回复/浏览</p></div>
                <div class="col-2"><p>最后回复</p></div>
            </div>
            <div class="item row col-12 m-auto" v-for="(item,index) in 20" :key="index">
                <div class="col-6 title"><a>为什么南方帅哥美女那么多，中国的明星都是南方人 </a></div>
                <div class="col-2 author">
                    <a>圆形的方块</a>
                    <p>2019-07-25</p>
                </div>
                <div class="col-2 watch">15/668</div>
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
            :total="200">
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
        }
    },
    methods:{
        back(){

        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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
</style>
