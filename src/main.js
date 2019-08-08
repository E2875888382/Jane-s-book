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

// 导入滚动条插件，用于无限滚动加载数据
import infiniteScroll from 'vue-infinite-scroll';

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
Vue.use(infiniteScroll);

var store = new Vuex.Store({
    state:{
        currentUser:'',//当前用户
        loginFlag:false,//登录状态标记
        messageCount:'10',//好友消息数目
        userIfo:{},//用户信息
        message:[],//好友信息
        friendsList:[],//好友列表
        photoCollection:[],//收藏相簿
        streetCollection:[],//收藏帖子
        searchStreet:[],//搜索的帖子
        searchPhoto:[],//搜索的相簿
        searchUser:[],//搜索的用户
        searchNews:[],//搜素的新闻
        search:''//搜索的内容，用于格式化搜索结果
    },
    mutations:{
        userStatus(state,user){
            state.currentUser = user.currentUser;
            state.loginFlag = user.loginFlag;
        },
        userIfo(state,userIfo){
            state.userIfo = userIfo;
        },
        getMessageCount(state,count){
            state.messageCount = count;
        },
        getMessage(state,message){
            state.message = message;
        },
        getFriends(state,friends){
            state.friendsList = friends;
        },
        getPhotoCollection(state,photoCollection){
            state.photoCollection = photoCollection;
        },
        getStreetCollection(state,streetCollection){
            state.streetCollection = streetCollection;
        },
        searchStreet(state,street){
            state.searchStreet = street;
        },
        searchPhoto(state,photo){
            state.searchPhoto = photo;
        },
        searchUser(state,user){
            state.searchUser = user;
        },
        searchNews(state,news){
            state.searchNews = news;
        },
        searchContent(state,search){
            state.search = search;
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
