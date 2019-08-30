import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000';

exports.install = function(Vue,options){
    // jsonp请求
    Vue.prototype.jsp = function(method,data){
        // baseUrl就是服务器地址
        const baseUrl = 'http://localhost:8000/';
        let url = `${baseUrl}${method}?`;
        // jsonp请求参数和get方法类似，都是params的方式拼接
        for(let item in data){
            url += `&${item}=${data[item]}`;
        }
        return this.$jsonp(url);
    };
    // get请求
    Vue.prototype.get = function(url,params){
        return new Promise((resolve,reject)=>{
            axios({
                method:'get',
                url:url,
                params:params,
                withCredentials: true,
            }).then((result)=>{
                resolve(result);
            },(err)=>{
                throw err;
            })
        })
    };
    // post请求
    Vue.prototype.post = function(url,data){
        return new Promise((resolve,reject)=>{
            axios({
                method:'post',
                url:url,
                data:data,
                withCredentials: true,
            }).then((result)=>{
                resolve(result);
            },(err)=>{
                throw err;
            })
        })
    }
    // 查用户信息
    Vue.prototype.userIfo = function(){
        return new Promise((resolve)=>{
            if(localStorage.getItem('token')){
                let user = localStorage.getItem('token')
                this.jsp('userIfo',{token:user}).then((result)=>{
                    this.$store.commit('userStatus',true);
                    this.$store.commit('userIfo',result.userIfo[0]);
                    this.$store.commit('getFriends',result.friend);
                    this.$store.commit('getPhotoCollection',result.photoCol);
                    this.$store.commit('getStreetCollection',result.articleCol);
                    this.$store.commit('getMessage',result.newMsg);
                    this.$store.commit('getMessageCount',result.newMsg.length);
                    this.$store.commit('getHistoryMessage',result.hisMsg);
                    resolve();
                })
            }else{
                console.log('没有登录信息')
            }
        })
    }
    // 退出登录
    Vue.prototype.logOut = function(){
        let user = localStorage.getItem('token');
        this.jsp('out',{token:user}).then(()=>{
            localStorage.clear();
            this.$store.commit('userStatus',false);
            this.$router.push('/');
        })
    }
    // 关注
    Vue.prototype.follow = function(friend){
        let user = localStorage.getItem('token');
        this.jsp('follow',{token:user,friend:friend}).then(()=>{
            this.userIfo();
        })
    }
    // 取消关注
    Vue.prototype.unfollow = function(friend){
        let user = localStorage.getItem('token');
        this.jsp('unfollow',{token:user,friend:friend}).then(()=>{
            this.userIfo();
        })
    }
    // 收藏
    Vue.prototype.collect = function(articleId){
        let user = localStorage.getItem('token');
        this.jsp('collect',{token:user,article:articleId}).then(()=>{
            this.userIfo();
        })
    }
    // 取消收藏
    Vue.prototype.uncollect = function(articleId){
        let user = localStorage.getItem('token');
        this.jsp('uncollect',{token:user,article:articleId}).then(()=>{
            this.userIfo();
        })
    }
}