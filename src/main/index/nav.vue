<template>
    <div class="nav_box">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4"><a href="" target="_blank">订单管理</a></el-menu-item>
            <el-menu-item index="5">新闻</el-menu-item>
            <el-menu-item index="6">NBA周边</el-menu-item>
            <el-menu-item index="7">步行街</el-menu-item>
            <el-menu-item index="8">处理中心</el-menu-item>
            <el-menu-item index="9">鬼畜</el-menu-item>
            <el-menu-item index="10">程序员</el-menu-item>
        </el-menu>
    </div>
</template>


<script>
export default {
      data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>
.nav_box{
    width:1000px;
    margin:0 auto;
}    
</style>
