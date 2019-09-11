// bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// vant
import Vant from 'vant';
import 'vant/lib/index.css';

// element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 无限滚动插件
import infiniteScroll from 'vue-infinite-scroll';

// vue
import Vue from 'vue'
import App from './main/app.vue'

// router
import router from './main/common/router.js'

// vuex
import store from './main/common/store.js'

import Common from './main/common/common.js';

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
