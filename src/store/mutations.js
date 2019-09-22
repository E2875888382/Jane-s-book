export default{
    toggleHAF(state,show){
        state.showHeader = show;
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
}