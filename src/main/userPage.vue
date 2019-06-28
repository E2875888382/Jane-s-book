<template>
    <div class="content" >
        <el-tabs tab-position="left" style="height: 1000px;"  type="border-card">
            <!-- 个人主页 -->
            <el-tab-pane>
                <span slot="label" @click="getLoginUser()">
                    <i class="el-icon-s-home"></i> 个人主页
                </span>
                <div v-if="loginFlag">
                    <div class="user_info_head">
                        <van-image width="64" height="64" class="user_img" :src="avatar"/>
                        <span class="user_name">{{ currentUser }}</span>
                        <van-progress :percentage="level"  :pivot-text="'LV'+ level " class="process_bar" color="#f2826a"/>
                    </div>

                    <el-divider content-position="left">基本信息</el-divider>

                    <div class="user_info_footer">
                        <div class="user_info_item">
                            <span class="font_label">用户ID：</span><span class="msg">{{ userId }}</span> 
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">出生日期：</span><span class="msg">{{ birth }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的手机：</span><span class="msg">{{ telephone }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的邮箱：</span><span class="msg">{{ email }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">性别：</span><span class="msg">{{ gender }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的等级：</span><span class="msg">{{ level }}</span>
                        </div>
                        <div class="user_info_item">
                            <span class="font_label">我的签名：</span><span class="msg">{{ sign }}</span>
                        </div>                                                                                                 
                    </div>

                </div>
                <div v-if="!loginFlag" class="warn">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>
            <!-- 我的信息 -->
            <el-tab-pane>
                 <span slot="label">
                    <i class="el-icon-user"></i> 我的信息
                </span>
                <div v-if="loginFlag">
               
                
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="昵称" prop="nickName">
                        <el-input v-model="ruleForm.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="telephone">
                        <el-input v-model="ruleForm.telephone"></el-input>
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

                <div v-if="!loginFlag"  class="warn">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>
            <!-- 我的头像 -->
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-picture-outline-round"></i> 我的头像
                </span>
                
                <div v-if="loginFlag">
                    <avatar></avatar>
                </div>

                <div v-if="!loginFlag"  class="warn">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>
            <!-- 账号安全 -->
            <el-tab-pane>
                <span slot="label" @click="getSafeIfo">
                    <i class="el-icon-lock"></i> 账号安全
                </span>

                <div v-if="loginFlag">
                    <div>
                        <div class="header">
                            <div class="safe_num">{{ ifo.safeNum }}</div>
                            <div class="tips">账号安全评分</div>
                        </div>
                        <p class="safe_p">您的账号安全状况还不错哟，完善剩余的安全项可进一步提高安全评分哟</p>
                        <el-divider></el-divider>

                        <div class="safe_item">
                            <div class="safe_item_title">
                                <div class="p">
                                    <van-icon name="clear" size="20" color="#efa957" class="icon" v-if="!ifo.telephoneFlag" />
                                    <van-icon name="checked" size="20" color="#42cb6c" class="icon"  v-if="ifo.telephoneFlag"/>
                                    <span>绑定手机号</span>
                                </div>                                 
                            </div>
                            <div class="safe_item_warning" v-if="ifo.telephoneFlag">
                                <span>{{ ifo.telephone }}</span>
                            </div>
                            <div class="safe_item_warning" v-if="!ifo.telephoneFlag">
                                <span>未绑定手机号</span>
                            </div>
                            <div class="safe_item_link">
                                <el-link type="primary" href="">更换手机</el-link> 
                            </div>
                           
                        </div>
                        
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
                                <el-link type="primary" href="">修改密码</el-link>                
                            </div>
                            
                        </div>

                        <el-divider></el-divider>

                        <div class="safe_item">
                            <div class="safe_item_title">
                                <div class="p">
                                    <van-icon name="clear" size="20" color="#efa957" class="icon" v-if="!ifo.qqFlag" />
                                    <van-icon name="checked" size="20" color="#42cb6c" class="icon"  v-if="ifo.qqFlag" />
                                    <span>绑定QQ号</span>
                                </div>
                            </div>
                            <div class="safe_item_warning" v-if="ifo.qqFlag">
                                <span>{{ ifo.qqNumber }}</span>
                            </div>
                            <div class="safe_item_warning" v-if="!ifo.qqFlag">
                                <span>未绑定QQ号</span>
                            </div>
                            <div class="safe_item_link">
                                <el-link type="primary" href="">绑定QQ</el-link>                  
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div v-if="!loginFlag"  class="warn">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>
            <!-- 好友消息 -->
            <el-tab-pane>
                <span slot="label"  @click="getFriendsMessage">
                    <el-badge :value="messageCount" class="item">
                        <i class="el-icon-message"></i> 好友消息
                    </el-badge>
                </span>

                <div v-if="loginFlag">
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

                <div v-if="!loginFlag"  class="warn">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>
            <!-- 管理好友 -->
            <el-tab-pane>
                <span slot="label"  @click="getFriends">
                    <van-icon name="friends-o" /> 好友管理
                </span>

                <div v-if="loginFlag">
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
                            <div  v-for="item in searchFriendResult" :key="item.email">
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
                    <div class="friendListBox">
                        <div v-for="item in friendsList" :key="item.friendEmail">
                            <div class="friendList">
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

                <div v-if="!loginFlag"  class="warn">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>            
            <!-- 发送私信 -->
            <el-tab-pane>
                <span slot="label"  @click="getFriends">
                    <van-icon name="friends-o" /> 发送私信
                </span>

                <div v-if="loginFlag">
                    <div class="sendMsgBox">
                        <div>
                            <span>发送私信</span>                      
                            <el-divider content-position="right">我的好友</el-divider>               
                        </div>
                        <div class="left_friend_list">                    
                            <div v-for="item in friendsList" :key="item.friendEmail" @click="sendMsgReceiver( item.friendNickName,item.friendEmail )">
                                <div class="friendList_sendMsg">
                                    <span>{{ item.friendNickName }}</span>
                                    <p>{{ item.friendEmail }}</p>
                                    <el-divider></el-divider>
                                </div>                                                                
                            </div>
                        </div>
                        <div class="rigth_send_msg">
                            <p>发送给：{{ msgReceiverNickname }} {{ msgReceiverEmail }}</p>
                        </div>  
                    </div>
                    
                     
                </div>

                <div v-if="!loginFlag"  class="warn">
                    <h1>请先登录</h1>
                </div>
            </el-tab-pane>             
        </el-tabs>
    </div>
</template>


<script>
//导入头像组件
import avatar from './avatar.vue'
 
 

export default {
    data(){
        return{
            //发送消息给好友
            msgReceiverNickname:'',
            msgReceiverEmail:'',
            //好友消息
            friendsMessage:[],
            //消息数量
            messageCount:'',
            //添加好友搜索框
            searchFriendInput:'',
            //添加好友搜索结果
            searchFriendResult:[],
            // 账户安全数据
            ifo:{
                safeNum:'',
                telephoneFlag:false,
                telephone:'',              
                qqFlag:false,
                qqNumber:'',     
            },
            //好友列表
            friendsList:[],
            //当前用户
            currentUser:'',
            //是否登录标志
            loginFlag:false,
            //出生日期
            birth:'',
            //email
            email:'',
            //性别
            gender:'',
            //用户ID
            userId:'',
            //绑定手机号
            telephone:'',
            //用户等级
            level:'',
            //个性签名
            sign:'',
            //头像
            avatar:'',
            result:{},
            //更改用户信息表单
            ruleForm: {
                nickName: '',
                telephone: '',
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
                telephone:[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min:11,  message: '11 个数字', trigger: 'blur' }   
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
    created(){
       
        
    },
    mounted(){
        //数据加载时发送请求，得到当前用户的个人信息
        this.getLoginUser();     
    },
    //在这里注册组件
    components:{
        avatar,           
    },
    methods:{
        //修改用户信息方法
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //发送数据到后台
                    this.$http.post('http://localhost:8000/updateUserInfo',{email:this.email,update:this.ruleForm, credentials: true }).then(function(result){
                        if(result.body.code==200){
                            this.$message({
                                message: '修改信息成功',
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();                         
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
        //获取当前用户信息
        getLoginUser(){
             //请求登录session，用于持久化登录状态
            this.$http.get('http://localhost:8000/getLoginUserInfo',{ credentials: true }).then(function(result){
                if(result.body[0]){
                    this.result= result.body[0];                                                                        
                    this.currentUser = this.result.nickName;
                    this.birth = this.result.birthday;
                    this.email = this.result.email;
                    this.gender = this.result.gender;
                    this.userId = this.result.id;
                    this.telephone =this.result.telephone;
                    this.level = this.result.level;
                    this.sign = this.result.sign;
                    this.avatar= this.result.avatar;               
                    this.loginFlag = true;           
                }         
            })
        },
        //获取当前用户的安全信息
        getSafeIfo(){
            if(this.email !== ''){
                this.$http.get("http://localhost:8000/getSafeIfo",{credentials: true}).then(function(result){
                    if(result.body[0]){
                        this.ifo.safeNum=result.body[0].safenum;
                        if(result.body[0].qq !== ''){
                            this.ifo.qqFlag=true;                   
                            this.ifo.qqNumber=result.body[0].qq;
                        }                 
                        if(result.body[0].telephone !== ''){
                            this.ifo.telephoneFlag=true;
                            this.ifo.telephone=result.body[0].telephone;
                        }
                    }   
                })
            }
             
        },      
        //调用message组件中的方法获取好友消息
        getFriendsMessage(){
            if(this.email !==''){
                this.$http.get("http://localhost:8000/getFriendsMessage" ,{ credentials: true}).then(function(result){                                 
                    this.friendsMessage = result.body;
                    if(result.body.length>0){
                        this.messageCount = result.body.length;
                    }else{
                        this.messageCount = '';
                    }
                    
                })
            }

        },
        //将消息设置为已读
        isRead(id){
            this.$http.post("http://localhost:8000/isRead" ,{id:id},{ credentials: true}).then(function(result){                   
                if(result.body.code == 200){
                    this.getFriendsMessage();
                }
            })            
        },
        //删除好友
        deleteFriend(email){                   
            this.$http.post("http://localhost:8000/deleteFriend",{delete:email},{ credentials: true}).then(function(result){    
                this.getFriends();               
            })              
        },
        //获取好友列表
        getFriends(){
            if(this.email !==''){
                this.$http.get("http://localhost:8000/getFriends" ,{ credentials: true}).then(function(result){                   
                    this.friendsList = result.body;
                }) 
            }         
        },
        //搜索好友
        searchFriend(){
            this.$http.post("http://localhost:8000/searchFriend" ,{search:this.searchFriendInput},{ credentials: true}).then(function(result){                   
                this.searchFriendResult = result.body;
            })
        },
        //添加好友
        addFriend(email,nickName){
            this.$http.post("http://localhost:8000/addFriend" ,{addEmail:email,addNickName:nickName},{ credentials: true}).then(function(result){                                 
                if(result.body.code==200){
                    this.$message({
                        message: '添加好友成功',
                        type: 'success'
                    });
                    this.searchFriendResult = [];
                    this.searchFriendInput = '';
                    this.getFriends();                         
                }     
            })
        },
        //获取要发送消息给的好友
        sendMsgReceiver(nickName,email){
            this.msgReceiverNickname = nickName;
            this.msgReceiverEmail = email;
        }

    }
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
.warn{
    margin: 0 auto;
    display: block;
    width: 300px;
    height:100px;
    text-align: center;
}
.header{
    width: 400px;
    height: 220px;
    margin: 0 auto;
    background: url('https://s1.hdslb.com/bfs/static/security/static/img/logo_normal.79d580e.png') no-repeat;
    position: relative;
}
.safe_item{
    height: 40px;
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
    width: 700px;
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
    width: 840px;
    overflow:auto;
}
.searchFriendBox{
    width: 840px;
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
    width: 240px;
    height: 700px;
    overflow: auto;
    cursor: pointer;
    float: right;
}
.rigth_send_msg{
    width: 600px;
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
    width: 840px;
    height: 800px;
    position: relative;
}
.friendList_sendMsg{
    width: 210px;
    height: 80px;
    float: left;
    padding-left: 30px;    
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
</style>
