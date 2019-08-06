<template>
<div class="col-12">
    <el-tabs v-model="activeName">
        <el-tab-pane label="相簿" name="first">
    
            <el-popover v-for="(item,index) in collection" :key="index" width="200" trigger="hover">
                <p class="title">{{ item.title }}</p>
                <p class="time">收藏时间：{{ item.time }}</p>
                <div style="display:flex;justify-content:center">
                    <el-button type="primary" icon="el-icon-view" size="mini" @click="details(item.photoID)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="unlike(item.photoID)"></el-button>
                </div>
                <el-image
                    :src="item.src"
                    fit="cover"
                    class="item"
                    slot="reference"
                    >
                </el-image>

            </el-popover>
        </el-tab-pane>


        <el-tab-pane label="步行街" name="second">
            <el-collapse accordion>
                <el-collapse-item v-for="item in streetCollection" :key="item.streetID" :title="item.topic" :name="item.streetID">
                    <div class="streetDetails">
                        <span>收藏时间：{{ item.time }}</span>
                        <div>
                            <el-button type="primary" icon="el-icon-view" size="mini"  @click="streetDetails(item.streetID)"></el-button>
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
            collection:[],
            streetCollection:[],
        }
    },
    mounted(){
        this.getPhotoCollection();
        this.getStreetCollection();
    },
    methods:{
        unlike(photoID){
            if(this.$store.state.loginFlag){
                this.$http.post('unlikePhoto',{userID:this.$store.state.userIfo.userID,photoID:photoID}).then((result)=>{
                    if(result.body.code == 200){
                        this.$message({
                            message: '取消收藏成功',
                            type: 'success'
                        });
                        this.getPhotoCollection();
                    }
                })
            }
        },
        unlikeStreet(streetID){
            if(this.$store.state.loginFlag){
                this.$http.post('unlikeStreet',{userID:this.$store.state.userIfo.userID,streetID:streetID}).then((result)=>{
                    if(result.body.code == 200){
                        this.$message({
                            message: '取消收藏成功',
                            type: 'success'
                        });
                        this.getStreetCollection();
                    }
                })
            }
        },
        details(photoID){
            let route = '/photoDetails/'+photoID;
            this.$router.push({ path:route});
        },
        streetDetails(streetID){
            let route = '/streetDetails/'+streetID;
            this.$router.push({ path:route });
        },
        getPhotoCollection(){
            if(this.$store.state.loginFlag){
                this.$http.post('getPhotoCollection',{userID:this.$store.state.userIfo.userID}).then((result)=>{
                    if(result.body.code == 200){
                        this.collection = result.body.photoCollection;
                    }
                })
            }
        },
        getStreetCollection(){
            if(this.$store.state.loginFlag){
                this.$http.post('getStreetCollection',{userID:this.$store.state.userIfo.userID}).then((result)=>{
                    if(result.body.code == 200){
                        this.streetCollection = result.body.streetCollection;
                    }
                })
            }
        }
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
