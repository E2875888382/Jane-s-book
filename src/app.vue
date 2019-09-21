<template>
<div>
     <top v-if="$store.state.showHeader"></top>

     <transition mode="out-in">
          <keep-alive>
               <router-view v-if="$route.meta.keepAlive"/>
          </keep-alive>
     </transition>

     <transition mode="out-in">
          <keep-alive>
               <router-view v-if="!$route.meta.keepAlive"/>
          </keep-alive>  
     </transition> 
     
     <bottom v-if="$store.state.showFooter"></bottom>
</div>
</template>

<script>
import top from './components/header.vue'
import bottom from './components/footer.vue'

export default{
     components:{
          top,
          bottom,
     },
}
</script>

<style>
.v-enter,.v-leave-to{
     opacity: 0;
     transform: translate3d(100px,0,100px);
} 
.v-enter-active,.v-leave-active{
     transition: all 0.2s;
}
.el-popover--plain {
     padding: 10px !important;
     min-width:50px !important;
     margin-bottom:0;
}
</style>
