 
//导入css样式表，同理可以导入less，scss
// import './css/index.css'
//导入bootstrap
import 'bootstrap/dist/css/bootstrap.css'
 
//导入vue
import Vue from 'vue'
import App from './main/app.vue'

//导入路由
import router from './router.js'

//导入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
var vm=new Vue({
    el:'#app',
    data:{
        msg:'hello webpack & vue'
    },
    
    render:c => c(App),

    router
})


console.log('ok'); 