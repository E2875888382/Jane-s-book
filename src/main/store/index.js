import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);

const state = {
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
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
})