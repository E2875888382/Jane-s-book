<template>
<div class="body">
     <top></top>
     <transition mode="out-in">
          <router-view></router-view>
     </transition>
     <bottom></bottom>
</div>
</template>

<script>
import top from './common/header.vue'
import bottom from './common/footer.vue'
import userPage from './userPage/userPage.vue'
export default{
     data(){
          return {
               
          }
     },
     components:{
          top,
          bottom,
          userPage,
     },
     methods:{ }

}
</script>

<style scoped>
.v-enter,.v-leave-to{
     opacity: 0;
     transform: translate3d(100px,0,100px);
} 
.v-enter-active,.v-leave-active{
     transition: all 0.2s;
}
.body{
     width: 100%
}
</style>
