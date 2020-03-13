import req from './request.js'

export default{
    login(form){
        return req.post('login',form);
    },
    register(form){
        return req.post('register',form);
    },
    logOut(){
        return req.get('out');
    },
    userIfo(){
        return req.get('user');
    },
    follow(friend,status){
        return req.get('follow',{friend:friend,status:status});
    },
    followerWork(id){
        return req.get('followerWork',{userID:id});
    },
    collect(articleId,status){
        return req.get('collect',{article:articleId,status:status});
    },
    collectPhoto(photoId,status){
        return req.get('photoCollect',{photoID:photoId,status:status});
    },
    avatar(img){
        return req.post("avatar",{avatar:img});
    },
    update(ifo){
        return req.post('updateUserInfo',{ifo:ifo});
    }
}