import 'bootstrap/dist/css/bootstrap.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import infiniteScroll from 'vue-infinite-scroll';
import './assets/icon/iconfont.css'

import Vue from 'vue'
import App from './app.vue'

import router from './router/index.js'

import store from './store/index.js'

import { Uploader } from 'vant';
Vue.use(Uploader);

Vue.use(ElementUI)
Vue.use(infiniteScroll);

Vue.config.productionTip = false;

new Vue({
	el:'#app',
	store,
	render:c => c(App),
	router
})
