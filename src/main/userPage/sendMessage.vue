<template>
<div style="display:flex;height:800px">
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
        <el-input type="textarea" placeholder="请输入内容" v-model="receiver.textarea" maxlength="100" show-word-limit autofocus="true" resize="none" rows="10" class="col-12">
        </el-input>
        <div class="send_box">
            <el-button type="primary" round @click="sendMsg">发送</el-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            receiver:{//发送私信
                nickName:'',//接受者昵称
                receiverID:'',//接受者userID
                textarea:'',//私信内容
            },
            searchFriendInput:'',//添加好友搜索框
            searchFriendResult:[],//添加好友搜索结果
        }
    },
    methods:{
        //删除好友
        deleteFriend(friendID){
            this.post("deleteFriend",{friendID:friendID}).then( (result) =>{
                this.getFriends();//删除好友成功刷新好友列表
            })
        },
        //搜索好友
        searchFriend(){
            this.get("searchFriend" ,{search:this.searchFriendInput}).then( (result) =>{
                // 根据昵称查询会出现多人的情况，遍历每个对象，发送查询请求，查看是否已关注或者是自己
                // 给每个对象添加两个flag，表示是否已关注和是否是自己
                result.data.forEach(element => {
                    element.isMe = false;
                    element.isFriend = false;
                    if(this.$store.state.userIfo.userID == element.userID){
                        element.isMe = true;
                    }
                    this.post('checkFriend',{friendID:element.userID}).then((result)=>{
                        if(result.data.code == 200){
                            if(result.data.isFriend[0]['COUNT(*)'] == 1){
                                element.isFriend = true;
                            }
                        }
                    })
                });
                this.searchFriendResult = result.data;
            })
        },
        //添加好友
        addFriend(userID){
            this.post("addFriend" ,{friendID:userID}).then( (result) =>{
                if(result.data.code==200){
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
                this.post("sendMsg" ,{receiverID:this.receiver.receiverID,content:this.receiver.textarea,time:new Date().toLocaleString()}).then( (result) =>{
                    if(result.data.code==200){
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
.left_friend_list{
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