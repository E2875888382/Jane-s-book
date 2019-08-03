//导入vue
import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'

//导入自定义的vue组件
import UserPage from './main/userPage/userPage.vue'
import News_index from './main/news/news_index.vue'
import News_details from './main/news/news_details.vue'
import Developer from './main/developer/developer_index.vue'
import Street_index from './main/street/street_index.vue'
import Street_details from './main/street/street_details.vue'
import Street_new from './main/street/street_new.vue'
import Photo_index from './main/photo/photo_index.vue'
import Photo_details from './main/photo/photo_details.vue'

//手动安装vue-router
Vue.use(VueRouter)
//创建vue-router对象
var router=new VueRouter({
    routes:[
        { path:'/',redirect:'/street' },
        { path:'/userPage',component:UserPage },
        { path:'/news',component:News_index },
        { path:'/newsDetails/:id',component:News_details },
        { path:'/developer',component:Developer },
        { path:'/street',component:Street_index },
        { path:'/streetDetails/:id',component:Street_details },
        { path:'/street/new',component:Street_new },
        { path:'/photo',component:Photo_index },
        { path:'/photoDetails/:id',component:Photo_details },
    ]
})

export default router