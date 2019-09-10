import user from './user.js'

exports.install = function(Vue,options){
    // 查用户信息
    Vue.prototype.userIfo = function(){
        if(localStorage.getItem('token')){
            user.userIfo().then((result)=>{
                this.$store.commit('userStatus',true);
                this.$store.commit('userIfo',result.data);
            })
        }
    }
}