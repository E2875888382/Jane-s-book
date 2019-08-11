<template>
<div>
    <div class="messageBox">
        <el-tabs value="first">
            <el-tab-pane label="未读消息" name="first">
                <el-table :data="$store.state.message" style="width: 100%">
                    <el-table-column prop="content" min-width="500px"> </el-table-column>
                    <el-table-column prop="time"> </el-table-column>
                    <el-table-column prop="nickName"> </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="isRead(scope.row.messageID)">标为已读</el-button>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="empty"> </div>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已读消息" name="second">

            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
export default{
    data(){
        return {

        }
    },
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
.empty{
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/space/asserts/nodata02.png);
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: #6d757a;
    content: "\6570\636E\4E3A\7A7A";
    display: block;
    font-size: 14px;
    height: 450px;
    overflow: hidden;
    line-height: 640px;
    text-align: center;
}
</style>