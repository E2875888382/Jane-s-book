//导入bootstrap
import 'bootstrap/dist/css/bootstrap.css'
//导入vue-resource
import VueResource from 'vue-resource'
//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
//配置vant，vue-resource
Vue.use(Vant);
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:8000';

//导入vue
import Vue from 'vue'
import App from './main/app.vue'
//导入vuex
import Vuex from 'vuex'
//导入路由
import router from './router.js'
//导入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//配置elementUI，vuex
Vue.use(ElementUI)
Vue.use(Vuex);

var store = new Vuex.Store({
    state:{
        currentUser:'',
        loginFlag:false,//登录状态标记
        unLoginFlag:true,//登录状态标记
        messageCount:'10',//消息数目
        userIfo:{
            avatar:'',//头像
            birth:'',//出生日期
            email:'',//email
            gender:'',//性别
            userId:'', //用户ID
            currentUser:'',//当前用户
            telephone:'',//绑定手机号
            level:0,//用户等级
            sign:'',//个性签名
            nickName:'',//昵称
        }
    },
    mutations:{
        userStatus(state,user){
            state.currentUser = user.currentUser;
            state.loginFlag = user.loginFlag;
            state.unLoginFlag = user.unLoginFlag;
        },
        userIfo(state,userIfo){
            state.userIfo = userIfo;
        },
        getMessageCount(state,count){
            state.messageCount = count;
        }
    }
})

var vm=new Vue({
    el:'#app',
    data:{ },
    store,
    render:c => c(App),
    router
})
