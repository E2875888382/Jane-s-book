<template>
    <div class="content col-11" >
        <el-tabs tab-position="left" style="height: 1000px;"  type="border-card">
            <!-- 个人主页 -->
            <el-tab-pane>
                <span slot="label" @click="getLoginUserIfo()">
                    <i class="el-icon-s-home"></i> 个人主页
                </span>
                <div v-if="$store.state.loginFlag">
                    <div class="user_info_head">
                        <van-image width="64" height="64" class="user_img" :src="$store.state.userIfo.avatar"/>
                        <span class="user_name">{{ $store.state.userIfo.nickName }}</span>
                        <van-progress :percentage="$store.state.userIfo.level"  :pivot-text="'LV'+ $store.state.userIfo.level " class="process_bar" color="#f2826a"/>
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
            </el-tab-pane>

            <!-- 我的信息 -->
            <el-tab-pane>
                 <span slot="label">
                    <i class="el-icon-user"></i> 我的信息
                </span>
                <div v-if="$store.state.loginFlag">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="昵称" prop="nickName">
                            <el-input v-model="ruleForm.nickName"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期" required>
                            <el-form-item prop="birth">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="ruleForm.gender">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="个性签名" prop="sign">
                            <el-input type="textarea" v-model="ruleForm.sign"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>

            <!-- 我的头像 -->
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-picture-outline-round"></i> 我的头像
                </span>
                <div v-if="$store.state.loginFlag">
                    <avatar></avatar>
                </div>
            </el-tab-pane>

            <!-- 账号安全 -->
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-lock"></i> 账号安全
                </span>
                <div v-if="$store.state.loginFlag">
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
                                    <van-icon name="clear" size="20" color="#efa957" class="icon" v-if="$store.state.userIfo.telephone.length ==0" />
                                    <van-icon name="checked" size="20" color="#42cb6c" class="icon" v-if="$store.state.userIfo.telephone.length !==0"/>
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
                                    <van-icon name="clear" size="20" color="#efa957" class="icon" v-if="$store.state.userIfo.qq.length ==0" />
                                    <van-icon name="checked" size="20" color="#42cb6c" class="icon"  v-if="$store.state.userIfo.qq.length !==0" />
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
                </div>
            </el-tab-pane>

            <!-- 好友消息 -->
            <el-tab-pane>
                <span slot="label"  @click="getFriendsMessage">
                    <el-badge :value="$store.state.messageCount" class="item">
                        <i class="el-icon-message"></i> 好友消息
                    </el-badge>
                </span>
                <div v-if="$store.state.loginFlag">
                    <div>
                        <span>好友消息</span>
                        <el-divider></el-divider>
                    </div>
                    <div class="messageBox">
                        <el-card class="box-card" v-for="item in friendsMessage" :key="item.index">
                            <div slot="header" class="clearfix">
                                <span class="sendTime">{{ item.sendTime }}</span>
                                <span>{{ item.sender }}：</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="isRead(item.id)">已读</el-button>
                            </div>
                            <div class="text item">{{ item.content }}</div>
                        </el-card>
                    </div>
                </div>
            </el-tab-pane>

            <!-- 管理好友 -->
            <el-tab-pane>
                <span slot="label"  @click="getFriends">
                    <van-icon name="friends-o" /> 好友管理
                </span>
                <div v-if="$store.state.loginFlag">
                    <div class="searchFriendBox">
                        <div>
                            <span>添加好友</span>
                            <el-divider></el-divider>
                        </div>
                        <div>
                            <div style="margin-bottom:20px;text-align:center" >
                                <el-input placeholder="请输入email"  class="input-with-select" style="width:300px" v-model="searchFriendInput"></el-input>
                                <el-button slot="append" icon="el-icon-search"  @click="searchFriend"></el-button>
                            </div>
                            <div v-for="item in searchFriendResult" :key="item.email">
                                <div class="searchFriendList">
                                <span>{{ item.nickName }}</span>
                                <p>{{ item.email }}</p>
                                </div>
                                <el-button type="primary" plain @click="addFriend(item.email,item.nickName)">添加关注</el-button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-divider content-position="left">我的好友</el-divider>
                    </div>
                    <div class="friendListBox col-12">
                        <div v-for="item in friendsList" :key="item.friendEmail">
                            <div class="friendList col-10">
                                <span>{{ item.friendNickName }}</span>
                                <p>{{ item.friendEmail }}</p>
                            </div>
                            <el-dropdown>
                                <el-button type="primary">
                                    已关注<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><a @click="deleteFriend(item.friendEmail)">取消关注</a></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-divider></el-divider>
                        </div>
                    </div>
                </div> 
            </el-tab-pane>

            <!-- 发送私信 -->
            <el-tab-pane>
                <span slot="label"  @click="getFriends">
                    <van-icon name="friends-o" /> 发送私信
                </span>
                <div v-if="$store.state.loginFlag" class="col-12">
                    <div class="sendMsgBox col-12">
                        <div>
                            <span>发送私信</span>
                            <el-divider content-position="right">我的好友</el-divider>
                        </div>
                        <div class="left_friend_list col-4">
                            <div v-for="item in friendsList" :key="item.friendEmail" @click="sendMsgReceiver( item.friendNickName,item.friendEmail )">
                                <div class="friendList_sendMsg col-12">
                                    <span>{{ item.friendNickName }}</span>
                                    <p>{{ item.friendEmail }}</p>
                                    <el-divider></el-divider>
                                </div>
                            </div>
                        </div>
                        <div class="rigth_send_msg col-8">
                            <p>发送给：{{ receiver.msgReceiverNickname }} {{ receiver.msgReceiverEmail }}</p>
                            <el-input type="textarea" placeholder="请输入内容" v-model="receiver.textarea" maxlength="100" show-word-limit autofocus="true" resize="none" rows="10" class="textarea col-12">
                            </el-input>
                            <div class="send_box">
                                <el-button type="primary" round @click="sendMsg">发送</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>


<script>
//导入头像组件
import avatar from './avatar.vue'
import changePassword from './changePassword.vue'
import changeTelephone from './changeTelephone.vue'
import changeQQ from './changeQQ.vue'
export default {
    data(){
        return{
            tips:'',//安全系数提示
            safeNum:0,//安全系数
            // flag:用于控制修改密码的组件出现
            changePasswordFlag:false,
            // flag:用于控制修改密码的组件出现
            changeTelephoneFlag:false,
            // flag:用于控制修改QQ的组件出现
            changeQQFlag:false,
            //发送私信
            receiver:{
                msgReceiverNickname:'',
                msgReceiverEmail:'',
                textarea:'',//私信内容
            },
            //好友消息列表
            friendsMessage:[],
            //添加好友搜索框
            searchFriendInput:'',
            //添加好友搜索结果
            searchFriendResult:[],
            //好友列表
            friendsList:[],
            //更改用户信息表单
            ruleForm: {
                nickName: '',
                birth: '',
                sign: '',
                gender:'',
            },
            //规则，用于校验更改用户信息
            rules: {
                nickName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                sign: [
                    { required: true, message: '请填写个性签名', trigger: 'blur' }
                ]
            }
        }
    },
    //在这里注册组件
    components:{
        avatar,
        changePassword,
        changeTelephone,
        changeQQ,
    },
    methods:{
        // 计算安全信息
        sumSafeNum:function(){
            if(this.$store.state.userIfo.telephone.length!==0&&this.$store.state.userIfo.qq.length!==0){
                this.safeNum = 100;
            }
            else if(this.$store.state.userIfo.telephone.length==0&&this.$store.state.userIfo.qq.length==0){
                this.safeNum = 30;
            }else{
                this.safeNum = 70;
            }
            return this.safeNum;
        },
        // 计算安全信息
        safeTips(){
            if(this.$store.state.userIfo.telephone.length!==0&&this.$store.state.userIfo.qq.length!==0){
                this.tips = '你的账号安全状况真棒，请继续保持哦';
            }
            else if(this.$store.state.userIfo.telephone.length==0&&this.$store.state.userIfo.qq.length==0){
                this.tips = '你的账号安全状况有点糟糕，请完善信息鸭';
            }else{
                this.tips = '您的账号安全状况还不错哟，完善剩余的安全项可进一步提高安全评分哟';
            }
            return this.tips;
        },
        //修改用户信息
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //发送更改后的用户信息到后台
                    this.$http.post('updateUserInfo',{email:this.$store.state.userIfo.email,update:this.ruleForm, credentials: true }).then((result) =>{
                        if(result.body.code==200){
                            this.getLoginUserIfo();
                            this.$message({
                                message: '修改信息成功',
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();//成功后重置输入表单
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置用户信息表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //获取用户信息并保存到vuex
        getLoginUserIfo(){
             //请求登录session，用于持久化登录状态
            this.$http.get('getLoginUserInfo',{ credentials: true }).then( (result) =>{
                if(result.body[0]){
                    this.$store.commit('userIfo',result.body[0]);
                }
            })
        },
        //获取好友消息
        getFriendsMessage(){
                this.$http.post("getFriendsMessage" ,{user:this.$store.state.userIfo.email}).then( (result) =>{
                    this.friendsMessage = result.body;
                    if(result.body.length>0){
                        this.$store.commit('getMessageCount',result.body.length);
                    }else{
                        this.$store.commit('getMessageCount','');
                    }
                })
        },
        //将消息设置为已读
        isRead(id){
            this.$http.post("isRead" ,{id:id},{ credentials: true}).then( (result) =>{
                if(result.body.code == 200){
                    this.getFriendsMessage();//设置为已读后刷新信息列表
                }
            })
        },
        //删除好友
        deleteFriend(email){
            this.$http.post("deleteFriend",{delete:email,user:this.$store.state.userIfo.email}).then( (result) =>{
                this.getFriends();//删除好友成功刷新好友列表
            })
        },
        //获取好友列表
        getFriends(){
                this.$http.post("getFriends" ,{user:this.$store.state.userIfo.email}).then( (result) =>{
                    this.friendsList = result.body;
                }) 
        },
        //搜索好友
        searchFriend(){
            this.$http.post("searchFriend" ,{search:this.searchFriendInput}).then( (result) =>{
                this.searchFriendResult = result.body;
            })
        },
        //添加好友
        addFriend(email,nickName){
            this.$http.post("addFriend" ,{addEmail:email,addNickName:nickName,user:this.$store.state.userIfo.email}).then( (result) =>{
                if(result.body.code==200){
                    this.$message({
                        message: '添加好友成功',
                        type: 'success'
                    });
                    this.searchFriendResult = [];
                    this.searchFriendInput = '';
                    this.getFriends();//添加好友成功后刷新好友列表
                }
            })
        },
        //获取要发送消息给的好友
        sendMsgReceiver(nickName,email){
            this.receiver.msgReceiverNickname = nickName;
            this.receiver.msgReceiverEmail = email;
        },
        //发送私信
        sendMsg(){
            if(this.receiver.textarea!==''&& this.receiver.msgReceiverEmail!==''){
                this.$http.post("sendMsg" ,{receiver:this.receiver.msgReceiverEmail,content:this.receiver.textarea,sendTime:new Date().toLocaleString()},{ credentials: true}).then( (result) =>{
                    if(result.body.code==200){
                        this.$message({
                            message: '发送私信成功',
                            type: 'success'
                        });
                    }
                })
            }else{
                this.$message({
                    message: '请选择收件人以及填写消息！',
                    type: 'warning'
                });
            }
        }
    }
}
</script>

<style scoped>
.content{
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
.msg{
    font-size: 14px;
    color: #48576a;
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
.friendList{
    float: left;
    padding-left: 30px;
}
.friendList p{
    line-height: 14px;
    font-size: 12px;
    color: #6d757a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.friendListBox{
    height: 730px;
    overflow:auto;
}
.searchFriendBox{
    height: 170px;
}
.searchFriendList{
    width: 700px;
    float: left;
    padding-left: 30px;
}
.searchFriendList p{
    line-height: 14px;
    font-size: 12px;
    color: #6d757a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
} 
.messageBox{
    height: 850px;
    overflow:auto;
} 
.sendTime{
    color: #999;
    font-size: 12px;
    line-height: 22px;
}
.box-card{
    margin-bottom: 10px;
}
.left_friend_list{
    height: 700px;
    overflow: auto;
    cursor: pointer;
    float: right;
}
.rigth_send_msg{
    height: 700px;
    border-right:1px solid #DCDFE6;
    position:absolute;
    left: 0;
    top:70px;
}
.rigth_send_msg p{
    text-indent: 2em;
}
.sendMsgBox{
    height: 800px;
    position: relative;
}
.friendList_sendMsg{
    height: 80px;
    float: left;
}
.friendList_sendMsg:hover{
    color: greenyellow;
}
.friendList_sendMsg p{
    line-height: 14px;
    font-size: 12px;
    color: #6d757a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.textarea{
  margin-left: 20px;
}
.send_box{
    margin:20px 10px 0px 20px;
    text-align: right;
}
</style>
