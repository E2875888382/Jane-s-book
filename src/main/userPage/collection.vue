<template>
<div class="col-12">
    <el-tabs v-model="activeName">

        <el-tab-pane label="相簿" name="first">
            <el-popover v-for="(item,index) in $store.state.photoCollection" :key="index" width="200" trigger="hover">
                <p class="title">{{ item.title }}</p>
                <p class="time">收藏时间：{{ item.time }}</p>
                <div style="display:flex;justify-content:center">
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="unlikePhoto(item.photoID)"></el-button>
                </div>
                <router-link :to="'/photoDetails/'+item.photoID" slot="reference">
                    <el-image :src="item.src" fit="cover" class="item">
                    </el-image>
                </router-link>
            </el-popover>
        </el-tab-pane>

        <el-tab-pane label="步行街" name="second">
            <el-collapse accordion>
                <el-collapse-item v-for="item in $store.state.streetCollection" :key="item.streetID" :name="item.streetID">
                    <router-link slot="title" :to="'/streetDetails/'+item.streetID">{{ item.topic }}</router-link>
                    <div class="streetDetails">
                        <span>收藏时间：{{ item.time }}</span>
                        <div>
                            <el-button type="danger" icon="el-icon-delete" size="mini"  @click="unlikeStreet(item.streetID)"></el-button>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>

        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    data(){
        return {
            activeName: 'first',
        }
    },
    methods:{
        // 取消收藏相簿
        unlikePhoto(photoID){
            this.get('unlikePhoto',{photoID:photoID}).then((result)=>{
                if(result.data.code == 200){
                    this.$message({
                        message: '取消收藏成功',
                        type: 'success'
                    });
                    this.getPhotoCollection();// 重新获取收藏相簿列表
                }
            })
        },
        // 取消收藏帖子
        unlikeStreet(streetID){
            this.get('unlikeStreet',{streetID:streetID}).then((result)=>{
                if(result.data.code == 200){
                    this.$message({
                        message: '取消收藏成功',
                        type: 'success'
                    });
                    this.getStreetCollection();// 重新获取收藏帖子列表
                }
            })
        },
    }
}
</script>

<style scoped>
#pane-first{
    display:flex ;
    flex-wrap:wrap;
    overflow: auto;
    align-content:flex-start ;
    height:900px;
}
#pane-first::-webkit-scrollbar{
    display: none;
}
.item{
    width:180px;
    height:220px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 10px;
    margin: 20px 0 20px 42px;
}
.title{
    font-size:14px;
    margin:0;
    text-align: center;
    line-height:1.5;
}
.time{
    font-size:12px;
    margin:0;
    text-align: center;
    line-height:1.5;
    color:#999;
    margin-bottom: 10px;
}
.streetDetails {
    display:flex;
    justify-content:space-between;
}
.streetDetails span{
    color: #999;
}
</style>
