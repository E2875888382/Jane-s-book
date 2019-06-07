<template>
<div>
     <top  @childFn="parentFn"></top>
    
     <component v-bind:is="componentName"></component>       
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
               componentName:'index'
          }
     },
     created() {
         
         this.show();
     },
     components:{
          top,
          index,     
          bottom,
          userPage,
     },
     methods:{
          show(){
              
          },
          parentFn(payload) {
               this.componentName = payload;
          }
     }

}
</script>

<style scoped>
 
 
 
</style>

 