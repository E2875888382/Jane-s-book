exports.install = function(Vue,options){
    Vue.prototype.getPhotoCollection = function(){
        if(this.$store.state.loginFlag){
            this.$http.post('getPhotoCollection',{userID:this.$store.state.userIfo.userID}).then((result)=>{
                if(result.body.code == 200){
                    this.$store.commit('getPhotoCollection',result.body.photoCollection);
                }
            })
        }
    };
    Vue.prototype.getStreetCollection = function(){
        if(this.$store.state.loginFlag){
            this.$http.post('getStreetCollection',{userID:this.$store.state.userIfo.userID}).then((result)=>{
                if(result.body.code == 200){
                    this.$store.commit('getStreetCollection',result.body.streetCollection);
                }
            })
        }
    };
    Vue.prototype.getFriends = function(){
        this.$http.post("getFriends" ,{userID:this.$store.state.userIfo.userID}).then( (result) =>{
            this.$store.commit('getFriends',result.body);
        }) 
    };
    Vue.prototype.getLoginUserIfo = function(){
        this.$http.get('getLoginUserInfo',{ credentials: true }).then( (result) =>{
            if(result.body[0]){
                this.$store.commit('userIfo',result.body[0]);
            }
        })
    };
    Vue.prototype.getFriendsMessage = function(){
        this.$http.post("getFriendsMessage" ,{userID:this.$store.state.userIfo.userID}).then( (result) =>{
            this.$store.commit('getMessage',result.body);
            if(result.body.length>0){
                this.$store.commit('getMessageCount',result.body.length);
            }else{
                this.$store.commit('getMessageCount',0);
            }
        })
    };
    Vue.prototype.getHistoryMessage = function(){
        this.$http.post("getHistoryFriendsMessage" ,{userID:this.$store.state.userIfo.userID}).then( (result) =>{
            this.$store.commit('getHistoryMessage',result.body);
        })
    }
}