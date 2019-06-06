<template>
    <div class="video_box">
        <div class="page-header">            
             <h2>
                 <i class="icon"></i>
                 <small>娱乐</small>
            </h2> 
        </div>
         <el-divider></el-divider>
        <div class="row">
            <div class="col-sm-4 col-md-3 video_item" v-for="item in entertainmentVideo" :key="item.id">
                <div class="thumbnail">
                    <a :href="item.link">
                        <img :src="item.picture">
                    </a>
                    <div class="caption">
                        <a :href="item.link" :title="item.title">
                            {{ item.title }}
                        </a>                 
                    </div>
                </div>
            </div>
             
            
        </div>
         
    </div>
</template>

<script>
export default {
    data(){
        return{
            entertainmentVideo:[]
        }
    },
    created(){
        this.getEntertainmentVideo()
    },
    methods:{
           getEntertainmentVideo(){
               this.$http.get('http://localhost:8000/getEntertainmentVideo').then(result => {
                    
                    this.entertainmentVideo=result.body;
           
               })
          }
    }
}
</script>

<style scoped>
.video_box{
    width: 740px;
    height:420px;
    float: left;
}
.video_item{
    padding:0 7px;
}
img{
    width:160px;
    height:100px;
    border-radius: 4px;
}
.caption{
    display: inline-block;
    height: 40px;
    width:138px;
    line-height: 20px;
    overflow: hidden;
    color: #222;
    font-size: 12px;
    word-wrap: break-word;
    word-break: break-all;
    text-decoration: none;
    cursor: pointer;
    overflow: hidden;
}
.icon{
    width: 40px;
    height: 40px;
    margin-right: 10px;  
    float: left; 
    display: block;
    background-image: url('../img/icons.png');
    background-position: -141px -1032px;
}    
</style>
