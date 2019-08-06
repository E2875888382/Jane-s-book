<template>
    <div class="container col-10">
        <div class="col-12 bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path:'/street' }">步行街</el-breadcrumb-item>
                <el-breadcrumb-item>步行街主干道</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="topic-box col-12">
            <div>
                <span>{{ streetDetails.topic }}</span>
                <span>{{ streetDetails.replyCount }}回复</span>
                <span>{{ streetDetails.view }}浏览</span>
            </div>
            <el-button icon="el-icon-star-off" circle v-if="!isCollection" @click="streetCollection"></el-button>
            <el-button icon="el-icon-star-on" circle style="background:gold" v-if="isCollection"></el-button>
        </div>
        <div class="col-12 main">
            <van-image width="50" height="50" class="avatar" :src="streetDetails.avatar"/>
            <div>
                <div class="top_box">
                    <a href="#">{{ streetDetails.nickName }}</a>
                    <span class="level">（{{ streetDetails.level }}级）</span>
                    <el-tag type="info" effect="dark" size="mini">楼主</el-tag>
                    <span class="time">{{ streetDetails.time }}</span>
                    <span class="floor">楼主</span>
                </div>
                <p class="subtopic">{{ streetDetails.topic }}<span> 由 {{ streetDetails.nickName }} 发表在虎扑步行街·步行街主干道</span></p>
                <p class="text">{{ streetDetails.content }}</p>
                <el-image v-if="streetDetails.img" style="width: 500px; height: 300px" :src="streetDetails.img" fit="fill"></el-image>
                <p class="from">发自虎扑iPhone客户端</p>
            </div>
        </div>
        <div class="reply col-12" v-for="(item,index) in streetReply" :key="item.streetReplyID">
            <van-image width="50" height="50" class="avatar" :src="item.avatar"/>
            <div>
                <div class="top_box">
                    <a href="#">{{ item.nickName }}</a>
                    <span class="level">（{{ item.level }}级）</span>
                    <span class="time">{{ item.time }}</span>
                    <span class="light" @click.once="addStreetReplyPraise(item.streetReplyID,$event)">亮了({{ item.praise }})</span>
                    <span class="floor">{{ index + 1 }}楼</span>
                </div>
                <p class="text">{{ item.content }}</p>
                <p class="from">虎扑PC客户端</p>
            </div>
        </div>
        <div class="col-12 add-reply" v-if="$store.state.loginFlag">
            <van-image width="50" height="50" class="avatar" :src="$store.state.userIfo.avatar"/>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm col-11">
                <el-form-item prop="reply_content">
                    <el-input type="textarea" v-model="ruleForm.reply_content" :rows="5" resize="none"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">回复</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isCollection:false,
            id:this.$route.params.id,
            streetDetails:[],
            streetReply:[],
            ruleForm:{
                reply_content:''
            },
            rules:{
                reply_content: [
                    { required: true, message: '请填写回复内容', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        this.addStreetView();
        this.getStreetDetails();
        this.getStreetReply();
    },
    methods:{
        checkStreetCollection(){
            if(this.$store.state.loginFlag){
                this.$http.post("checkStreetCollection" ,{userID:this.$store.state.userIfo.userID,streetID:this.id}).then( (result) =>{
                    if(result.body.code==200){
                        if(result.body.isCollection[0]["COUNT(*)"] > 0){
                            this.isCollection = true;
                        }
                    }
                })
            }
        },
        streetCollection(){
            if(this.$store.state.loginFlag){
                this.$http.post("streetCollection" ,{userID:this.$store.state.userIfo.userID,streetID:this.id,time:new Date().toLocaleString()}).then( (result) =>{
                    if(result.body.code==200){
                        this.$message({
                            message: '添加收藏成功',
                            type: 'success'
                        });
                        this.checkStreetCollection();
                    }
                })
            }
        },

        //增加帖子浏览量
        addStreetView(){
            this.$http.post("addStreetView",{ streetID:this.id }).then((result) =>{

            },(error) =>{
                console.log(error);
            })
        },
        // 增加回复量
        addStreetReply(){
            this.$http.post("addStreetReply",{ streetID:this.id }).then((result) =>{

            },(error) =>{
                console.log(error);
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var newReply = {
                        streetID:parseInt(this.id),
                        content:this.ruleForm.reply_content,
                        time:new Date().toLocaleString(),
                        userID:this.$store.state.userIfo.userID
                    }
                    this.$http.post('addReply',{ newReply:newReply }).then((result)=>{
                        if(result.body.code == 200){
                            this.getStreetReply();
                            this.addStreetReply();
                            this.getStreetDetails();
                            this.$message({
                                message: '回复成功',
                                type: 'success'
                            });
                        }
                    })
                } else {
                    this.$message.error('服务器错误，请稍后再试');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getStreetDetails(){
            this.$http.post('getStreetDetails',{ streetID:this.id }).then((result)=>{
                if(result.body.code == 200){
                    this.streetDetails = result.body.streetDetails[0];
                    this.checkStreetCollection();
                }
            })
        },
        getStreetReply(){
            this.$http.post('getStreetReply',{ streetID:this.id }).then((result)=>{
                if(result.body.code == 200){
                    this.streetReply = result.body.streetReply;
                }
            })
        },
        addStreetReplyPraise(streetReplyID,event){
            this.$http.post('streetReplyPraise',{ streetReplyID:streetReplyID }).then((result)=>{
                if(result.body.code == 200){
                    event.target.classList.add('gold');
                    this.getStreetReply();
                }
            })

        }
    }
}
</script>

<style scoped>
.gold{
    background-position: -8px -545px !important;
}
.container{
    margin-top:40px;
    margin-bottom: 40px;
    border:1px solid #ccc;
    min-height:1000px;
}
.bread{
    height:30px;
    display: flex;
    align-items: center;
}
.topic-box{
    height:40px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}
.topic-box div span:nth-child(1){
    font-size:18px;
    line-height: 40px;
    font-weight:600;
}
.topic-box div span:nth-child(2),.topic-box  div span:nth-child(3){
    display: inline-block;
    font-size:12px;
    line-height: 40px;
    color:#999;
    text-align: center;
    margin: 0 10px;
}
.top_box{
    height:25px;
    border-bottom: 1px dotted #DDD;
}
.top_box a{
    font-size:12px;
    line-height: 25px;
}
.main,.reply{
    min-height: 240px;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    display: grid;
    grid-template-columns:10% 90%;
    grid-template-rows:1fr;
    margin-bottom: 20px;
    background-color: #f1f1f1;
}
.light{
    background: url(https://b3.hoopchina.com.cn/images/img_icon_07.gif?t=2015090901) -8px -523px no-repeat;
    padding-left: 16px;
    font-size:12px;
    line-height: 25px;
}
.floor{
    float: right;
    font-size:12px;
    line-height: 25px;
}
.level{
    font-size:12px;
    line-height: 25px;
}
.time{
    font-size:12px;
    line-height: 25px;
    color:#999;
}
.subtopic{
    font-size:14px;
    line-height:22px;
    margin: 10px 0;
}
.subtopic>span{
    color:#999;
}
.from{
    font-size:12px;
    color:#999;
}
.text{
    font-size:14px;
    line-height:1.6;
    margin: 10px 0;
}
.avatar{
    margin: 10px 0 0 10px;
}
.add-reply{
    height:200px;
    display:flex;
}
</style>
