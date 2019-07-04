<template>
<div>
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

import carousal from '../main/index/carousal.vue'
import rankingList from '../main/index/rankingList.vue'
import videoBox from '../main/index/videoBox.vue'
import rankingListSecond from '../main/index/rankingListSecond.vue'
import videoBoxSecond from '../main/index/videoBoxSecond.vue'
import recommend from '../main/index/recommend.vue'

export default{
     data(){
          return {
               activeName: '1',
          }
     },
     created() {
     },
     components:{
          carousal,
          rankingList,
          rankingListSecond,
          videoBox,
          videoBoxSecond,
          recommend,
     },
     methods:{ }

}
</script>

<style scoped>
.content{
     width:1000px;
     height:1100px;
     margin:0 auto;
}
</style>
