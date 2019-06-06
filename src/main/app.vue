<template>
<div>
     <top></top>
     <topNav></topNav>
     <carousal></carousal> 
     <div class="content">
          <videoBox></videoBox>     
          <rankingList></rankingList>
          <video-box-second></video-box-second>     
          <ranking-list-second></ranking-list-second>
          <recommend></recommend>
     </div>
     <bottom></bottom>		
</div>
 
</template>

<script>
import top from './header.vue'
import carousal from './carousal.vue'
import topNav from './nav.vue' 
import rankingList from './rankingList.vue'
import videoBox from './videoBox.vue'
import rankingListSecond from './rankingListSecond.vue'
import videoBoxSecond from './videoBoxSecond.vue'
import recommend from './recommend.vue'
import bottom from './footer.vue'
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
          top,
          carousal,
          topNav,
          rankingList,
          rankingListSecond,
          videoBox,
          videoBoxSecond,
          recommend,
          bottom,
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
     height:1300px;
     margin:0 auto;
}
 
</style>

 