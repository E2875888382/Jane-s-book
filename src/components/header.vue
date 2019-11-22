<template>
  <div class="header">
    <router-link to="/"><div class="logo"></div></router-link>
    <div class="left_box col-9 m-auto">
      <ul>
        <li><router-link to="/">发现</router-link></li>
        <li><router-link to="/photo">相册</router-link></li>
        <li v-if="$store.state.loginFlag"><router-link to="/follow">关注</router-link></li>
        <li v-if="$store.state.loginFlag">
          <el-badge :value="$store.state.unRead" :hidden="$store.state.unRead == 0" class="item">
            <router-link to="/chat">消息</router-link>
          </el-badge>
        </li>
      </ul>
      <search></search>
    </div>
    <div class="right_box col-2">
      <!-- 登录后状态框 -->
      <div class="new" v-if="$store.state.loginFlag">
        <el-dropdown placement="bottom-start">
          <el-avatar shape="circle" :size="40" :src="$store.state.userIfo.avatar"/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in list" :key="item.title">
              <div class="dropdown" @click="jump(item.handle)">
                <i class="iconfont" v-html="item.icon"/>
                <span>{{item.title}}</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="danger" round icon="el-icon-edit" @click="jump('articleNew')">写文章</el-button>
      </div>
      <!-- 登录按钮 -->
      <div class="login_btn" v-if="!$store.state.loginFlag">
        <el-link :underline="false" @click="jump('login')">登录</el-link>
      </div>
      <!-- 注册按钮  -->
      <div class="new_btn"  v-if="!$store.state.loginFlag">
        <el-link :underline="false" @click="jump('login')">注册</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import search from './search.vue'
import user from '../api/user.js'
export default {
  components:{
    search
  },
  data(){
    return {
      list:[
        {
          title:'我的主页',
          handle:'mypage',
          icon:'&#xe7e9;',
        },
        {
          title:'我的收藏',
          handle:'collect',
          icon:'&#xe670;',
        },
        {
          title:'设置',
          handle:'set',
          icon:'&#xe66f;',
        },
        {
          title:'退出',
          handle:'out',
          icon:'&#xe609;',
        }
      ]
    }
  },
  mounted(){
    this.$store.dispatch('userIfo');
  },
  methods:{
    jump(name){
      if(name == 'out'){
        user.logOut().then(()=>{
          localStorage.clear();
          this.$store.commit('userStatus',false);
          this.$router.push('/');
        })
      }else{
        this.$router.push({name:name});
      }         
    },
  }
}
</script>

<style scoped>
i{
    color:#F56C6C;
}
.header{
    border-bottom:1px solid #f0f0f0;
    height:58px;
    position:fixed;
    top:0;
    width:100%;
    background-color: #fff;
    z-index: 9999;
}
.el-badge{
    vertical-align: top;
}
div>>>.el-badge__content.is-fixed{
    top:15px;
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
    margin:0;
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
.logo{
    width:100px;
    height:58px;
    position: absolute;
    top:0;
    left:0;
    background: url('https://cdn2.jianshu.io/assets/web/nav-logo-4c7bbafe27adc892f3046e6978459bac.png') no-repeat;
    background-size: 100px 56px;
}
.el-dropdown{
    display: flex;
    align-items: center;
}
</style>
