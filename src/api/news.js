import req from './request.js'

export default{
    detail(id){
        return req.get('newsDetail',{newId:id});
    },
    getNews(){
        return req.get('news');
    }
}