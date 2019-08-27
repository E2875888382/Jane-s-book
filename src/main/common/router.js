import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../index/index.vue'
import Login from '../login/login.vue'
import UserPage from '../userPage/userPage.vue'// 用户页面
import News_index from '../news/news_index.vue'// 新闻主页
import News_details from '../news/news_details.vue'// 新闻详细页
import Developer from '../developer/developer_index.vue'// 开发者页面
import Street_details from '../street/street_details.vue'// 步行街详细页
import Street_new from '../street/street_new.vue'// 步行街发表页
import Photo_index from '../photo/photo_index.vue'// 相簿主页
import Photo_details from '../photo/photo_details.vue'// 相簿详细页
import Photo_new from '../photo/photo_new.vue'// 相簿发表页
import Search_result from '../search/search_result.vue'// 搜索结果页

Vue.use(VueRouter)

//创建vue-router对象
var router=new VueRouter({
    routes:[
        { path:'/',component:Index },
        { path:'/login',component:Login },
        { path:'/userPage',component:UserPage },
        { path:'/news',component:News_index },
        { path:'/newsDetails/:id',component:News_details },
        { path:'/developer',component:Developer },
        { path:'/streetDetails/:id',component:Street_details },
        { path:'/street/new',component:Street_new },
        { path:'/photo',component:Photo_index },
        { path:'/photoDetails/:id',component:Photo_details },
        { path:'/photo/new',component:Photo_new },
        { path:'/searchResult',component:Search_result },
    ]
})

export default router