<template>
    <div class="content col-11" >
        <el-tabs tab-position="left" style="height: 1000px;"  type="border-card"  v-if="$store.state.loginFlag">

            <!-- 个人主页 -->
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-user"></i> 个人主页
                </span>
                <userIfo></userIfo>
            </el-tab-pane>

            <!-- 我的信息 -->
            <el-tab-pane>
                 <span slot="label">
                    <i class="el-icon-edit"></i> 编辑信息
                </span>
                <edit></edit>
            </el-tab-pane>

            <!-- 我的头像 -->
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-picture-outline-round"></i> 我的头像
                </span>
                <avatar></avatar>
            </el-tab-pane>

            <!-- 账号安全 -->
            <el-tab-pane>
                <span slot="label">
                    <i class="el-icon-lock"></i> 账号安全
                </span>
                <safe></safe>
            </el-tab-pane>

            <!-- 好友消息 -->
            <el-tab-pane>
                <span slot="label">
                    <el-badge :is-dot="Boolean($store.state.messageCount)">
                        <i class="el-icon-message"></i> 好友消息
                    </el-badge>
                </span>
                <readMessage></readMessage>
            </el-tab-pane>

            <!-- 发送私信 -->
            <el-tab-pane>
                <span slot="label">
                    <van-icon name="friends-o" /> 好友互动
                </span>
                <sendMessage></sendMessage>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>


<script>
import sendMessage from './sendMessage.vue'
import avatar from './avatar.vue'
import safe from './safe.vue'
import edit from './edit.vue'
import userIfo from './userIfo.vue'
import readMessage from './readMessage.vue'

export default {
    components:{
        avatar,
        edit,
        userIfo,
        readMessage,
        safe,
        sendMessage,
    },
}
</script>

<style scoped>
.content{
     height:1000px;
     margin:100px auto;
}
span>>>.el-badge__content.is-fixed{
    top:10px;
    right:2px;
}
</style>
