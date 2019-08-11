<template>
<div>
    <div class="user_info_head">
        <van-image width="64" height="64" class="user_img" :src="$store.state.userIfo.avatar"/>
        <span class="user_name">{{ $store.state.userIfo.nickName }}</span>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="$store.state.userIfo.level" class="process_bar"></el-progress>
    </div>
    <el-divider content-position="left">基本信息</el-divider>
    <div class="user_info_footer">
        <div class="user_info_item">
            <span class="font_label">用户ID：</span><span class="msg">{{ $store.state.userIfo.userID }}</span>
        </div>
        <div class="user_info_item">
            <span class="font_label">我的邮箱：</span><span class="msg">{{ $store.state.userIfo.email }}</span>
        </div>
        <div class="user_info_item">
            <span class="font_label">出生日期：</span><span class="msg">{{ $store.state.userIfo.birthday }}</span>
        </div>
        <div class="user_info_item">
            <span class="font_label">性别：</span><span class="msg">{{ $store.state.userIfo.gender }}</span>
        </div>
        <div class="user_info_item">
            <span class="font_label">我的签名：</span><span class="msg">{{ $store.state.userIfo.sign }}</span>
        </div>
    </div>
</div>
</template>

<script>
export default{

}

</script>

<style scoped>
.msg{
    font-size: 14px;
    color: #48576a;
    float: left;
    line-height: 30px;
    padding: 0;
}
.user_info_item{
    width: 800px;
    height: 60px;
}
.user_info_head{
    width: 800px;
    height: 150px;
    margin: 20px;
    position: relative;
}
.user_img{
    width: 64px;
    height: 64px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.user_info_footer{
    width: 800px;
    height: 600px;
    margin: 20px;
    position: relative;
   
}
.user_name{
    font-size: 18px;
    font-weight: 700;
    color: #222;
    cursor: default;
    position: absolute;
    top: 10px;
    left: 100px;
}
.process_bar{
    width: 300px;
    height: 20px;
    position: absolute;
    top: 50px;
    left: 100px;
}
.font_label{
    font-size: 14px;
    color: #48576a;
    width: 95px;
    text-align: right;
    margin-right: 20px;
    float: left;
    line-height: 30px;
    padding: 0;
}
</style>