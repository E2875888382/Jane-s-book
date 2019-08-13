<template>
<div class="container">
    <el-card class="box-card" shadow="hover" v-for="(item,index) in developer" :key="index">
        <div slot="header" class="clearfix">
            <el-tag effect="plain">{{ item.bed }}</el-tag>
            <el-tag type="danger" effect="plain">{{ item.title }}</el-tag>
            <el-tag type="info" effect="plain">{{ item.name }}</el-tag>
            <el-tag type="success" effect="plain">{{ item.class }}</el-tag>
        </div>
        <div class="text" :class="{'right':index%2 != 1}">
            <p>皮城id：{{ item.gameName }}</p>
            <p>宿舍地位：{{ item.status }}</p>
            <p>外号由来：{{ item.reason }}</p>
            <p>宿舍昵称：{{ item.nickname }}</p>
            <p>日常爱好：{{ item.hobby }}</p>
            <p>籍贯：{{ item.native }}</p>
            <p>毕业去向：{{ item.career }}</p>
        </div>
        <div  class="img" :class="{'left':index%2 != 1}">
            <el-image :src="item.avatar" fit="fill"></el-image>
        </div>
    </el-card>
    <el-divider></el-divider>
    <el-backtop></el-backtop>
</div>

</template>

<script>
export default {
    data() {
        return {
            developer:[],
        }
    },
    created() {
        this.getDeveloper();
    },
    methods:{
        getDeveloper(){
            this.get("getDeveloper").then((result) =>{
                this.developer = result.body;
            })
        },
    }
}
</script>
<style scoped>
.container{
    width:1000px;
    margin: 40px auto;
}
.box-card{
    padding: 20px;
    margin: 20px 0;
}
.right{
    float:right !important;
}
.left{
    float:left !important;
}
.text{
    width: 500px;
    height: 260px;
    float:left;
}
.img{
    width: 300px;
    height: 260px;
    float:right;
}
p{
    font-size:14px;
}
</style>
