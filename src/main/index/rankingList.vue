<template>
    <div class="list_box">
        <div class="page-header">
             <h2><small>排行</small></h2>
        </div>
         <el-divider></el-divider>
        <el-card class="box-card">
            <div v-for="o in 7" :key="o" class="text-item">
                <i class="item-num">{{ o }}</i>
                {{'列表内容 ' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
     data() {
      return {
        activeName: '1'
      };
    }
}
</script>

<style scoped>
.list_box{
    width:250px;
    height:420px;
    float: right;
}
.media-object{
    width:70px;
    height:60px;
}
.box-card{
    height: 313px;

}
.text-item{
    height: 18px;
    margin-top: 20px;
    overflow: hidden;
    padding-left: 25px;
    position: relative;
}
.item-num{
    position: absolute;
    color: #fff;
    height: 18px;
    width:18px;
    line-height: 18px;
    top: 0;
    left: 0;
    font-size: 12px;
    min-width: 12px;
    text-align: center;
    background: #f25d8e;
    border-radius: 4px;
    padding: 0 3px;
    font-weight: bolder;
    font-style: normal;
    font: 12px Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
}
</style>
