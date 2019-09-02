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
            let user = '';
            if(localStorage.hasOwnProperty('token')){
                user = localStorage.getItem('token');
            }
            axios({
                method:'get',
                url:url,
                params:params,
                headers:{
                    'token':user
                }
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
            let user = '';
            if(localStorage.hasOwnProperty('token')){
                user = localStorage.getItem('token');
            }
            axios({
                method:'post',
                url:url,
                data:data,
                headers:{
                    'token':user
                }
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
                this.get('user').then((result)=>{
                    this.$store.commit('userStatus',true);
                    this.$store.commit('userIfo',result.data);
                    resolve();
                })
            }else{
                console.log('没有登录信息')
            }
        })
    }
    // 退出登录
    Vue.prototype.logOut = function(){
        this.get('out').then(()=>{
            localStorage.clear();
            this.$store.commit('userStatus',false);
            this.$router.push('/');
        })
    }
    // 关注
    Vue.prototype.follow = function(friend){
        this.get('follow',{friend:friend}).then(()=>{
            this.userIfo();
        })
    }
    // 取消关注
    Vue.prototype.unfollow = function(friend){
        this.get('unfollow',{friend:friend}).then(()=>{
            this.userIfo();
        })
    }
    // 收藏
    Vue.prototype.collect = function(articleId){
        this.get('collect',{article:articleId}).then(()=>{
            this.userIfo();
        })
    }
    // 取消收藏
    Vue.prototype.uncollect = function(articleId){
        this.get('uncollect',{article:articleId}).then(()=>{
            this.userIfo();
        })
    }
    // 收藏相册
    Vue.prototype.collectPhoto = function(photoId){
        this.get('photoCollect',{photoID:photoId}).then(()=>{
            this.userIfo();
        })
    }
    // 取消收藏相册
    Vue.prototype.unCollectPhoto = function(photoId){
        this.get('unPhotoCollect',{photoID:photoId}).then(()=>{
            this.userIfo();
        })
    }
}