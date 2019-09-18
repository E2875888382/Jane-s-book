import req from './request.js'

export default{
    praise(articleId,status){
        return req.get('praise',{article:articleId,status:status});
    },
    replyPraise(streetReplyID,status){
        return req.get('replyPraise',{streetReplyID:streetReplyID,status:status});
    },
    detail(id){
        return req.get('articleDetail',{articleId:id});
    },
    get(n){
        return req.get('article',{page:n});
    },
    comment(article,content){
        return req.post('comment',{article:article,content:content});
    },
    newArticle(article){
        return req.post('newArticle',{ new: article});
    }
}