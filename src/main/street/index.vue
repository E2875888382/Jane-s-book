<template>
<div class="col-9 m-auto bg">
    <div class="list">
        <div class="list_item" v-for="(item,index) in streetList" :key="index">
            <div class="list_item_left">
                <p class="title">
                    <router-link :to="'/streetDetails/'+item.streetID">{{ item.topic }}</router-link>
                </p>
                <p class="abstract">毁掉一个女生有多容易？ 接近她，对她好，让她爱上你，在你已经融入她的生活，看着她对你百般依赖后，毫不留情的踢开她，没个一两年她是走不出来的。 这...</p>
                <div class="info">
                    <span>{{ item.nickName }}</span>
                    <span>{{ item.replyCount }}</span>
                    <span>{{ item.view }}</span>
                </div>
            </div>
            <el-image style="width:150px; height:100px" src="https://upload-images.jianshu.io/upload_images/17156415-a8a471fe304a0942.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240" fit="fill"></el-image>
        </div>
        <el-button type="info" round>阅读更多</el-button>
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
        this.getStreetList(1);// 组件mounted阶段请求第一页帖子
        this.getStreetCount();
    },
    methods:{
        // 点击不同页根据页数请求贴子组
        handleCurrentChange(val) {
            this.getStreetList(val);
        },
        // 请求一组贴子，参数n是组数
        getStreetList(n){
            this.get('getStreet',{ page:n }).then((result)=>{
                if(result.data.code == 200){
                    this.streetList = result.data.streetList;
                }
            })
        },
        // 获取帖子总数，用于分页
        getStreetCount(){
            this.get('getStreetCount').then((result)=>{
                this.streetCount = result.data.streetCount[0]['COUNT(*)'];
            })
        },
    }
}
</script>

<style scoped>
.bg{
    padding-top:30px;
}
.list{
    padding-left:15px;
    width:640px;
    min-height:2000px;
}
.list_item{
    height:160px;
    padding:15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.list_item_left{
    width:458px;
    height:131px;
}
.title{
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.title a{
    color:black;
}
.abstract{
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
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
}
.el-image{
    border-radius: 4px;
}
.el-button{
    width:625px;
    margin-bottom: 30px;
}
</style>