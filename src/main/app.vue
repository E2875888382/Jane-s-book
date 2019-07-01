<template>
<div>
     <top></top>    
     <component v-bind:is="$store.state.componentName"></component>       
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
 
 
 
</style>

 