<template>
<div class="header">
    <router-link to="/"><div class="logo"></div></router-link>
    <div class="left_box col-9 m-auto">
        <ul>
            <li><router-link to="/">发现</router-link></li>
            <li v-if="$store.state.loginFlag"><router-link to="/follow">关注</router-link></li>
            <li v-if="$store.state.loginFlag"><router-link to="/developer">消息</router-link></li>
        </ul>
        <search></search>
    </div>
    <div class="right_box col-2">
        <!-- 登录后状态框 -->
        <div class="new" v-if="$store.state.loginFlag">
            <el-dropdown placement="bottom-start">
                <el-badge :is-dot="Boolean($store.state.messageCount)" >
                    <van-image width="40" height="40" class="user_img" :src="$store.state.userIfo.avatar"/>
                </el-badge>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <div class="dropdown">
                            <van-icon name="manager" color="#ea6f5a"/>
                            <span>我的主页</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <div class="dropdown" @click="function(){$router.push({ name:'collect'})}">
                            <van-icon name="label" color="#ea6f5a"/>
                            <span>我的收藏</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <div class="dropdown" @click="function(){$router.push({ name:'set'})}">
                            <van-icon name="setting" color="#ea6f5a"/>
                            <span>设置</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <div class="dropdown" @click="out">
                            <van-icon name="clear" color="#ea6f5a"/>
                            <span>退出</span>
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
    methods:{
        out(){
            this.logOut();
        }
    }
}
</script>

<style scoped>
.header{
    border-bottom:1px solid #f0f0f0;
    height:58px;
    position:fixed;
    top:0;
    width:100%;
    background-color: #fff;
    z-index: 999;
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
    height: 58px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    position:absolute;
    top:0;
    right:0;
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
    width: 74px;
    height: 58px;
    line-height: 58px;
    font-size: 17px;
    text-align: center;
    display: block;
}
.left_box>ul li a{
    color: #ea6f5a;
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
.logo{
    width:100px;
    height:58px;
    position: absolute;
    top:0;
    left:0;
    background: url('https://cdn2.jianshu.io/assets/web/nav-logo-4c7bbafe27adc892f3046e6978459bac.png') no-repeat;
    background-size: 100px 56px;
}
.dropdown{
    display: flex;
    align-items: center;
}
</style>
