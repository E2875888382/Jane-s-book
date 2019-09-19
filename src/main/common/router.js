import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        { 
            path:'/',
            component:() => import('../index/index.vue') 
        },
        { 
            path:'/login',
            component:() => import('../login/login.vue') 
        },
        { 
            path:'/article/detail/:articleId',
            name:'articleDetail',
            component:() => import('../article/articleDetail.vue')
        },
        { 
            path:'/article/new',
            name:'articleNew',
            component:() => import('../article/articleNew.vue')
        },
        { 
            path:'/follow',
            name:'follow',
            component:() => import('../follow/follow.vue')
        },
        { 
            path:'/collect',
            name:'collect',
            component:() => import('../collect/collect.vue')
        },
        { 
            path:'/set',
            name:'set',
            component:() => import('../set/set.vue'),
            redirect:'/set/baseset',
            children:[
                {
                    path:'baseset',
                    component:() => import('../set/baseSet.vue')
                },
                {
                    path:'userset',
                    component:() => import('../set/userSet.vue')
                },
            ]
        },
        { 
            path:'/search',
            name:'search',
            component:() => import('../search/result.vue'),
            redirect:'/search/article',
            children:[
                {
                    path:'article',
                    component:() => import('../search/article.vue')
                },
                {
                    path:'news',
                    component:() => import('../search/news.vue')
                },
                {
                    path:'user',
                    component:() => import('../search/user.vue')
                },
                {
                    path:'photo',
                    component:() => import('../search/photo.vue')
                },
            ]
        },
        { 
            path:'/newsDetails/:id',
            name:'newsDetails',
            component:() => import('../news/news_details.vue')
        },
        { 
            path:'/photo',
            component:() => import('../photo/photo_index.vue') 
        },
        { 
            path:'/photoDetails/:id',
            name:'photoDetails',
            component:() => import('../photo/photo_details.vue')
        },
        { 
            path:'/photo/new',
            component:() => import('../photo/photo_new.vue')
        },
        { 
            path:'/mypage',
            name:'mypage',
            component:() => import('../mypage/mypage.vue'),
            meta:{ keepAlive:true }
        },
    ]
})
