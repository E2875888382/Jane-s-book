<template>
<div>
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
</template>

<script>
export default{
    methods:{
        //将消息设置为已读
        isRead(id){
            this.$http.post("isRead" ,{id:id},{ credentials: true}).then( (result) =>{
                if(result.body.code == 200){
                    this.getFriendsMessage();//设置为已读后刷新信息列表
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
    }
}
</script>

<style scoped>
.messageBox{
    height: 960px;
    overflow:auto;
}
.messageBox::-webkit-scrollbar{
    display:none;
}
.box-card{
    margin-bottom: 10px;
}
.sendTime{
    color: #999;
    font-size: 12px;
    line-height: 22px;
}
</style>