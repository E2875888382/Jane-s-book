export default{
    toggleHAF(state,show){
        state.showHeader = show;
        state.showFooter = show;
    },
    userStatus(state,loginFlag){
        state.loginFlag = loginFlag;
    },
    userIfo(state,{userIfo,friend,photoCol,articleCol,newMsg,hisMsg}){
        state.userIfo = userIfo[0];
        state.friendsList = friend;
        state.photoCollection = photoCol;
        state.streetCollection = articleCol;
    },
    searchResult(state,{article,photo,user,news}){// 获取搜索帖子结果
        state.result.article = article;
        state.result.photo = photo;
        state.result.user = user;
        state.result.news = news;
    },
    searchContent(state,search){// 获取搜索框内容
        state.search = search;
    }
}