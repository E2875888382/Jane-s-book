<template>
    <div>
        <el-menu  class="el-menu-demo" mode="horizontal" >
            <el-menu-item><router-link to="/comic/index">首页</router-link></el-menu-item>
            <el-menu-item><router-link to="/comic/ranking">排行榜</router-link></el-menu-item>
            <el-menu-item><router-link to="/comic/classification">分类</router-link></el-menu-item>
        </el-menu>
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.el-menu-demo{
    padding: 0 100px;
    box-shadow:0px 0px 3px #c8c8c8 ;
}
.el-menu-item{
    width:100px;
    text-align: center;
}
</style>
