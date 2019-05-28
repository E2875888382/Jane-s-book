<template>
<div class="footer_box">
    <div class="footer">
        <div class="first_div">
            <div class="page-header">
                <small>bilibili</small>
            </div>
            <div class="cards">
                <em>关于我们</em>        
            </div>
            <div class="cards">
                <em>联系我们</em>        
            </div>
            <div class="cards">
                <em>加入我们</em>        
            </div>
            <div class="cards">
                <em>友情链接</em>        
            </div>
            <div class="cards">
                <em>bilibili认证</em>        
            </div>
            <div class="cards">
                <em>Investor Relations</em>        
            </div>            
        </div>  
        <div class="second_div">
            <div class="page-header">
                <small>传送门</small>
            </div>
            <div class="cards">
                <em>帮助中心</em>        
            </div>
            <div class="cards">
                <em>高级弹幕</em>        
            </div>
            <div class="cards">
                <em>活动专题页</em>        
            </div>
            <div class="cards">
                <em>侵权申诉</em>        
            </div>
            <div class="cards">
                <em>活动中心</em>        
            </div>
            <div class="cards">
                <em>用户反馈论坛</em>        
            </div>
            <div class="cards">
                <em>壁纸站</em>        
            </div>
            <div class="cards">
                <em>名人堂</em>        
            </div>
            <div class="cards">
                <em>专车号服务中心</em>        
            </div>                                    
        </div>
        <div class="third_div">
            <el-tooltip placement="top" effect="light">
                <div slot="content">
                    <img src="../img/wechat.png" alt="" class="img-logo">
                </div>
                <el-button class="download">
                    <div class="download_logo"></div>
                    <em>客户端下载</em>
                </el-button>
            </el-tooltip>
            <el-tooltip placement="top" effect="light">
                <div slot="content">
                    <img src="../img/wechat.png" alt="" class="img-logo">
                </div>
                <el-button class="qq">
                    <div class="qq_logo"></div>
                    <em>官方QQ</em>
                </el-button>
            </el-tooltip>
            <el-tooltip placement="top" effect="light">
                <div slot="content">
                    <img src="../img/wechat.png" alt="" class="img-logo">
                </div>
                <el-button class="wechat">
                    <div class="wechat_logo"></div>
                    <em>官方微信</em>
                </el-button>
            </el-tooltip>
        </div>
    </div>
</div>
 
</template>

<script>
export default {
    
}
</script>

<style scoped>
.footer_box{
    background: #f6f9fa;
    width: 100%;
    height: 175px;
   
}
.footer{
    width: 1000px;
    height:175px;
    margin:0 auto;
    padding-top: 25px; 
}
.first_div{
    width: 325px;
    height: 112px;
    float:left;
}
.second_div{
    width: 350px;
    height: 112px;
    float:left;
    border-left: solid 1px #e5e9ef;
    padding: 0 25px;
}
.third_div{
    width:305px;
    height: 112px;
    float:left;
    border-left: solid 1px #e5e9ef;
    padding-left: 24px;
}
.download,.qq,.wechat{
    width: 82px;
    height:80px;
    border:none;
    padding: 0;
    margin:0;
    background-color: #f6f9fa;
}
.download_logo{
    display: block;
    background:url(../img/icons.png) no-repeat -1024px -194px;
    margin-left: 11px;
    width: 60px;
    height: 60px;
}
.qq_logo{
    display: block;
    background:url(../img/icons.png) no-repeat -1024px -322px;
    margin-left: 11px;
    width: 60px;
    height: 60px;    
}
.wechat_logo{    
    display: block;
    background:url(../img/icons.png) no-repeat -1024px -66px;
    margin-left: 11px;
    width: 60px;
    height: 60px;
}
.img-logo{
    width: 130px;
    height: 130px;
}
em{
    font-style: normal;
    font-size: 14px;
    line-height: 14px;
    color: #222;
}
em:hover{
    color:deepskyblue;
    cursor: pointer;
}
.cards{
    width:90px;
    height: 14px;
    margin-bottom: 16px;
    float: left;
}
.first_div>.cards{
    width:110px;
    height: 14px;
    margin-bottom: 16px;
    float: left;    
} 
</style>
