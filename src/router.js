//导入vue
import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'

//导入自定义的vue组件
import Index from './main/index.vue'
import UserPage from './main/userPage.vue'
import News from './main/news.vue'

//手动安装vue-router
Vue.use(VueRouter)
//创建vue-router对象
var router=new VueRouter({
    routes:[
        { path:'/',redirect:'/index' },
        { path:'/index',component:Index },
        { path:'/userPage',component:UserPage },
        { path:'/news',component:News }
    ]
})

export default router