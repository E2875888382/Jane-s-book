//导入vue
import Vue from 'vue'

//导入vue-router
import VueRouter from 'vue-router'

//导入自定义的vue组件
import UserPage from './main/userPage/userPage.vue'// 用户页面
import News_index from './main/news/news_index.vue'// 新闻主页
import News_details from './main/news/news_details.vue'// 新闻详细页
import Developer from './main/developer/developer_index.vue'// 开发者页面
import Street_index from './main/street/street_index.vue'// 步行街主页
import Street_details from './main/street/street_details.vue'// 步行街详细页
import Street_new from './main/street/street_new.vue'// 步行街发表页
import Photo_index from './main/photo/photo_index.vue'// 相簿主页
import Photo_details from './main/photo/photo_details.vue'// 相簿详细页
import Photo_new from './main/photo/photo_new.vue'// 相簿发表页
import Search_result from './main/common/search_result.vue'// 搜索结果页

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
        { path:'/photo/new',component:Photo_new },
        { path:'/searchResult',component:Search_result },
    ]
})

export default router