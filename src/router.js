//导入vue
import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'

//导入自定义的vue组件
import UserPage from './main/userPage/userPage.vue'
import News from './main/news/news.vue'
import NewsDetails from './main/news/newDetails.vue'
import Comic_menu from './main/comic/comic_menu.vue'
import Comic_index from './main/comic/comic_index.vue'
import Comic_classification from './main/comic/comic_classification.vue'
import Vlog from './main/vlog/vlog_index.vue'
import Developer from './main/developer/developer_index.vue'
import Street_index from './main/street/street_index.vue'
//手动安装vue-router
Vue.use(VueRouter)
//创建vue-router对象
var router=new VueRouter({
    routes:[
        { path:'/',redirect:'/comic/index' },
        { path:'/userPage',component:UserPage },
        { path:'/news',component:News },
        { path:'/newsDetails/:id',component:NewsDetails },
        { path:'/comic',component:Comic_menu,
            children:
            [
                { path:'index',component:Comic_index },
                { path:'classification',component:Comic_classification }
            ]
        },
        { path:'/vlog',component:Vlog },
        { path:'/developer',component:Developer },
        { path:'/street',component:Street_index },
    ]
})

export default router