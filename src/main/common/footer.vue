<template>
<div class="bg col-12">
    <div class="footer col-10 m-auto">
        <div class="left_div col-7">
            <p>Copyright by 虎扑JRs Elric Tang</p>
            <p>GitHub:https://github.com/E2875888382</p>
        </div>
        <div class="right_div col-5">
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
</div>

</template>

<script>
export default {

}
</script>

<style scoped>
.bg{
    background: #f6f9fa;
    height:120px;
}
.footer{
    display: flex;
}
.left_div,.right_div{
    height: 120px;
    padding-top: 10px;
    padding-bottom: 10px;
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
p{
    font-size:12px;
    color:#999;
    line-height:24px;
    margin:0;
}
em{
    font-style: normal;
}
</style>
