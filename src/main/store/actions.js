import user from '../common/user.js'

export default{
    userIfo(context){
        if(localStorage.getItem('token')){
            user.userIfo().then((result)=>{
                context.commit('userStatus',true);
                context.commit('userIfo',result.data);
            })
        }
    }
}