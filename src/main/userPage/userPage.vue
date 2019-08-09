<template>
    <div class="content col-11" >
        <el-tabs tab-position="left" style="height: 1000px;"  type="border-card">

            <!-- 个人主页 -->
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-s-home"></i> 个人主页
                </span>
                <div v-if="$store.state.loginFlag">
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
            </el-tab-pane>

            <!-- 我的信息 -->
            <el-tab-pane>
                 <span slot="label">
                    <i class="el-icon-user"></i> 我的信息
                </span>
                <div v-if="$store.state.loginFlag">
                    <edit></edit>
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
                </div>
            </el-tab-pane>

            <!-- 好友消息 -->
            <el-tab-pane>
                <span slot="label">
                    <el-badge :value="$store.state.messageCount" class="item">
                        <i class="el-icon-message"></i> 好友消息
                    </el-badge>
                </span>
                <div v-if="$store.state.loginFlag">
                    <div class="messageBox">
                        <el-card class="box-card" v-for="item in $store.state.message" :key="item.index">
                            <div slot="header" class="clearfix">
                                <span class="sendTime">{{ item.time }}</span>
                                <span>{{ item.nickName }}：</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="isRead(item.messageID)">已读</el-button>
                            </div>
                            <div class="text item">{{ item.content }}</div>
                        </el-card>
                    </div>
                </div>
            </el-tab-pane>

            <!-- 发送私信 -->
            <el-tab-pane>
                <span slot="label">
                    <van-icon name="friends-o" /> 好友互动
                </span>
                <div v-if="$store.state.loginFlag" style="display:flex">
                    <div class="left_friend_list col-4">
                        <div class="friendList_item col-12" >
                            <el-input placeholder="请输入昵称"  class="input-with-select col-10" v-model="searchFriendInput"></el-input>
                            <el-button slot="append" icon="el-icon-search"  @click="searchFriend"></el-button>
                        </div>
                        <div v-for="(item,index) in searchFriendResult" :key="index"  class="friendList_item col-12" >
                            <van-image width="60" height="60" class="avatar" :src="item.avatar"/>
                            <div>
                                <p>{{ item.nickName }}</p>
                                <span>{{ item.sign }}</span>
                            </div>
                            <el-button type="primary" size="mini"  plain v-if="item.isMe"  disabled style="margin-left:auto">我</el-button>
                            <el-button type="primary" size="mini" plain v-if="item.isFriend" disabled  style="margin-left:auto">已关注</el-button>
                            <el-button type="primary" size="mini" plain v-if="!item.isFriend&&!item.isMe" @click="addFriend(item.userID)"  style="margin-left:auto">添加关注</el-button>
                        </div>
                        <div class="friendList_item col-12"  v-for="item in $store.state.friendsList" :key="item.userID" @click="sendMsgReceiver(item.nickName,item.userID,$event )">
                            <van-image width="60" height="60" class="avatar" :src="item.avatar"/>
                            <div>
                                <p>{{ item.nickName }}</p>
                                <span>{{ item.sign }}</span>
                            </div>
                            <el-dropdown style="margin-left:auto">
                                <i class="el-icon-arrow-down el-dropdown-link" ></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><span @click="deleteFriend(item.userID)">删除好友</span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                    <div class="rigth_send_msg col-8">
                        <p>{{ receiver.nickName }}</p>
                        <hr>
                        <el-input type="textarea" placeholder="请输入内容" v-model="receiver.textarea" maxlength="100" show-word-limit autofocus="true" resize="none" rows="10" class="col-12">
                        </el-input>
                        <div class="send_box">
                            <el-button type="primary" round @click="sendMsg">发送</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane>
                <span slot="label"  >
                    <van-icon name="star" /> 我的收藏
                </span>
                <div v-if="$store.state.loginFlag">
                    <collection></collection>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>


<script>

import avatar from './avatar.vue'
import changePassword from './changePassword.vue'
import changeTelephone from './changeTelephone.vue'
import changeQQ from './changeQQ.vue'
import collection from './collection.vue'
import edit from './edit.vue'

export default {
    data(){
        return{
            tips:'',//安全系数提示
            safeNum:0,//安全系数
            changePasswordFlag:false,// flag:用于控制修改密码的组件出现
            changeTelephoneFlag:false,// flag:用于控制修改密码的组件出现
            changeQQFlag:false,// flag:用于控制修改QQ的组件出现
            receiver:{//发送私信
                nickName:'',//接受者昵称
                receiverID:'',//接受者userID
                textarea:'',//私信内容
            },
            searchFriendInput:'',//添加好友搜索框
            searchFriendResult:[],//添加好友搜索结果
        }
    },
    components:{
        avatar,
        changePassword,
        changeTelephone,
        changeQQ,
        collection,
        edit,
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
        //获取用户信息并保存到vuex
        getLoginUserIfo(){
            this.$http.get('getLoginUserInfo',{ credentials: true }).then( (result) =>{
                if(result.body[0]){
                    this.$store.commit('userIfo',result.body[0]);
                }
            })
        },
        //获取好友消息
        getFriendsMessage(){
            this.$http.post("getFriendsMessage" ,{userID:this.$store.state.userIfo.userID}).then( (result) =>{
                this.$store.commit('getMessage',result.body);
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
        deleteFriend(friendID){
            this.$http.post("deleteFriend",{friendID:friendID,userID:this.$store.state.userIfo.userID}).then( (result) =>{
                this.getFriends();//删除好友成功刷新好友列表
            })
        },
        // 获取好友列表
        getFriends(){
            this.$http.post("getFriends" ,{userID:this.$store.state.userIfo.userID}).then( (result) =>{
                this.$store.commit('getFriends',result.body);
            }) 
        },
        //搜索好友
        searchFriend(){
            this.$http.post("searchFriend" ,{search:this.searchFriendInput}).then( (result) =>{
                // 根据昵称查询会出现多人的情况，遍历每个对象，发送查询请求，查看是否已关注或者是自己
                // 给每个对象添加两个flag，表示是否已关注和是否是自己
                result.body.forEach(element => {
                    element.isMe = false;
                    element.isFriend = false;
                    if(this.$store.state.userIfo.userID == element.userID){
                        element.isMe = true;
                    }
                    this.$http.post('checkFriend',{userID:this.$store.state.userIfo.userID,friendID:element.userID}).then((result)=>{
                        if(result.body.code == 200){
                            if(result.body.isFriend[0]['COUNT(*)'] == 1){
                                element.isFriend = true;
                            }
                        }
                    })
                });
                this.searchFriendResult = result.body;
            })
        },
        //添加好友
        addFriend(userID){
            this.$http.post("addFriend" ,{userID:this.$store.state.userIfo.userID,friendID:userID}).then( (result) =>{
                if(result.body.code==200){
                    this.$message({
                        message: '添加好友成功',
                        type: 'success'
                    });
                    this.searchFriendResult = [];// 重置搜索结果
                    this.searchFriendInput = '';// 重置搜索框
                    this.getFriends();// 添加好友成功后刷新好友列表
                }
            })
        },
        //获取要发送消息给的好友
        sendMsgReceiver(nickName,receiverID,event){
            this.receiver.nickName = nickName;
            this.receiver.receiverID = receiverID;
        },
        //发送私信
        sendMsg(){
            if(this.receiver.textarea!==''&& this.receiver.receiverID!==''){
                this.$http.post("sendMsg" ,{userID:this.$store.state.userIfo.userID,receiverID:this.receiver.receiverID,content:this.receiver.textarea,time:new Date().toLocaleString()}).then( (result) =>{
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
.messageBox{
    height: 960px;
    overflow:auto;
}
.messageBox::-webkit-scrollbar{
    display:none;
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
    height: 100%;
    overflow: auto;
    cursor: pointer;
    border-right:1px solid #DCDFE6;
}
.friendList_item{
    height: 80px;
    padding:10px;
    display: flex;
    align-items:center;
}
.friendList_item p{
    margin: 0;
    line-height: 30px;
    height:30px;
    font-size:14px;
}
.friendList_item span{
    margin: 0;
    line-height: 30px;
    height:30px;
    font-size:12px;
    color:#999;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 130px;
    display: block;
}
.send_box{
    margin:20px 10px 0px 20px;
    text-align: right;
}
.avatar{
    background-color: #f0f8ff;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right:10px;
}
</style>
