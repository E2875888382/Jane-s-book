//导入bootstrap
import 'bootstrap/dist/css/bootstrap.css'

//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

// 导入滚动条插件，用于无限滚动加载数据
import infiniteScroll from 'vue-infinite-scroll';

//导入vue
import Vue from 'vue'
import App from './main/app.vue'


//导入路由
import router from './main/common/router.js'

//导入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入全局函数

import store from './main/common/store.js'
import VueJsonp from 'vue-jsonp'
import Common from './main/common/common.js';
Vue.use(VueJsonp)
Vue.use(ElementUI)
Vue.use(infiniteScroll);
Vue.use(Common);
Vue.use(Vant);

var vm=new Vue({
    el:'#app',
    store,
    render:c => c(App),
    router
})
