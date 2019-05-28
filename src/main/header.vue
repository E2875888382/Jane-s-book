<template>
<div class="header">
    <div class="mask"></div>
    <div class="head_content">
       <div class="right_box">
                    <el-dropdown class="select_list">
                    <el-button type="primary">
                        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item>双皮奶</el-dropdown-item>
                        <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                     
                </el-dropdown>
                   
                <div class="login">
                    <el-link :underline="false">登录</el-link>
                     
                </div>
                
                <div class="new">
                    <el-link :underline="false">注册</el-link>   
                </div>
                
       </div>
       <a href="//www.bilibili.com" class="head-logo"   ></a>
        <div class="search_box">
             
             
        </div>         
                                  
        
    </div>
</div>   
</template>

<script>
export default {
     data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      
      handleClick() {
        alert('button click');
      }
    
    }
}
</script>

<style scoped>
.header{
    background-image: url('../img/header.png');
    display: block;
    height:170px;
    width: 100%;
    background-position: center -10px;
    background-repeat: no-repeat;
}
.mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 42px;
    background-color: hsla(0,0%,100%,.4);
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
}
.head_content{
    width:1000px;
    height: 170px;
    margin: 0 auto;
    position: relative;
}
.select_list{
    float: right;
    height: 42px;
}
.login{
    height: 42px;
    line-height: 42px;
    text-align: center;
    float: left;
    width: 60px;
    
}
.new{
    height: 42px;
    line-height: 42px;
    text-align: center;
    float: left;
    width: 60px;
    
    
}
 
.right_box{
    float: right;
    width:250px;
    height: 42px;
}
.head-logo{
    position: absolute;
    width: 220px;
    height: 105px;
    left: 24px;
    top: 55px;
    background: transparent no-repeat 0;
    z-index: 10;
    background-image:url('../img/head-logo.png'); 
}
.search_box{
    position: absolute;
    bottom: 20px;
    right: 0;
    width: 342px;
    height: 32px;
    padding: 2px 2px 2px 72px;
    background-color: rgba(0,0,0,.12);
    border-radius: 6px;
    font-size: 12px;
    z-index: 10;
}
 
</style>
