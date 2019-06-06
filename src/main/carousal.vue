<template>  
        <div class="block">                      
             <el-carousel indicator-position="outside" height="200px">
                <el-carousel-item v-for="item in lunbo" :key="item.id">
                    <img :src="item.picture"> 
                </el-carousel-item>
            </el-carousel>           
        </div> 
</template>

<script>
export default {
    data(){
        return{
            lunbo:[]
        }
    },
    created(){
        this.getLunbo()
    },
    methods:{
           getLunbo(){
               this.$http.get('http://localhost:8000/getLunBo').then(result => {
                    
                    this.lunbo=result.body;
               
               })
          }
    }
}
</script>

<style scoped>
.block{
    width:1000px;
    height:230px;
    margin:0 auto;   
}
 
img{
    width:1000px;
    height:200px;
    
} 
</style>

 