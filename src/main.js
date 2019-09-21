import 'bootstrap/dist/css/bootstrap.css'

import Vant from 'vant';
import 'vant/lib/index.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import infiniteScroll from 'vue-infinite-scroll';

import Vue from 'vue'
import App from './app.vue'

import router from './router/index.js'

import store from './store/index.js'

Vue.use(ElementUI)
Vue.use(infiniteScroll);
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
    el:'#app',
    store,
    render:c => c(App),
    router
})
