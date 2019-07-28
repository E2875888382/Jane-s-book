<template>
    <div class="container col-10">
        <div class="bread col-12">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path:'/street' }">步行街</el-breadcrumb-item>
                <el-breadcrumb-item>发新帖</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
 
        <el-backtop></el-backtop>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
    margin-top:40px;
    margin-bottom: 40px;
    border:1px solid #ccc;
    min-height:1000px;
}
.bread{
    height:30px;
    display: flex;
    align-items: center;
}
 
</style>
