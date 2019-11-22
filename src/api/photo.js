import req from './request.js'

export default{
	praisePhoto(photoId,status){
		return req.get('photoPraise',{photo:photoId,status:status});
	},
	detail(id){
		return req.get("photoDetail",{ photoID:id });
	},
	get(n){
		return req.get('photo',{page:n});
	},
	newPhoto(tags,src,title,time,photo){
		return req.post('addNewPhoto',{tags:tags,src:src,title:title,time:time,photo:photo});
	}
}