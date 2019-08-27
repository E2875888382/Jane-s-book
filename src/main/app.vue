<template>
<div>
     <top v-if="$store.state.showHeader"></top>
     <transition mode="out-in">
          <router-view></router-view>
     </transition>
     <bottom v-if="$store.state.showFooter"></bottom>
</div>
</template>

<script>
import top from './common/header.vue'
import bottom from './common/footer.vue'
import userPage from './userPage/userPage.vue'
export default{
     components:{
          top,
          bottom,
          userPage,
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
