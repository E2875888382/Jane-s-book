<template>
<div class="col-10 m-auto container">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>搜索</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs tab-position="right" style="height: 500px;padding-top:20px">
        <el-tab-pane label="步行街">
            <el-collapse accordion>
                <el-collapse-item :name="index" v-for="(item,index) in $store.state.searchStreet" :key="item.streetID">
                    <router-link slot="title" :to="'/streetDetails/'+item.streetID">{{item.topic}}</router-link>
                    <span class="streetAuthor">作者：{{item.nickName}}</span>
                    <span class="streetTime">发表时间：{{item.time}}</span>
                </el-collapse-item>
            </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="相簿">
            <el-popover v-for="(item,index) in $store.state.searchPhoto" :key="index" width="150" trigger="hover">
                <p class="photoTitle">标题：{{ item.title }}</p>
                <p class="photoAuthor">作者：{{ item.nickName }}</p>
                <router-link :to="'/photoDetails/'+item.photoID" slot="reference">
                    <el-image :src="item.src" fit="cover" class="cover"></el-image>
                </router-link>
            </el-popover>
        </el-tab-pane>
        <el-tab-pane label="用户">
            <el-table
                :data="$store.state.searchUser"
                style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="头像：">
                            <van-image width="32" height="32" class="user_img" :src="props.row.avatar"/>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <p>{{ props.row.gender }}</p>
                        </el-form-item>
                        <el-form-item label="出生日期：">
                            <p>{{ props.row.birthday }}</p>
                        </el-form-item>
                        <el-form-item label="等级：">
                            <p>{{ props.row.level }}</p>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                label="用户 ID"
                prop="userID">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                label="邮箱"
                prop="email">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                label="昵称"
                prop="nickName">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                :show-overflow-tooltip="true"
                label="个性签名"
                prop="sign">
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.container{
    height:600px;
    padding:40px 0 ;
}
.streetAuthor,.streetTime{
    font-size:12px;
    color:#999;
}
.cover{
    width:180px;
    height:220px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 10px;
    margin: 20px 0 20px 42px;
}
.photoAuthor,.photoTitle{
    margin:0;
    font-size:12px;
    color:#999;
    line-height:1.5;
}
.user_img{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}
</style>
