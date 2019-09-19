import 'bootstrap/dist/css/bootstrap.css'

import Vant from 'vant';
import 'vant/lib/index.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import infiniteScroll from 'vue-infinite-scroll';

import Vue from 'vue'
import App from './main/app.vue'

import router from './main/common/router.js'

import store from './main/common/store.js'

import Common from './main/common/common.js';

Vue.use(ElementUI)
Vue.use(infiniteScroll);
Vue.use(Common);
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
    el:'#app',
    store,
    render:c => c(App),
    router
})
