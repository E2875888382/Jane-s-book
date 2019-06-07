<template>
<div>   
     <topNav></topNav>
     <carousal></carousal> 
     <div class="content">
          <videoBox></videoBox>     
          <rankingList></rankingList>
          <video-box-second></video-box-second>     
          <ranking-list-second></ranking-list-second>
          <recommend></recommend>
     </div>		
</div>
 
</template>

<script>

import carousal from './carousal.vue'
import topNav from './nav.vue' 
import rankingList from './rankingList.vue'
import videoBox from './videoBox.vue'
import rankingListSecond from './rankingListSecond.vue'
import videoBoxSecond from './videoBoxSecond.vue'
import recommend from './recommend.vue'

export default{
     data(){
          return {
               
               activeName: '1',
           
          }
     },
     created() {
         
         this.show();
     },
     components:{
      
          carousal,
          topNav,
          rankingList,
          rankingListSecond,
          videoBox,
          videoBoxSecond,
          recommend,
         
     },
     methods:{
          show(){
              
          },
       
     }

}
</script>

<style scoped>
 
.content{
     width:1000px;
     height:1100px;
     margin:0 auto;
}
 
</style>

 