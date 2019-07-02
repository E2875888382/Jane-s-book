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
        loginFlag:false,
        unLoginFlag:true,
    },
    mutations:{
        userStatus(state,user){
            state.currentUser = user.currentUser;
            state.loginFlag = user.loginFlag;
            state.unLoginFlag = user.unLoginFlag;
        },
        
    }
})


var vm=new Vue({
    el:'#app',
    data:{
         
    },
    store,
    render:c => c(App),
    router
})


  