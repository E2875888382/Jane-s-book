<template>
    <div>
        <div class="header">
            <div class="safe_num">60</div>
            <div class="tips">账号安全评分</div>
        </div>
        <p>您的账号安全状况还不错哟，完善剩余的安全项可进一步提高安全评分哟</p>
        <el-divider class="el-divider"></el-divider>

        <div class="safe_item">
            <div class="safe_item_title">
                <div class="p">
                    <van-icon name="checked" size="20" color="#42cb6c" class="icon"/>
                    <span>绑定手机号</span>
                </div>                                 
            </div>
            <div class="safe_item_warning">
                <span>未绑定手机号</span>
            </div>
            <div class="safe_item_link">
                <el-link type="primary" href="">更换手机</el-link> 
            </div>
            <el-divider class="el-divider"></el-divider>
        </div>

        <div class="safe_item">
            <div class="safe_item_title">
                <div class="p">
                    <van-icon name="checked" size="20" color="#42cb6c" class="icon"/>
                    <span>设置密码</span>
                </div>
            </div>    
            <div class="safe_item_warning">
                <span>已设置密码</span>
            </div>
            <div class="safe_item_link">
                <el-link type="primary" href="">修改密码</el-link>                
            </div>
            <el-divider class="el-divider"></el-divider>
        </div>

        <div class="safe_item">
            <div class="safe_item_title">
                <div class="p">
                    <van-icon name="checked" size="20" color="#42cb6c" class="icon"/>
                    <span>绑定QQ号</span>
                </div>
            </div>
            <div class="safe_item_warning">
                <span>未绑定QQ号</span>
            </div>
            <div class="safe_item_link">
                <el-link type="primary" href="">绑定QQ</el-link>                  
            </div>
            <el-divider class="el-divider"></el-divider>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
             
        }
    }
}
</script>

<style scoped>
.header{
    width: 400px;
    height: 220px;
    margin: 0 auto;
    background: url('https://s1.hdslb.com/bfs/static/security/static/img/logo_normal.79d580e.png') no-repeat;
    position: relative;
}
.safe_item{
    height: 80px;
    width: 840px;
}
.safe_item_title{
    width: 30%;
    padding:10px 10px 2px 20px;
    margin: 0;
    font-family: MicrosoftYaHei;
    float: left;
}
.safe_item_warning{
    width: 50%;
    padding:10px 10px 2px 20px;
    margin: 0;
    font-family: MicrosoftYaHei;
    float: left;
}
.safe_item_link{
    width: 20%;
    padding:10px 10px 2px 20px;
    margin: 0;
    font-family: MicrosoftYaHei;
    float: left;    
}
.el-divider{
    float: right;
}
p{
    text-align: center;
}
span{
    line-height: 20px;
    font-size: 14px;   
    color: #222;
}
.safe_item_title span{   
    line-height: 20px;
    font-size: 14px;   
    color: #222;
    position:absolute;
    top: 3px;
    left:35px;
}
.icon{
    position:absolute;
    top: 3px;
}
.p{
    height: 20px;
    position: relative;
}
.tips{
    position: absolute;
    font-size: 12px;
    color: #fff;
    left: 165px;
    top: 125px;
}
.safe_num{
    position: relative;
    margin: 0 auto;
    font-size: 48px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    top: 60px;
}
</style>
