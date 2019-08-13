<template>
<div>
    <div class="messageBox">
        <el-tabs value="first">
            <el-tab-pane :label="'未读消息('+$store.state.messageCount+')'" name="first">
                <el-table :data="$store.state.message" style="width: 100%" :default-sort = "{prop: 'time', order: 'descending'}" :cell-style="cellStyle">
                    <el-table-column label="消息内容" prop="content" min-width="500px" header-align="center"> </el-table-column>
                    <el-table-column label="时间" prop="time" sortable header-align="center" align="center"> </el-table-column>
                    <el-table-column prop="nickName" align="center"> </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" plain @click="isRead(scope.row.messageID)">标为已读</el-button>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="empty"> </div>
                </el-table>
            </el-tab-pane>
            <el-tab-pane :label="'未读消息('+$store.state.historyMessage.length+')'" name="second">
                <el-table :data="$store.state.historyMessage" style="width: 100%" :default-sort = "{prop: 'time', order: 'descending'}" :cell-style="cellStyle">
                    <el-table-column label="消息内容" prop="content" min-width="500px" header-align="center"> </el-table-column>
                    <el-table-column label="时间" prop="time" sortable header-align="center" align="center"> </el-table-column>
                    <el-table-column prop="nickName" align="center"> </el-table-column>
                    <div slot="empty" class="empty"> </div>
                </el-table>
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
            this.post("isRead" ,{id:id},{ credentials: true}).then( (result) =>{
                if(result.body.code == 200){
                    this.getFriendsMessage();
                    this.getHistoryMessage();//设置为已读后刷新信息列表
                }
            })
        },
        cellStyle({row, column, rowIndex, columnIndex}){
            if(columnIndex === 0){
                return {'font-size':'14px','text-indent':'2em' }
            }
            else if(columnIndex === 2){ //指定坐标
                return {'color':'#999','font-size':'12px'}
            }else if(columnIndex === 1){
                return {'color':'#999','font-size':'12px'}
            }
            else{
                return ''
            }
        }
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