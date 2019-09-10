import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000';

export default{
    get(url,params){
        let user = '';
        if(localStorage.hasOwnProperty('token')){
            user = localStorage.getItem('token');
        }
        return  axios({
                    method:'get',
                    url:url,
                    params:params,
                    headers:{
                        'token':user
                    }
                })
    },
    post(url,data){
        let user = '';
        if(localStorage.hasOwnProperty('token')){
            user = localStorage.getItem('token');
        }
        return  axios({
                    method:'post',
                    url:url,
                    data:data,
                    headers:{
                        'token':user
                    }
                })
    },
    logOut(){
        return this.get('out');
    },
    userIfo(){
        return this.get('user');
    },
    follow(friend,status){
        return this.get('follow',{friend:friend,status:status});
    },
    collect(articleId,status){
        return this.get('collect',{article:articleId,status:status});
    },
    collectPhoto(photoId,status){
        return this.get('photoCollect',{photoID:photoId,status:status});
    },
}