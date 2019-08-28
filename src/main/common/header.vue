<template>
<div class="header col-12">
    <div class="left_box col-10">
        <ul>
            <li><router-link to="/news">新闻</router-link></li>
            <li><router-link to="/photo">相簿</router-link></li>
            <li><router-link to="/developer">开发者</router-link></li>
        </ul>
        <search></search>
    </div>
    <div class="right_box col-2">
        <!-- 登录后状态框 -->
        <div class="new" v-if="$store.state.loginFlag">
            <el-badge :is-dot="Boolean($store.state.messageCount)" >
                <van-image @click="function(){$router.push({ path:'/userPage'})}" width="32" height="32" class="user_img" :src="$store.state.userIfo.avatar"/>
            </el-badge>
            <el-button type="warning" plain icon="el-icon-switch-button" circle size="mini" @click="logOut()"></el-button>
        </div>
        <!-- 登录按钮 -->
        <div class="login_btn" v-if="!$store.state.loginFlag">
            <el-link :underline="false"  @click="function(){$router.push({ path:'/login'})}">登录</el-link>
        </div>
        <!-- 注册按钮  -->
        <div class="new_btn"  v-if="!$store.state.loginFlag">
            <el-link :underline="false"  @click="function(){$router.push({ path:'/login'})}">注册</el-link>
        </div>
    </div>
</div>
</template>

<script>
import search from '../search/search.vue'
export default {
    components:{
        search,
    },
    created(){
        this.userIfo();
    },
}
</script>

<style scoped>
.header{
    display:flex;
    align-items: center;
    border-bottom:1px solid #f0f0f0;
    height:58px;
    justify-content: space-between;
}
.new>>>.el-badge__content.is-fixed{
    top:8px;
}
.login_btn,.new_btn{
    height: 42px;
    line-height: 42px;
    text-align: left;
    float: right;
    width: 60px;
}
.new{
    height: 42px;
    width:100%;
    line-height: 42px;
    text-align: center;
    display: flex;
    justify-content:space-evenly;
    align-items:center; 
}
.right_box{
    float: right;
    width: 150px;
    height: 42px;
    display: flex;
    flex-direction: row-reverse;
}
.left_box{
    height: 58px;
    display: flex;
    align-items: center;
}
.left_box>ul{
    list-style: none;
}
.left_box>ul li{
    float: left;
    width: 80px;
    height: 58px;
    line-height: 58px;
    font-size: 15px;
    text-align: center;
    display: block;
}
.left_box>ul li:hover{
    background-color:whitesmoke;
}
.user_img{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
</style>
