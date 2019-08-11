<template>
    <div>
        <div :class="{'header_medium':safeNum==70,'header_safe':safeNum==100,'header_low':safeNum==30}">
            <div class="safe_num">{{ sumSafeNum() }}</div>
            <div class="tips">账号安全评分</div>
        </div>
        <p class="safe_p">{{ safeTips() }}</p>
        <el-divider></el-divider>
        <div class="safe_item">
            <div class="safe_item_title">
                <div class="p">
                    <van-icon name="clear" size="20" color="#efa957" class="icon" v-if="!$store.state.userIfo.telephone" />
                    <van-icon name="checked" size="20" color="#42cb6c" class="icon" v-if="$store.state.userIfo.telephone"/>
                    <span>绑定手机号</span>
                </div>
            </div>
            <div class="safe_item_warning" v-if="$store.state.userIfo.telephone!==''">
                <span>{{ $store.state.userIfo.telephone }}</span>
            </div>
            <div class="safe_item_warning" v-if="$store.state.userIfo.telephone ==''">
                <span>未绑定手机号</span>
            </div>
            <div class="safe_item_link">
                <el-button type="primary" size="small" @click="changeTelephoneFlag=!changeTelephoneFlag">更换手机</el-button>
            </div>
        </div>
        <changeTelephone v-if="changeTelephoneFlag"></changeTelephone>
        <el-divider></el-divider>
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
                <el-button type="primary" size="small" @click="changePasswordFlag=!changePasswordFlag">修改密码</el-button>
            </div>
        </div>
        <changePassword v-if="changePasswordFlag"></changePassword>
        <el-divider></el-divider>
        <div class="safe_item">
            <div class="safe_item_title">
                <div class="p">
                    <van-icon name="clear" size="20" color="#efa957" class="icon" v-if="!$store.state.userIfo.qq" />
                    <van-icon name="checked" size="20" color="#42cb6c" class="icon"  v-if="$store.state.userIfo.qq" />
                    <span>绑定QQ号</span>
                </div>
            </div>
            <div class="safe_item_warning" v-if="$store.state.userIfo.qq!==''">
                <span>{{ $store.state.userIfo.qq }}</span>
            </div>
            <div class="safe_item_warning" v-if="$store.state.userIfo.qq == ''">
                <span>未绑定QQ号</span>
            </div>
            <div class="safe_item_link">
                <el-button type="primary" size="small" @click="changeQQFlag=!changeQQFlag">绑定QQ</el-button>
            </div>
        </div>
        <changeQQ v-if="changeQQFlag"></changeQQ>
    </div>
</template>

<script>
import changePassword from './changePassword.vue'
import changeTelephone from './changeTelephone.vue'
import changeQQ from './changeQQ.vue'

export default {
    data(){
        return {
            tips:'',//安全系数提示
            safeNum:0,//安全系数
            changePasswordFlag:false,// flag:用于控制修改密码的组件出现
            changeTelephoneFlag:false,// flag:用于控制修改密码的组件出现
            changeQQFlag:false,// flag:用于控制修改QQ的组件出现
        }
    },
    components:{
        changePassword,
        changeTelephone,
        changeQQ,
    },
    methods:{
        // 计算安全信息
        sumSafeNum:function(){
            // 如果用户手机和QQ都有，安全系数为100
            if(this.$store.state.userIfo.telephone&&this.$store.state.userIfo.qq){
                this.safeNum = 100;
            }
            // 如果手机和QQ都没有，安全系数为30
            else if(!this.$store.state.userIfo.telephone&&!this.$store.state.userIfo.qq){
                this.safeNum = 30;
            }
            // 如果只有手机或只有QQ，安全系数为70
            else{
                this.safeNum = 70;
            }
            return this.safeNum;
        },
        // 根据安全系数改变安全提示
        safeTips(){
            if(this.$store.state.userIfo.telephone&&this.$store.state.userIfo.qq){
                this.tips = '你的账号安全状况真棒，请继续保持哦';
            }
            else if(!this.$store.state.userIfo.telephone&&!this.$store.state.userIfo.qq){
                this.tips = '你的账号安全状况有点糟糕，请完善信息鸭';
            }else{
                this.tips = '您的账号安全状况还不错哟，完善剩余的安全项可进一步提高安全评分哟';
            }
            return this.tips;
        },
    }
}
</script>

<style scoped>
.header_low{
    width: 400px;
    height: 220px;
    margin: 0 auto;
    background: url('../../img/safe.png') no-repeat;
    position: relative;
}
.header_medium{
    width: 400px;
    height: 220px;
    margin: 0 auto;
    background: url('https://s1.hdslb.com/bfs/static/security/static/img/logo_normal.79d580e.png') no-repeat;
    position: relative;
}
.header_safe{
    width: 400px;
    height: 220px;
    margin: 0 auto;
    background: url('https://s1.hdslb.com/bfs/static/security/static/img/logo_safe.792b6bf.png') no-repeat;
    position: relative;
}
.safe_item{
    height: 40px;
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
    margin: 0;
    font-family: MicrosoftYaHei;
    float: left;
}
.safe_p{
    text-align: center;
}
.safe_item span{
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
.icon{
    position:absolute;
    top: 3px;
}
</style>