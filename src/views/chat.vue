<template>
<div class="container m-auto">
    <el-tabs tab-position="left" style="min-height: 1000px;">
        <el-tab-pane v-for="item in $store.state.friendsList" :key="item.userID">
            <div slot="label" class="follow_item">
                <van-image width="40" height="40" class="user_img" :src="item.avatar"/>
                <span>{{ item.nickName }}</span>
            </div>
            <div>       
                <input type="text" v-model="input">
                <button @click="send(Number(item.userID))">发送</button>
                <div v-for="item in his" :key="item.index" :class="{'my':item.from == 0,'friend':item.from == 1}">
                    <p>{{item.time}}</p>
                    <p>{{item.msg}}</p>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import io from '../../node_modules/socket.io-client'
export default {
    data(){
        return {
            userID:Number(this.$store.state.userIfo.userID),
            name:this.$store.state.userIfo.nickName,        
            toName:'',
            input:'',
            his:[],
            socket:null,
        }
    },
    mounted(){
        this.socket = io('http://localhost:8000');
        this.socket.emit('login',{uid:this.userID,name:this.name});
        this.socket.on('getMsg', (data)=>{
            this.his.push({
                index:new Date().getTime(),
                time:new Date().toLocaleString(),
                from:1,
                name:data.name,
                uid:data.uid,
                toName:data.toName,
                toUid:data.toUid,
                msg:data.msg
            })
        });  
        this.socket.on('disconnect', function() { 
            console.log('Server socket has closed.'); 
        }); 
    },
    methods:{
        send(id){
            let mymsg = {
                index:new Date().getTime(),
                time:new Date().toLocaleString(),
                from:0,
                uid:this.userID,
                toUid:id,
                msg:this.input
            }
            this.his.push(mymsg)
            this.socket.emit('sendMsg',mymsg);
        },
    }
}
</script>

<style scoped>
.container{
    width:960px;
    margin-top:58px !important;
    padding:30px 15px;
    min-height:1000px;
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
    width:200px;
}
.follow_item span{
    margin-left:5px;
    font-size:14px;
}
.my{
    color:red;
    text-align: right;
}
.friend{
    color:green;
    text-align: left;
}
</style>