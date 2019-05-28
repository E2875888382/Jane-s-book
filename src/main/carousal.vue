<template>  
        <div class="block">            
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <img src="../img/001.webp"> 
                </el-carousel-item>
            </el-carousel>           
        </div> 
</template>

<script>
export default {
    
}
</script>

<style scoped>
.block{
    width:1000px;
    height:230px;
    margin:0 auto;   
}
 
img{
    width:600px;
    height:200px;
    
} 
</style>

 