<template>
    <div class="footer col-12">
        <div class="first_div col-4">
            <div class="cards col-4">
                <em>关于我们</em>
            </div>
            <div class="cards col-4">
                <em>联系我们</em>
            </div>
            <div class="cards col-4">
                <em>加入我们</em>
            </div>
            <div class="cards col-4">
                <em>友情链接</em>
            </div>
            <div class="cards col-4">
                <em>bilibili认证</em>
            </div>
            <div class="cards col-4">
                <em>Investor Relations</em>
            </div>
        </div>
        <div class="second_div col-4">
            <div class="cards col-4">
                <em>帮助中心</em>
            </div>
            <div class="cards col-4">
                <em>高级弹幕</em>
            </div>
            <div class="cards col-4">
                <em>活动专题页</em>
            </div>
            <div class="cards col-4">
                <em>侵权申诉</em>
            </div>
            <div class="cards col-4">
                <em>活动中心</em>
            </div>
            <div class="cards col-4">
                <em>用户反馈论坛</em>
            </div>
            <div class="cards col-4">
                <em>壁纸站</em>
            </div>
            <div class="cards col-4">
                <em>名人堂</em>
            </div>
        </div>
        <div class="third_div col-4">
            <el-tooltip placement="top" effect="light" class="col-3">
                <div slot="content">
                    <img src="../../img/wechat.png" alt="" class="img-logo">
                </div>
                <el-button class="download">
                    <div class="download_logo"></div>
                    <em>客户端下载</em>
                </el-button>
            </el-tooltip>
            <el-tooltip placement="top" effect="light" class="col-3">
                <div slot="content">
                    <img src="../../img/wechat.png" alt="" class="img-logo">
                </div>
                <el-button class="qq">
                    <div class="qq_logo"></div>
                    <em>官方QQ</em>
                </el-button>
            </el-tooltip>
            <el-tooltip placement="top" effect="light" class="col-3">
                <div slot="content">
                    <img src="../../img/wechat.png" alt="" class="img-logo">
                </div>
                <el-button class="wechat">
                    <div class="wechat_logo"></div>
                    <em>官方微信</em>
                </el-button>
            </el-tooltip>
        </div>
    </div>


</template>

<script>
export default {

}
</script>

<style scoped>
.footer{
    background: #f6f9fa;
    height:120px;
    display: flex;
    justify-content: center;
    align-content: center;
}
.first_div,.second_div,.third_div{
    height: 120px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.second_div,.third_div{
    border-left: solid 1px #e5e9ef;
}
.download,.qq,.wechat{
    height:80px;
    border:none;
    background-color: #f6f9fa;
}
.download_logo{
    display: block;
    background:url(../../img/icons.png) no-repeat -1024px -194px;
    width: 60px;
    height: 60px;
}
.qq_logo{
    display: block;
    background:url(../../img/icons.png) no-repeat -1024px -322px;
    width: 60px;
    height: 60px;
}
.wechat_logo{
    display: block;
    background:url(../../img/icons.png) no-repeat -1024px -66px;
    width: 60px;
    height: 60px;
}
.img-logo{
    width: 130px;
    height: 130px;
}
em{
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
    color: #222;
}
em:hover{
    color:deepskyblue;
    cursor: pointer;
}
.cards{
    height: 14px;
    margin-bottom: 16px;
    float: left;
}
</style>
