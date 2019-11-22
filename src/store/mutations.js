export default{
    initSocket(state,newSocket){
        state.socket = newSocket;
    },
    addMsg(state,newMsg){
        state.totalMsg.push(newMsg);
    },
    newMsg(state){
        state.unRead++;
    },
    allRead(state){
        state.unRead = 0;
    },
    userStatus(state,loginFlag){
        state.loginFlag = loginFlag;
    },
    userIfo(state,{userIfo,friend,photoCol,articleCol}){
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