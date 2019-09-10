import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000';
import user from './user.js'

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
                user.userIfo().then((result)=>{
                    this.$store.commit('userStatus',true);
                    this.$store.commit('userIfo',result.data);
                    resolve();
                })
            }
        })
    }
}