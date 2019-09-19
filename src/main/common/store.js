import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        showHeader:true,
        showFooter:true,
        loginFlag:false,//登录状态标记
        messageCount:0,//消息数目
        userIfo:{},
        message:[],//未读消息
        historyMessage:[],//已读消息
        friendsList:[],//好友列表
        photoCollection:[],//收藏相簿
        streetCollection:[],//收藏帖子
        result:{
            article:[],
            photo:[],
            user:[],
            news:[],
        },
        search:''//搜索的内容
    },
    mutations:{
        closeHeader(state,show){
            state.showHeader = show;
        },
        closeFooter(state,show){
            state.showFooter = show;
        },
        userStatus(state,loginFlag){
            state.loginFlag = loginFlag;
        },
        userIfo(state,data){
            state.userIfo = data.userIfo[0];
            state.friendsList = data.friend;
            state.photoCollection = data.photoCol;
            state.streetCollection = data.articleCol;
            state.message = data.newMsg;
            state.historyMessage = data.hisMsg;
            state.messageCount = data.newMsg.length;
        },
        searchResult(state,data){// 获取搜索帖子结果
            state.result.article = data.article;
            state.result.photo = data.photo;
            state.result.user = data.user;
            state.result.news = data.news;
        },
        searchContent(state,search){// 获取搜索框内容
            state.search = search;
        }
    },
    actions:{
        userIfo(context){
            if(localStorage.getItem('token')){
                user.userIfo().then((result)=>{
                    context.commit('userStatus',true);
                    context.commit('userIfo',result.data);
                })
            }
        }
    }
})