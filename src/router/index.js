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
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/index.vue') 
        },
        { 
            path:'/login',
            name:'login',
            meta:{
                title:`登录 - Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/login.vue') 
        },
        { 
            path:'/article/detail/:articleId',
            name:'articleDetail',
            meta:{
                title:`Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/articleDetail.vue')
        },
        { 
            path:'/article/new',
            name:'articleNew',
            meta:{
                title:`Jane's book - 写文章`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/articleNew.vue')
        },
        { 
            path:'/follow',
            name:'follow',
            meta:{
                title:`关注 - Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:false
            },
            component:() => import('../views/follow.vue')
        },
        { 
            path:'/collect',
            name:'collect',
            meta:{
                title:`收藏 - Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/collect.vue')
        },
        {
            path:'/chat',
            name:'chat',
            meta:{
                title:`聊天 - Jane's book`,
                keepAlive:false,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/chat.vue')
        },
        { 
            path:'/set',
            name:'set',
            meta:{
                title:`设置 - Jane's book`,
                keepAlive:false,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/set.vue'),
            redirect:'/set/baseset',
            children:[
                {
                    path:'baseset',
                    meta:{
                        title:`基础设置 - Jane's book`,
                        keepAlive:false,
                        needHeader:true,
                        needFooter:true
                    },
                    component:() => import('../views/baseSet.vue')
                },
                {
                    path:'userset',
                    meta:{
                        title:`用户设置 - Jane's book`,
                        keepAlive:true,
                        needHeader:true,
                        needFooter:true
                    },
                    component:() => import('../views/userSet.vue')
                },
            ]
        },
        { 
            path:'/search',
            name:'search',
            meta:{
                title:`搜索 - Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/searchResult.vue'),
            redirect:'/search/article',
            children:[
                {
                    path:'article',
                    meta:{
                        title:`文章搜索 - Jane's book`,
                        keepAlive:true,
                        needHeader:true,
                        needFooter:true
                    },
                    component:() => import('../components/search/searchArticle.vue')
                },
                {
                    path:'news',
                    meta:{
                        title:`新闻搜索 - Jane's book`,
                        keepAlive:true,
                        needHeader:true,
                        needFooter:true
                    },
                    component:() => import('../components/search/searchNews.vue')
                },
                {
                    path:'user',
                    meta:{
                        title:`用户搜索 - Jane's book`,
                        keepAlive:true,
                        needHeader:true,
                        needFooter:true
                    },
                    component:() => import('../components/search/searchUser.vue')
                },
                {
                    path:'photo',
                    meta:{
                        title:`相册搜索 - Jane's book`,
                        keepAlive:true,
                        needHeader:true,
                        needFooter:true
                    },
                    component:() => import('../components/search/searchPhoto.vue')
                },
            ]
        },
        { 
            path:'/newsDetails/:id',
            name:'newsDetails',
            meta:{
                title:`新闻 - Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/newsDetails.vue')
        },
        { 
            path:'/photo',
            meta:{
                title:`相册 - Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/photoIndex.vue') 
        },
        { 
            path:'/photoDetails/:id',
            name:'photoDetails',
            meta:{
                title:`相册 - Jane's book`,
                keepAlive:false,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/photoDetails.vue')
        },
        { 
            path:'/photo/new',
            meta:{
                title:`相册 - Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/photoNew.vue')
        },
        { 
            path:'/mypage',
            name:'mypage',
            meta:{
                title:`我的主页 - Jane's book`,
                keepAlive:true,
                needHeader:true,
                needFooter:true
            },
            component:() => import('../views/mypage.vue'),
        },
    ]
})

router.beforeEach((to,from,next) => {
    document.title = to.meta.title;
    next()
})
router.afterEach((to, from) => {
    window.scrollTo(0,0);
})

export default router