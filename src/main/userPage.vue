<template>
    <div class="content">
        <el-tabs tab-position="left" style="height: 1000px;"  type="border-card">
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-s-home"></i> 个人主页
                </span>
                <div>
                    <div class="user_info_head">
                        <van-image width="64" height="64" class="user_img" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                        <span class="user_name">B站小老虎</span>
                        <van-progress :percentage="50" :show-pivot="false" class="process_bar" color="#f2826a"/>
                    </div>

                    <el-divider content-position="left">基本信息</el-divider>

                    <div class="user_info_footer">
                        <div class="user_info_item">
                            <span class="font_label">用户ID：</span> 
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">出生日期：</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的手机：</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的邮箱：</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">性别：</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的签名：</span>
                        </div>                                                                                                 
                    </div>

                </div>

            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-user"></i> 我的信息
                </span>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-picture-outline-round"></i> 我的头像
                </span>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-lock"></i> 账号安全
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>
 
.content{
     width:1000px;
     height:1000px;
     margin:100px auto;
}
.user_info_head{
    width: 800px;
    height: 150px;
    margin: 20px;
    position: relative;
}
.user_info_footer{
    width: 800px;
    height: 600px;
    margin: 20px;
    position: relative;
   
}
.process_bar{
    width: 300px;
    height: 20px;
    position: absolute;
    top: 50px;
    left: 100px;
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
.user_info_item{
    width: 800px;
    height: 60px;
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
.user_img{
    width: 64px;
    height: 64px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
</style>
