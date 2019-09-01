<template>
<div class="bg col-12">
    <div class="content col-11 m-auto">
        <div class="left_box col-9">
            <div class="main_box col-12">
                <div class="title_box">
                    <span>{{ photoDetails.title }}</span>
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
                    <el-button size="mini" type="danger" v-if="!isFollowed&&!isMe" @click="followed">关注</el-button>
                    <el-button size="mini" type="danger" v-if="isFollowed" disabled>已关注</el-button>
                    <el-button size="mini" type="danger" plain @click="sendMsg">发消息</el-button>
                </div>
            </div>
            <div class="dashboard col-12">
                <div class="praise_box">
                    <span>点赞</span>
                    <i @click="praise($event)"></i>
                    <span class="praise">{{ photoDetails.praise }}</span>
                </div>
                <div class="other_box" v-if="$store.state.loginFlag">
                    <span v-if="!isCollected">收藏</span>
                    <span v-if="isCollected">已收藏</span>
                    <i @click="photoCollection" v-if="!isCollected"></i>
                    <i class="goldCollection" v-if="isCollected"></i>
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
            photoDetails:{},// 相簿详细信息
            previewList:[],// 图片预览
            tags:[],// 标签
            isFollowed:false,
            isCollected:false,
            isMe:false,
        }
    },
    mounted(){
        this.getPhotoDetails();
    },
    methods: {
        // 查询详情
        getPhotoDetails(){
            this.jsp("photoDetail",{ photoID:this.id }).then((result) =>{
                this.photoDetails = result[0];
                if(this.$store.state.loginFlag){// 如果已经登录，检查各种状态
                    this.statusCheck();
                }
                if(this.photoDetails.photo !== null){// 如果相簿不为空，根据标志符分割图片数组，因为数据库存放的是几个图片组合的字符串，彼此用一个标志符分割
                    this.previewList = this.photoDetails.photo.split('@')
                }
                if(this.photoDetails.tags){// 如果标签不为空，分割标签数组
                    this.tags = this.photoDetails.tags.split(',');
                }
            })
        },
        // 检查状态
        statusCheck(){
            let author = this.photoDetails.userID;
            let photoCollection = this.$store.state.photoCollection;
            let friend = this.$store.state.friendsList;
            photoCollection.forEach(e=>{
                if(e.photoID == this.id){
                   this.isCollected = true;
                }
            });
            friend.forEach(e=>{
                if(e.userID == author){
                    this.isFollowed = true;
                }
            })
            if(author == this.$store.state.userIfo.userID){
                this.isMe = true;
                this.isFollowed = false;
            }
        },
        // 发送信息
        sendMsg(){
            if(this.isFollowed){
                this.$router.push({ path:'/follow'});
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
        // 关注作者
        followed(){
            let author = this.photoDetails.userID;
            this.follow(author);
            this.isFollowed = true;
        },
        // 点赞
        praise(event){
            if(!event.target.classList.contains("gold")){
                this.get('photoPraise',{photoID:this.id}).then((result)=>{
                    event.target.classList.add('gold');
                    this.photoDetails.praise++;
                })
            }else{
                this.get('cancelPhotoPraise',{photoID:this.id}).then((result)=>{
                    event.target.classList.remove('gold');
                    this.photoDetails.praise--;
                })
            }
        },
        // 收藏
        photoCollection(){
            this.collectPhoto(this.id);
            this.$message({
                message: '添加收藏成功',
                type: 'success'
            });
            this.isCollected = true;
        },
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
    margin-top:58px;
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
    top:120px;
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
.user_name{
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    word-wrap: break-word;
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
</style>
