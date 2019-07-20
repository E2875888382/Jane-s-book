//导入vue
import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'

//导入自定义的vue组件
import Index from './main/index.vue'
import UserPage from './main/userPage.vue'
import News from './main/news.vue'
import NewsDetails from './main/news/newDetails.vue'
import Comic_menu from './main/comic/comic_menu.vue'
import Comic_index from './main/comic/comic_index.vue'
import Comic_ranking from './main/comic/comic_ranking.vue'
import Comic_classification from './main/comic/comic_classification.vue'

//手动安装vue-router
Vue.use(VueRouter)
//创建vue-router对象
var router=new VueRouter({
    routes:[
        { path:'/',redirect:'/index' },
        { path:'/index',component:Index },
        { path:'/userPage',component:UserPage },
        { path:'/news',component:News },
        { path:'/newsDetails/:id',component:NewsDetails },
        { path:'/comic',component:Comic_menu,
            children:
            [
                { path:'ranking',component:Comic_ranking },
                { path:'index',component:Comic_index },
                { path:'classification',component:Comic_classification }
            ]
        },
    ]
})

export default router