import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000';

exports.install = function(Vue,options){
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
    // 关注/取消关注
    Vue.prototype.follow = function(friend,status){
        this.get('follow',{friend:friend,status:status}).then(()=>{
            this.userIfo();
        })
    }
    // 文章收藏/取消收藏
    Vue.prototype.collect = function(articleId,status){
        this.get('collect',{article:articleId,status:status}).then(()=>{
            this.userIfo();
        })
    }
    // 相册收藏/取消收藏
    Vue.prototype.collectPhoto = function(photoId,status){
        this.get('photoCollect',{photoID:photoId,status:status}).then(()=>{
            this.userIfo();
        })
    }
    // 文章点赞/取消点赞
    Vue.prototype.praise = function(articleId,status){
        this.get('praise',{article:articleId,status:status}).then(()=>{

        })
    }
    // 相册点赞/取消点赞
    Vue.prototype.praisePhoto = function(photoId,status){
        this.get('photoPraise',{photo:photoId,status:status}).then(()=>{
            
        })
    }
}