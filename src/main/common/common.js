exports.install = function(Vue,options){
    Vue.prototype.get = function(url,params){
        return new Promise((resolve,reject)=>{
            this.$http.get(url,params).then((result)=>{
                resolve(result);
            },(err)=>{
                throw err;
            })
        })
    }
    Vue.prototype.post = function(url,data){
        return new Promise((resolve,reject)=>{
            this.$http.post(url,data).then((result)=>{
                resolve(result);
            },(err)=>{
                throw err;
            }) 
        })
    }
    // 获取收藏的相簿
    Vue.prototype.getPhotoCollection = function(){
        this.post('getPhotoCollection',{userID:this.$store.state.userIfo.userID}).then((result)=>{
            if(result.body.code == 200){
                this.$store.commit('getPhotoCollection',result.body.photoCollection);
            }
        })
    };
    // 获取收藏的帖子
    Vue.prototype.getStreetCollection = function(){
        this.post('getStreetCollection',{userID:this.$store.state.userIfo.userID}).then((result)=>{
            if(result.body.code == 200){
                this.$store.commit('getStreetCollection',result.body.streetCollection);
            }
        })
    };
    // 获取好友列表
    Vue.prototype.getFriends = function(){
        this.post("getFriends" ,{userID:this.$store.state.userIfo.userID}).then( (result) =>{
            this.$store.commit('getFriends',result.body);
        }) 
    };
    // 获取用户信息
    Vue.prototype.getLoginUserIfo = function(){
        this.get('getLoginUserInfo').then( (result) =>{
            if(result.body[0]){
                this.$store.commit('userIfo',result.body[0]);
            }
        })
    };
    // 获取好友信息
    Vue.prototype.getFriendsMessage = function(){
        this.post("getFriendsMessage" ,{userID:this.$store.state.userIfo.userID}).then( (result) =>{
            this.$store.commit('getMessage',result.body);
            if(result.body.length>0){
                this.$store.commit('getMessageCount',result.body.length);
            }else{
                this.$store.commit('getMessageCount',0);
            }
        })
    };
    // 获取已读好友信息
    Vue.prototype.getHistoryMessage = function(){
        this.post("getHistoryFriendsMessage" ,{userID:this.$store.state.userIfo.userID}).then( (result) =>{
            this.$store.commit('getHistoryMessage',result.body);
        })
    };
    // 退出登录
    Vue.prototype.logOut = function(){
        this.get('logOut').then((result) => {
            if(result.body.code == 700){
                this.$store.commit('userStatus',false);
                this.$router.push({ path:'/'});//重定向到首页
            }else{
                console.log(result.body);
            }
        })
    };
}