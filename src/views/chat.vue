<template>
<div class="container m-auto">
    <el-tabs tab-position="left" style="height: 500px;" v-model="activeName">
        <el-tab-pane v-for="item in list" :key="item.userID" :name="item.userID" style="height: 425px;overflow:auto;padding:0 10px">
            <div slot="label" class="follow_item">
                <el-avatar shape="circle" :size="40" :src="item.avatar"/>
                <span>{{ item.nickName }}</span>
            </div>    
            <div v-for="i in cur" :key="i.index">
                <p class="time">{{i.time}}</p>
                <div v-if="i.from == 0" class="my">
                    <div class="mymsg"><p>{{i.msg}}</p></div>
                    <el-avatar shape="circle" :size="30" :src="$store.state.userIfo.avatar"/>                  
                </div>
                <div v-if="i.from == 1" class="friend">
                    <el-avatar shape="circle" :size="30" :src="item.avatar"/>
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
export default {
    data(){
        return {
            list:this.$store.state.friendsList,
            userID:this.$store.state.userIfo.userID,
            name:this.$store.state.userIfo.nickName,        
            input:'',
            activeName:'',
        }
    },
    computed:{
        cur:function(){
            let res = [];
            let msg = this.$store.state.totalMsg;
            for(let i = 0;i < msg.length;i++){
                if(msg[i].uid == this.activeName|| msg[i].toUid == this.activeName){
                    res.push(msg[i]);
                }
            }
            return res;
        }
    },
    mounted(){
        this.$store.commit('allRead');
        this.list[0] && (this.activeName = this.list[0].userID);
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
            this.$store.commit('addMsg',msg);
            this.$store.state.socket.emit('sendMsg',msg);
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