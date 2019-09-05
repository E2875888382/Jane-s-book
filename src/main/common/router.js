import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../index/index.vue'
import Login from '../login/login.vue'
import ArticleDetail from '../article/articleDetail.vue'
import ArticleNew from '../article/articleNew.vue'
import Follow from '../follow/follow.vue'
import Collect from '../collect/collect.vue'

import Setting from '../set/set.vue'
import baseset from '../set/baseSet.vue'
import userset from '../set/userSet.vue'

import Search from '../search/result.vue'
import searcharticle from '../search/article.vue'
import searchnews from '../search/news.vue'
import searchphoto from '../search/photo.vue'
import searchuser from '../search/user.vue'

import News_details from '../news/news_details.vue'// 新闻详细页
import Photo_index from '../photo/photo_index.vue'// 相簿主页
import Photo_details from '../photo/photo_details.vue'// 相簿详细页
import Photo_new from '../photo/photo_new.vue'// 相簿发表页


Vue.use(VueRouter)

//创建vue-router对象
var router=new VueRouter({
    routes:[
        { path:'/',component:Index },
        { path:'/login',component:Login },
        { path:'/article/detail/:articleId',name:'articleDetail',component:ArticleDetail },
        { path:'/article/new',name:'articleNew',component:ArticleNew },
        { path:'/follow',name:'follow',component:Follow },
        { path:'/collect',name:'collect',component:Collect },
        { path:'/set',name:'set',component:Setting,redirect:'/set/baseset',
            children:[
                {
                    path:'baseset',
                    component:baseset
                },
                {
                    path:'userset',
                    component:userset
                },
            ]
        },
        { path:'/search',name:'search',component:Search,redirect:'/search/article',
            children:[
                {
                    path:'article',
                    component:searcharticle
                },
                {
                    path:'news',
                    component:searchnews
                },
                {
                    path:'user',
                    component:searchuser
                },
                {
                    path:'photo',
                    component:searchphoto
                },
            ]
        },
        { path:'/newsDetails/:id',name:'newsDetails',component:News_details },
        { path:'/photo',component:Photo_index },
        { path:'/photoDetails/:id',name:'photoDetails',component:Photo_details },
        { path:'/photo/new',component:Photo_new },

    ]
})

export default router