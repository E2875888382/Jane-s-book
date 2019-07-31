<template>
<div class="bg col-12">
    <div class="content col-11 m-auto">
        <div class="left_box col-9">
            <div class="main_box col-12">
                <div class="title_box">
                    <span>灰色制服</span>
                    <span><i class="el-icon-warning-outline"></i>举报</span>
                </div>
                <div>
                    <el-tag size="mini" type="danger" effect="plain" >摄影扶持计划</el-tag>
                </div>
                <div class="flex_box details">
                    <div class="flex_box">
                        <span>摄影·私服</span>
                        <span>上传时间:2017-12-04 12:52:26</span>
                    </div>
                    <div class="flex_box">
                        <span>浏览:8527</span>
                        <span>收藏:34</span>
                        <span>支持:66</span>
                    </div>
                </div>
                <hr/>
            </div>
            <div class="reply_box col-12"></div>
        </div>
        <div class="right_box col-3">
            <div class="author_ifo col-12">
                <van-image width="80" height="80" class="avatar" :src="$store.state.userIfo.avatar"/>
                <div class="author">
                    <span class="level">up 3</span>
                    <span class="name">鸡汁云树</span>
                </div>
                <div class="btn">
                    <el-button size="mini" type="danger">关注</el-button>
                    <el-button size="mini" type="danger" plain>发消息</el-button>
                </div>
            </div>
            <div class="dashboard col-12">
                <div class="praise_box">
                    <span>点赞</span>
                    <i></i>
                    <span class="praise">66</span>
                </div>
                <div class="other_box">
                    <span>收藏</span>
                    <i></i>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
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
</style>
