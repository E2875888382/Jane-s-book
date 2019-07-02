<template>
<div>
     <top></top>
     <transition mode="out-in">    
          <router-view></router-view>
     </transition>            
     <bottom></bottom>		 
</div>
</template>

<script>
import top from './header.vue'
import index from './index.vue'
import bottom from './footer.vue'
import userPage from './userPage.vue'
export default{
     data(){
          return {              
               activeName: '1',
                
          }
     },
     created() {        
      
     },
     components:{
          top,
          index,     
          bottom,
          userPage,
     },
     methods:{
 
     }

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
 
</style>

 