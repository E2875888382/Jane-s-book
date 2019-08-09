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
                <el-tabs v-model="activeName" @tab-click="handleClick"> 
                    <el-tab-pane label="按热度排序" name="first">
                        <div class="reply_input" v-if="$store.state.loginFlag">
                            <van-image width="48" height="48" class="avatar_reply" :src="$store.state.userIfo.avatar"/>
                            <el-input placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" v-model="input" clearable class="col-9" type="textarea" resize="none" maxlength="50" show-word-limit></el-input>
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
                                    <span><i class="icon_praise" @click.once="addPhotoReplyPraiseHot(item.photoReplyID,$event)"></i>{{ item.praise }}</span>
                                    <span><i class="icon_down" @click.once="addPhotoReplyDownHot(item.photoReplyID,$event)"></i>{{ item.down }}</span>
                                </div>
                            </div>
                        </div>
                        <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="5"
                            layout="total,prev, pager, next, jumper"
                            :total="replyCount">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="按时间排序" name="second">
                        <div class="reply_input" v-if="$store.state.loginFlag">
                            <van-image width="48" height="48" class="avatar_reply" :src="$store.state.userIfo.avatar"/>
                            <el-input placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" v-model="input" clearable class="col-9" type="textarea" resize="none" maxlength="50" show-word-limit></el-input>
                            <el-button type="primary" @click="addReply">发表评论</el-button>
                        </div>
                        <div class="reply_item col-12" v-for="(item) in replyByTime" :key="item.photoReplyID">
                            <van-image width="48" height="48" class="avatar_reply" :src="item.avatar"/>
                            <div class="col-10 reply_details">
                                <p class="user_name">{{ item.nickName }}</p>
                                <p class="reply_content">{{ item.content }}</p>
                                <div class="ifo">
                                    <span>来自PC客户端</span>
                                    <span>{{ item.time }}</span>
                                    <span><i class="icon_praise" @click.once="addPhotoReplyPraiseTime(item.photoReplyID,$event)"></i>{{ item.praise }}</span>
                                    <span><i class="icon_down" @click.once="addPhotoReplyDownTime(item.photoReplyID,$event)"></i>{{ item.down }}</span>
                                </div>
                            </div>
                        </div>
                        <el-pagination
                            background
                            @current-change="handleCurrentChangeByTime"
                            :current-page="currentPage"
                            :page-size="5"
                            layout="total,prev, pager, next, jumper"
                            :total="replyCount">
                        </el-pagination>
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
                    <span v-if="!isCollection">收藏</span>
                    <span v-if="isCollection">已收藏</span>
                    <i @click="photoCollection" v-if="!isCollection"></i>
                    <i v-if="isCollection" class="goldCollection"></i>
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
            id:this.$route.params.id,// 路由传过来的当前相簿的photoID
            input:'',// 评论输入框
            currentPage:1,// 当前评论页
            photoDetails:{},// 相簿详细信息
            previewList:[],// 图片预览
            tags:[],// 相簿标签
            reply:[],// 评论数组
            replyCount:0,// 评论数目，用于分页
            isFriend:false,// 当前作者是否是好友
            isMe:false,// 当前作者是否是用户
            isCollection:false,// 当前相簿是否已收藏
            replyByTime:[],// 按回复时间排序的评论数组
            activeName:'first',// tabs活动页参数
        }
    },
    mounted(){
        this.addView();// mounted阶段把当前的浏览量加1
        this.getPhotoDetails();// 获取相簿详情
        this.getPhotoReply();// 获取按点赞排序的评论
        this.getPhotoCount();// 获取评论数量
        this.getPhotoReplyByTime();// 获取按时间排序的评论
    },
    methods: {
        // tabs页切换时刷新评论
        handleClick(tab, event) {
            if(this.activeName == 'first'){
                this.getPhotoCount();
                this.getPhotoReply();
            }else{
                this.getPhotoCount();
                this.getPhotoReplyByTime();
            }
        },
        // 检查是否被收藏过
        checkPhotoCollection(){
            this.$http.post("checkPhotoCollection" ,{userID:this.$store.state.userIfo.userID,photoID:this.id}).then( (result) =>{
                if(result.body.code==200){
                    if(result.body.isCollection[0]["COUNT(*)"] > 0){
                        this.isCollection = true;
                    }
                }
            })
        },
        // 收藏当前相簿
        photoCollection(){
            if(this.$store.state.loginFlag){
                this.$http.post("photoCollection" ,{userID:this.$store.state.userIfo.userID,photoID:this.id,time:new Date().toLocaleString()}).then( (result) =>{
                    if(result.body.code==200){
                        this.$message({
                            message: '添加收藏成功',
                            type: 'success'
                        });
                        this.checkPhotoCollection();// 收藏完要更新是否已收藏，防止重复收藏
                    }
                })
            }
        },
        // 发送信息
        sendMsg(){
            // 如果已经是好友，跳转到用户页
            if(this.isFriend){
                this.$router.push({ path:'/userPage'});
            }else if(this.isMe){// 如果是自己，触发提示
                this.$message({
                    message: '请不要自言自语！',
                });
            }else{// 如果没有成为好友，无法发消息
                this.$message({
                    message: '你和他/她还没有成为好友哦！',
                });
            }
        },
        // 关注当前作者
        addFriend(){
            this.$http.post("addFriend" ,{userID:this.$store.state.userIfo.userID,friendID:this.photoDetails.userID}).then( (result) =>{
                if(result.body.code==200){
                    this.$message({
                        message: '添加好友成功',
                        type: 'success'
                    });
                    this.getPhotoDetails();// 添加好友后刷新状态
                }
            })
        },
        // 检查作者是否是自己
        isMyPhoto(){
            if(this.$store.state.userIfo.userID == this.photoDetails.userID){
                this.isMe = true;
            }
        },
        // 检查作者与用户是否为好友关系
        checkFriend(){
            this.$http.post('checkFriend',{userID:this.$store.state.userIfo.userID,friendID:this.photoDetails.userID}).then((result)=>{
                if(result.body.code == 200){
                    if(result.body.isFriend[0]['COUNT(*)'] == 1){
                        this.isFriend = true;
                    }
                }
            })
        },
        // 获取相簿详情
        getPhotoDetails(){
            this.$http.post("getPhotoDetails",{ photoID:this.id }).then((result) =>{
                if(result.body.code == 200){
                    this.photoDetails = result.body.photoDetails[0];
                    if(this.$store.state.loginFlag == true){// 如果已经登录，检查各种状态
                        this.checkFriend();
                        this.isMyPhoto();
                        this.checkPhotoCollection();
                    }
                    if(this.photoDetails.photo !== null){// 如果相簿不为空，根据标志符分割图片数组，因为数据库存放的是几个图片组合的字符串，彼此用一个标志符分割
                        this.previewList = this.photoDetails.photo.split('@')
                    }
                    if(this.photoDetails.tags){// 如果标签不为空，分割标签数组
                        this.tags = this.photoDetails.tags.split(',');
                    }
                }
            })
        },
        // 获取相簿按点赞排序的评论
        getPhotoReply(){
            this.$http.post('getPhotoReply',{photoID:this.id,currentPage:this.currentPage}).then((result)=>{

                result.body.photoReply.map(function(i){
                    i.flag = true;// 一开始把flag置为true，用于控制点赞和踩的行为
                })

                this.reply = result.body.photoReply;
            })
        },
        // 获取相簿按时间排序的评论
        getPhotoReplyByTime(){
            this.$http.post('getPhotoReplyByTime',{photoID:this.id,currentPage:this.currentPage}).then((result)=>{

                result.body.photoReplyByTime.map(function(i){
                    i.flag = true;
                })

                this.replyByTime = result.body.photoReplyByTime;
            })
        },
        // 获取评论数量
        getPhotoCount(){
            this.$http.post('getPhotoCount',{photoID:this.id}).then((result)=>{
                this.replyCount = result.body.photoCount[0]['COUNT(*)'];
            })
        },
        // 获取一组评论
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getPhotoReply();
        },
        // 获取一组评论
        handleCurrentChangeByTime(val) {
            this.currentPage = val;
            this.getPhotoReplyByTime();
        },
        // 点赞
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
        // 增加浏览量
        addView(){
            this.$http.post('addPhotoView',{photoID:this.id}).then((result)=>{
            })
        },
        // 增加回复量
        addReply(){
            if(this.input!==''){
                this.$http.post('addPhotoReply',{photoID:this.id,userID:this.$store.state.userIfo.userID,time:new Date().toLocaleString(),content:this.input}).then((result)=>{
                    this.$message({
                        message:'评论成功',
                        type:'success'
                    });
                    this.getPhotoDetails();
                    this.getPhotoReply();
                    this.getPhotoReplyByTime();
                    this.getPhotoCount();
                })
            }
        },
        // 增加评论的点赞量
        addPhotoReplyPraiseHot(photoReplyID,event){
            // 点赞之后控制无法点踩
            this.reply.forEach(element => {
                if(element.photoReplyID == photoReplyID){
                    if(!element.flag){
                        return;
                    }else{
                        event.target.classList.add('goldenPraise');
                        element.flag = false;
                        element.praise++;
                        this.$http.post('photoReplyPraise',{photoReplyID:photoReplyID}).then((result)=>{
                        })
                    }
                }
            });
        },
        // 增加评论的点赞量
        addPhotoReplyPraiseTime(photoReplyID,event){
            // 点赞之后控制无法点踩
            this.replyByTime.forEach(element => {
                if(element.photoReplyID == photoReplyID){
                    if(!element.flag){
                        return;
                    }else{
                        event.target.classList.add('goldenPraise');
                        element.flag = false;
                        element.praise++;
                        this.$http.post('photoReplyPraise',{photoReplyID:photoReplyID}).then((result)=>{
                        })
                    }
                }
            });
        },
        // 增加评论的踩
        addPhotoReplyDownHot(photoReplyID,event){
            this.reply.forEach(element => {
                if(element.photoReplyID == photoReplyID){
                    if(!element.flag){
                        return;
                    }else{
                        event.target.classList.add('goldenDown');
                        element.flag = false;
                        element.down++;
                        this.$http.post('photoReplyDown',{photoReplyID:photoReplyID}).then((result)=>{
                        })
                    }
                }
            });
        },
        // 增加评论的踩
        addPhotoReplyDownTime(photoReplyID,event){
            this.replyByTime.forEach(element => {
                if(element.photoReplyID == photoReplyID){
                    if(!element.flag){
                        return;
                    }else{
                        event.target.classList.add('goldenDown');
                        element.flag = false;
                        element.down++;
                        this.$http.post('photoReplyDown',{photoReplyID:photoReplyID}).then((result)=>{
                        })
                    }
                }
            });
        }
    },
}
</script>

<style scoped>
.goldCollection{
    background-position: 0em -12em !important;
}
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
    padding: 18px 20px;
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
    width:110px;
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
