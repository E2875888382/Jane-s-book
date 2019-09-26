<template>
<div class="container m-auto">
    <el-tabs tab-position="left" style="height: 500px;" v-model="activeName">
        <el-tab-pane v-for="item in list" :key="item.userID" :name="item.userID" style="height: 425px;overflow:auto;padding:0 10px">
            <div slot="label" class="follow_item">
                <van-image width="40" height="40" class="user_img" :src="item.avatar"/>
                <span>{{ item.nickName }}</span>
            </div>    
            <div v-for="i in cur" :key="i.index">
                <p class="time">{{i.time}}</p>
                <div v-if="i.from == 0" class="my">
                    <div class="mymsg"><p>{{i.msg}}</p></div>
                    <van-image width="30" height="30" class="user_img" :src="$store.state.userIfo.avatar"/>                  
                </div>
                <div v-if="i.from == 1" class="friend">
                    <van-image width="30" height="30" class="user_img" :src="item.avatar"/>
                    <div class="friendmsg"><p>{{i.msg}}</p></div>
                </div>
            </div>
        </el-tab-pane>
        <div class="input_box">
            <el-input type="textarea" :rows="3" v-model="input" class="input" resize="none" :autofocus="true"></el-input>
            <el-button type="primary" @click="send">发送</el-button>
        </div> 
    </el-tabs>
</div>
</template>

<script>
import io from '../../node_modules/socket.io-client'
export default {
    data(){
        return {
            list:this.$store.state.friendsList,
            userID:this.$store.state.userIfo.userID,
            name:this.$store.state.userIfo.nickName,        
            input:'',
            totalMsg:[],
            socket:null,
            activeName:'',
        }
    },
    computed:{
        cur:function(){
            let res = [];
            for(let i = 0;i < this.totalMsg.length;i++){
                if(this.totalMsg[i].uid == this.activeName|| this.totalMsg[i].toUid == this.activeName){
                    res.push(this.totalMsg[i]);
                }
            }
            return res;
        }
    },
    mounted(){
        this.socket = io('http://localhost:8000');
        this.socket.emit('login',{uid:this.userID,name:this.name});
        this.socket.on('getMsg', (data)=>{
            this.totalMsg.push({
                index:new Date().getTime(),
                time:new Date().toLocaleString(),
                from:1,
                uid:data.uid,
                toUid:data.toUid,
                msg:data.msg
            })
        });  
        this.socket.on('disconnect', function() { 
            console.log('Server socket has closed.'); 
        }); 
    },
    methods:{
        send(){
            let msg = {
                index:new Date().getTime(),
                time:new Date().toLocaleString(),
                from:0,
                uid:this.userID,
                toUid:this.activeName,
                msg:this.input
            };
            this.totalMsg.push(msg);
            this.socket.emit('sendMsg',msg);
        },
    }
}
</script>

<style scoped>
.container{
    width:960px;
    margin-top:58px !important;
    padding:30px 15px;
    min-height:550px;
}
.user_img{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
.container>>>.el-tabs__item{
    height:60px;
}
.follow_item{
    display:flex;
    align-items: center;
    height:60px;
    padding:10px 13px;
    width:180px;
}
.follow_item span{
    margin-left:5px;
    font-size:14px;
}
.my{
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
}
.friend{
    display: flex;
    margin: 10px 0;
}
p{  
    word-break:normal;
    white-space:pre-wrap;
    word-wrap:break-word;
    margin: 0;
    font-size: 14px;
}
.mymsg,.friendmsg{
    max-width: 400px;
    margin:0 20px;
    background-color: deepskyblue;
    border-radius: 10px;
    padding:10px;
    position:relative;  
}
.friendmsg{
    background-color: gainsboro;   
}
.mymsg:before{
    display:block;
    content:'';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid deepskyblue;
    border-right: 10px solid transparent;
    right:-20px;
}
.friendmsg:before{
    display:block;
    content:'';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid gainsboro;
    left:-20px;
}
.time{
    text-align:center;
    font-size:12px;
    color:#999;
}
.input_box{
    display: flex;
}
.input{
    width:625px;
    padding:0;
}
</style>