<template>
<div class="bg col-12">
    <div class="content col-11 m-auto">
        <div class="left_box col-9">
            <div class="main_box col-12">
                <div class="title_box">
                    <span>{{ photoDetails.title }}</span>
                    <span><i class="el-icon-warning-outline"></i>举报</span>
                </div>
                <div>
                    <el-tag size="mini" type="danger" effect="plain" >摄影扶持计划</el-tag>
                    <el-tag size="mini" type="info" v-for="(item,index) in tags" :key="index">{{ item }}</el-tag>
                </div>
                <div class="flex_box details">
                    <div class="flex_box">
                        <span>摄影·私服</span>
                        <span>上传时间:{{ photoDetails.time }}</span>
                    </div>
                    <div class="flex_box">
                        <span>浏览:{{ photoDetails.view }}</span>
                        <span>收藏:34</span>
                        <span>支持:{{ photoDetails.praise }}</span>
                    </div>
                </div>
                <hr/>
                <el-image v-for="item in previewList" :key="item"
                    style="min-width: 100%; height:auto;margin-bottom: 32px;cursor: zoom-in;"
                    :src="item" 
                    :preview-src-list="previewList">
                </el-image>
            </div>
            <div class="reply_box col-12">
                <el-tabs value="first">
                    <el-tab-pane label="按热度排序" name="first">
                        <div class="reply_input" v-if="$store.state.loginFlag">
                            <van-image width="48" height="48" class="avatar_reply" :src="$store.state.userIfo.avatar"/>
                            <el-input placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" v-model="input" clearable class="col-9" type="textarea" resize="none"></el-input>
                            <el-button type="primary" @click="addReply">发表评论</el-button>
                        </div>
                        <div class="reply_item col-12" v-for="(item) in reply" :key="item.photoReplyID">
                            <van-image width="48" height="48" class="avatar_reply" :src="item.avatar"/>
                            <div class="col-10 reply_details">
                                <p class="user_name">{{ item.nickName }}</p>
                                <p class="reply_content">{{ item.content }}</p>
                                <div class="ifo">
                                    <span>来自PC客户端</span>
                                    <span>{{ item.time }}</span>
                                    <span><i class="icon_praise" @click.once="addPhotoReplyPraise(item.photoReplyID,$event)"></i>{{ item.praise }}</span>
                                    <span><i class="icon_down" @click.once="addPhotoReplyDown(item.photoReplyID,$event)"></i>{{ item.down }}</span>
                                </div>
                            </div>
                        </div>
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="5"
                            layout="total,prev, pager, next, jumper"
                            :total="replyCount">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="按时间排序" name="second">
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="right_box col-3">
            <div class="author_ifo col-12">
                <van-image width="80" height="80" class="avatar" :src="photoDetails.avatar"/>
                <div class="author">
                    <span class="level">up {{ photoDetails.level }}</span>
                    <span class="name">{{ photoDetails.nickName }}</span>
                </div>
                <div class="btn" v-if="$store.state.loginFlag">
                    <el-button size="mini" type="danger" v-if="isMe" disabled>我</el-button>
                    <el-button size="mini" type="danger" v-if="!isFriend&&!isMe" @click="addFriend">关注</el-button>
                    <el-button size="mini" type="danger" v-if="isFriend" disabled>已关注</el-button>
                    <el-button size="mini" type="danger" plain @click="sendMsg">发消息</el-button>
                </div>
            </div>
            <div class="dashboard col-12">
                <div class="praise_box">
                    <span>点赞</span>
                    <i @click="praise($event)"></i>
                    <span class="praise">{{ photoDetails.praise }}</span>
                </div>
                <div class="other_box">
                    <span>收藏</span>
                    <i></i>
                </div>
            </div>
        </div>
    </div>
    <el-backtop></el-backtop>
</div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            input:'',
            currentPage:1,
            photoDetails:{},
            previewList:[],
            tags:[],
            reply:[],
            replyCount:0,
            isFriend:false,
            isMe:false,
        }
    },
    mounted(){
        this.addView();
        this.getPhotoDetails();
        this.getPhotoReply();
        this.getPhotoCount();
    },
    methods: {
        sendMsg(){
            if(this.isFriend){
                this.$router.push({ path:'/userPage'});
            }else if(this.isMe){
                this.$message({
                    message: '请不要自言自语！',
                });
            }else{
                this.$message({
                    message: '你和他/她还没有成为好友哦！',
                });
            }
        },
        addFriend(){
            this.$http.post("addFriend" ,{userID:this.$store.state.userIfo.userID,friendID:this.photoDetails.userID}).then( (result) =>{
                if(result.body.code==200){
                    this.$message({
                        message: '添加好友成功',
                        type: 'success'
                    });
                    this.getPhotoDetails();
                }
            })
        },
        isMyPhoto(){
            if(this.$store.state.userIfo.userID == this.photoDetails.userID){
                this.isMe = true;
            }
        },
        checkFriend(){
            this.$http.post('checkFriend',{userID:this.$store.state.userIfo.userID,friendID:this.photoDetails.userID}).then((result)=>{
                if(result.body.code == 200){
                    if(result.body.isFriend[0]['COUNT(*)'] == 1){
                        this.isFriend = true;
                    }
                }
            })
        },
        getPhotoDetails(){
            this.$http.post("getPhotoDetails",{ photoID:this.id }).then((result) =>{
                if(result.body.code == 200){
                    this.photoDetails = result.body.photoDetails[0];
                    if(this.$store.state.loginFlag == true){
                        this.checkFriend();
                        this.isMyPhoto();
                    }
                    if(this.photoDetails.photo !== null){
                        this.previewList = this.photoDetails.photo.split(';')
                    }
                    if(this.photoDetails.tags){
                        this.tags = this.photoDetails.tags.split(',');
                    }
                }
            })
        },
        getPhotoReply(){
            this.$http.post('getPhotoReply',{photoID:this.id,currentPage:this.currentPage}).then((result)=>{
                this.reply = result.body.photoReply;
            })
        },
        getPhotoCount(){
            this.$http.post('getPhotoCount',{photoID:this.id}).then((result)=>{
                this.replyCount = result.body.photoCount[0]['COUNT(*)'];
            })
        },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getPhotoReply();
        },
        praise(event){
            if(!event.target.classList.contains("gold")){
                this.$http.post('photoPraise',{photoID:this.id}).then((result)=>{
                    event.target.classList.add('gold');
                    this.photoDetails.praise++;
                })
            }else{
                this.$http.post('cancelPhotoPraise',{photoID:this.id}).then((result)=>{
                    event.target.classList.remove('gold');
                    this.photoDetails.praise--;
                })
            }
        },
        addView(){
            this.$http.post('addPhotoView',{photoID:this.id}).then((result)=>{
            })
        },
        addReply(){
            if(this.input!==''){
                this.$http.post('addPhotoReply',{photoID:this.id,userID:this.$store.state.userIfo.userID,time:new Date().toLocaleString(),content:this.input}).then((result)=>{
                    this.$message({
                        message:'评论成功',
                        type:'success'
                    });
                    this.getPhotoDetails();
                    this.getPhotoReply();
                    this.getPhotoCount();
                })
            }
        },
        addPhotoReplyPraise(photoReplyID,event){
            this.$http.post('photoReplyPraise',{photoReplyID:photoReplyID}).then((result)=>{
                event.target.classList.add('goldenPraise');
                this.getPhotoReply();
            })
        },
        addPhotoReplyDown(photoReplyID,event){
            this.$http.post('photoReplyDown',{photoReplyID:photoReplyID}).then((result)=>{
                event.target.classList.add('goldenDown');
                this.getPhotoReply();
            })
        }
    },
}
</script>

<style scoped>
.gold{
    background-position: 0em -40em !important;
}
.goldenPraise{
    background-position: -154px -89px !important;
}
.goldenDown{
    background-position: -153px -216px !important;
}
.main_box{
    background-color: #fff;
    border: 1px solid #e3e8ec;
    border-radius: 12px;
    min-height:300px;
    padding:30px;
}
.reply_box{
    background-color: #fff;
    border: 1px solid #e3e8ec;
    border-radius: 12px;
    min-height:300px;
    margin-top:20px;
    padding:30px;
}
.reply_input{
    height:65px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.reply_input button{
    height:54px;
    width:70px;
    padding:4px 15px;
    white-space: normal;
}
.avatar_reply{
    background-color: #f0f8ff;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin:0 25px 0 10px;
}
.title_box{
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
}
.title_box span:nth-child(1){
    margin: 0;
    margin-right: 10px;
    font-size: 16px;
    font-weight: 400;
    color: #666;
    display: inline-block;
    vertical-align: middle;
}
.title_box span:nth-child(2){
    font-size: 12px;
    vertical-align: middle;
    color: #b0b0b0;
    cursor: pointer;
}
.el-tag{
    border-radius: 25px;
    padding: 1px 14px;
    margin-left: 5px;
}
.flex_box{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    vertical-align: middle;
    color: #999;
    cursor: pointer;
}
.flex_box span{
    margin: 0 15px 0 0;
}
.details{
    margin:25px 0 10px 0;
}
.bg{
    padding:30px 0;
    background-color: #f2f3f5;
}
.content{
    min-height:1000px;
    display:flex;
}
.left_box{
    min-height:1000px;
}
.right_box{
    height:341px;
    position:fixed;
    top:200px;
    right:20px;
}
.author_ifo{
    height: 183px;
    padding: 50px 0 0 0;
    margin-top: 40px;
    margin-bottom: 8px;
    background-color: #fff;
    border: 1px solid #e3e8ec;
    border-radius: 12px;
}
.author{
    text-align: center;
    width:100%;
    height:18px;
    display: flex;
    justify-content: center;
}
.level{
    color: #61c05a;
    border-color: #61c05a;
    width: 40px;
    height: 18px;
    border-radius: 2px;
    border: 1px solid;
    display: inline-block;
    box-sizing: border-box;
    line-height: 14px;
    text-align: center;
    vertical-align: middle;
    font-style: normal;
    font-size: 12px;
    font-weight: normal;
    margin-right:5px;
}
.name{
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    color: #666;
    word-break: keep-all;
    white-space: nowrap;
}
.btn{
    display: flex;
    justify-content: center;
    margin-top:40px;
}
.btn>button{
    width:72px;
}
.btn>button:nth-child(1){
    background-color: #fb7299;
}
.btn>button:nth-child(2):hover{
    background-color: #fb7299;
}
.avatar{
    position:absolute;
    top: -40px;
    left: 50%;
    margin-left: -40px;
    background-color: #f0f8ff;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right:10px;
}
.dashboard{
    height: 70px;
    background-color: #fff;
    border: 1px solid #e3e8ec;
    border-radius: 12px;
    padding: 18px 24px;
    box-sizing: border-box;
    display: flex;
}
.dashboard span{
    font-size: 14px;
    vertical-align: middle;
    margin-left: 10px;
    margin-right: 10px;
}
.praise{
    color: #ff8e29;
}
.other_box{
    width:100px;
    height:32px;
    padding-left: 5px;
}
.other_box i{
    display: inline-block;
    cursor: pointer;
    font-size: 32px;
    color: #9a9999;
    background-position: 0em -1em;
    width: 1em;
    height: 1em;
    vertical-align: middle;
    background-image: url(https://s1.hdslb.com/bfs/static/blive/blfe-album-detail/static/assets/svg-sprite.e15d8c310a8b0ec9fc61ec24d605fed4.svg);
    background-repeat: no-repeat;
    background-size: 1em 116em;
}
.other_box i:hover{
    background-position: 0em -13em;
}
.praise_box{
    width:130px;
    height:32px;
    border-right: 1px solid #e0dede;
}
.praise_box i{
    display: inline-block;
    font-size: 32px;
    color: #9a9999;
    background-position: 0em -37em;
    width: 1em;
    height: 1em;
    vertical-align: middle;
    background-image: url(https://s1.hdslb.com/bfs/static/blive/blfe-album-detail/static/assets/svg-sprite.e15d8c310a8b0ec9fc61ec24d605fed4.svg);
    background-repeat: no-repeat;
    background-size: 1em 116em;
}
.praise_box i:hover{
    background-position: 0em -41em;
}
.reply_item{
    height:110px;
    display:flex;
    padding: 0;
    align-items: center;
}
.reply_details{
    height:110px;
    padding: 22px 0 14px;
    border-top: 1px solid #e5e9ef;
}
.user_name{
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    word-wrap: break-word;
    margin:0;
}
.reply_content{
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
    margin:0;
}
.ifo{
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.ifo span{
    margin-right: 20px;
}
.icon_praise{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background: url(https://static.hdslb.com/phoenix/dist/images/icons-comment.png) no-repeat;
    background-position: -153px -25px;
    cursor: pointer;
}
.icon_down{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background: url(https://static.hdslb.com/phoenix/dist/images/icons-comment.png) no-repeat;
    background-position: -153px -153px;
    cursor: pointer;
}
</style>
