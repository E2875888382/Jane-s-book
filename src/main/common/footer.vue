<template>
<div class="bg col-12">
    <div class="footer col-10 m-auto">
        <div class="left_div col-10">
            <p>Copyright by Elric Tang</p>
            <p>GitHub:https://github.com/E2875888382</p>
        </div>
        <div class="right_div col-2">
            <el-tooltip placement="top" effect="light" class="col-3">
                <div slot="content">
                    <img src="../../img/wechat.png" alt="" class="img-logo">
                </div>
                <el-button class="wechat">
                    <div class="wechat_logo"></div>
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
    height:60px;
}
.footer{
    display: flex;
}
.left_div,.right_div{
    height: 60px;
}
.wechat{
    height:60px;
    border:none;
}
.wechat_logo{
    display: inline-block;
    background:url(../../img/icons.png) no-repeat -1024px -66px;
    width: 60px;
    height: 60px;
    position: absolute;
    top:0;
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
</style>
