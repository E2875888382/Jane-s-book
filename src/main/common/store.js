import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        showHeader:true,
        showFooter:true,
        loginFlag:false,//登录状态标记
        messageCount:0,//好友消息数目
        userIfo:{},//用户信息
        message:[],//好友信息
        historyMessage:[],//已读消息
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
        closeHeader(state,show){
            state.showHeader = show;
        },
        closeFooter(state,show){
            state.showFooter = show;
        },
        userStatus(state,loginFlag){// 获取登录状态
            state.loginFlag = loginFlag;
        },
        userIfo(state,userIfo){// 获取用户信息
            state.userIfo = userIfo;
        },
        getMessageCount(state,count){// 获取未读消息数量
            state.messageCount = count;
        },
        getMessage(state,message){// 获取消息列表
            state.message = message;
        },
        getHistoryMessage(state,message){// 获取已读消息列表
            state.historyMessage = message;
        },
        getFriends(state,friends){// 获取好友列表
            state.friendsList = friends;
        },
        getPhotoCollection(state,photoCollection){// 获取收藏相簿列表
            state.photoCollection = photoCollection;
        },
        getStreetCollection(state,streetCollection){// 获取收藏的帖子列表
            state.streetCollection = streetCollection;
        },
        searchStreet(state,street){// 获取搜索帖子结果
            state.searchStreet = street;
        },
        searchPhoto(state,photo){// 获取搜索相簿结果
            state.searchPhoto = photo;
        },
        searchUser(state,user){// 获取搜索用户结果
            state.searchUser = user;
        },
        searchNews(state,news){// 获取搜索新闻结果
            state.searchNews = news;
        },
        searchContent(state,search){// 获取搜索框内容
            state.search = search;
        }
    }
})