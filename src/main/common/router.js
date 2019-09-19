import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router =  new VueRouter({
    mode:'history',
    routes:[
        { 
            path:'/',
            meta:{
                title:`Jane's book - 创作你的创作`,
                keepAlive:true,
            },
            component:() => import('../index/index.vue') 
        },
        { 
            path:'/login',
            meta:{
                title:`登录 - Jane's book`,
                keepAlive:true,
            },
            component:() => import('../login/login.vue') 
        },
        { 
            path:'/article/detail/:articleId',
            name:'articleDetail',
            meta:{
                title:`Jane's book`,
                keepAlive:false,
            },
            component:() => import('../article/articleDetail.vue')
        },
        { 
            path:'/article/new',
            name:'articleNew',
            meta:{
                title:`Jane's book - 写文章`,
                keepAlive:true,
            },
            component:() => import('../article/articleNew.vue')
        },
        { 
            path:'/follow',
            name:'follow',
            meta:{
                title:`关注 - Jane's book`,
                keepAlive:false,
            },
            component:() => import('../follow/follow.vue')
        },
        { 
            path:'/collect',
            name:'collect',
            meta:{
                title:`收藏 - Jane's book`,
                keepAlive:false,
            },
            component:() => import('../collect/collect.vue')
        },
        { 
            path:'/set',
            name:'set',
            meta:{
                title:`设置 - Jane's book`,
                keepAlive:false,
            },
            component:() => import('../set/set.vue'),
            redirect:'/set/baseset',
            children:[
                {
                    path:'baseset',
                    meta:{
                        title:`基础设置 - Jane's book`,
                        keepAlive:false,
                    },
                    component:() => import('../set/baseSet.vue')
                },
                {
                    path:'userset',
                    meta:{
                        title:`用户设置 - Jane's book`,
                        keepAlive:true,
                    },
                    component:() => import('../set/userSet.vue')
                },
            ]
        },
        { 
            path:'/search',
            name:'search',
            meta:{
                title:`搜索 - Jane's book`,
                keepAlive:true,
            },
            component:() => import('../search/result.vue'),
            redirect:'/search/article',
            children:[
                {
                    path:'article',
                    meta:{
                        title:`文章搜索 - Jane's book`,
                        keepAlive:true,
                    },
                    component:() => import('../search/article.vue')
                },
                {
                    path:'news',
                    meta:{
                        title:`新闻搜索 - Jane's book`,
                        keepAlive:true,
                    },
                    component:() => import('../search/news.vue')
                },
                {
                    path:'user',
                    meta:{
                        title:`用户搜索 - Jane's book`,
                        keepAlive:true,
                    },
                    component:() => import('../search/user.vue')
                },
                {
                    path:'photo',
                    meta:{
                        title:`相册搜索 - Jane's book`,
                        keepAlive:true,
                    },
                    component:() => import('../search/photo.vue')
                },
            ]
        },
        { 
            path:'/newsDetails/:id',
            name:'newsDetails',
            meta:{
                title:`新闻 - Jane's book`,
                keepAlive:true,
            },
            component:() => import('../news/news_details.vue')
        },
        { 
            path:'/photo',
            meta:{
                title:`相册 - Jane's book`,
                keepAlive:true,
            },
            component:() => import('../photo/photo_index.vue') 
        },
        { 
            path:'/photoDetails/:id',
            name:'photoDetails',
            meta:{
                title:`相册 - Jane's book`,
                keepAlive:false,
            },
            component:() => import('../photo/photo_details.vue')
        },
        { 
            path:'/photo/new',
            meta:{
                title:`相册 - Jane's book`,
                keepAlive:true,
            },
            component:() => import('../photo/photo_new.vue')
        },
        { 
            path:'/mypage',
            name:'mypage',
            meta:{
                title:`我的主页 - Jane's book`,
                keepAlive:true,
            },
            component:() => import('../mypage/mypage.vue'),
        },
    ]
})

router.beforeEach((to,from,next) => {
    document.title = to.meta.title;
    next()
})

export default router