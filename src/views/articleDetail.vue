<template>
<div class="bg">
	<div class="oper">
		<div>
			<div class="like" v-if="!isPraised" @click="praised(true)"><i class="iconfont">&#xe60c;</i></div>
			<div class="like" v-if="isPraised" @click="praised(false)"><i class="iconfont" style="color:gold">&#xe60c;</i></div>
			<p>{{ detail.praise }}赞</p>
		</div>
		<div v-if="isLogin">
			<div class="col">
				<i class="iconfont" v-if="!isCollected" @click="collected">&#xe670;</i>
				<i class="iconfont" style="color:gold" v-if="isCollected">&#xe670;</i>
			</div>
		</div>
	</div>
	<div class="main">
		<div class="left">
			<div class="content">
				<h1 class="topic">{{ detail.title }}</h1>
				<p class="info">{{ detail.time }} 阅读{{ detail.view }} 评论{{ detail.replyCount }}</p>
				<div class="text markdown-body" v-html="detail.html"></div>
				<el-image v-if="detail.img" style="width:682px; height: 400px" :src="detail.img" fit="fill"></el-image>
			</div>
			<Comment v-if="isLogin" :article="current"></Comment>
			<div class="comment">
				<h3 class="comment_header">
					<span>全部评论 {{ comments.length }}</span>
					<div class="sort">
						<span @click="function(){sortBy(item.value);active = item.value}"
						v-for="item in sortOption"
						:key="item.value"
						:class="{'active':active == item.value}">
						{{item.name}}
						</span>
					</div>
				</h3>
				<div class="comment_item" v-for="item in currentComments" :key="item.replyID">
					<el-avatar shape="circle" :size="40" :src="item.avatar"/>
					<div class="comment_content">
						<p>{{ item.nickName }}</p>
						<p>{{ item.time | dateFormat }}天前</p>
						<p>{{ item.content }}</p>
						<div>
							<span v-if="!item.isPraised"><i class="iconfont" @click="reply(item,true)">&#xe60c;</i>赞{{ item.praise }}</span>
							<span v-if="item.isPraised"><i class="iconfont" style="color:gold" @click="reply(item,false)">&#xe60c;</i>赞{{ item.praise }}</span>
						</div>
					</div>
				</div>
				<div class="page">
					<el-pagination
					background
					prev-text="上一页"
					next-text="下一页"
					@current-change="onePage"
					layout="prev, pager, next"
					:total="comments.length">
					</el-pagination>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="author_info">
				<el-avatar shape="circle" :size="45" :src="detail.avatar"/>
				<div>
					<div class="author">
						{{ detail.nickName }}
						<el-button round size="mini" type="primary" v-if="(isLogin&&!isFollowed)&&!isMe" @click="followed">关注</el-button>
						<el-button round size="mini" type="success" v-if="(isLogin&&isFollowed)&&!isMe">已关注</el-button>
						<el-button round size="mini" type="info" v-if="isMe">我</el-button>
					</div>
					<p class="sign">{{ detail.sign }}</p>
				</div>
			</div>
		</div>
	</div>
	<el-backtop></el-backtop>
</div>
</template>

<script>
import Comment from '../components/articleComment.vue'
import user from '../api/user.js'
import article from '../api/article.js'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
export default {
	data(){
		return {
			sortOption:[
				{name:'按时间正序',value:'time'},
				{name:'按时间倒序',value:'timereverse'},
			],
			active:'time',
			comments:[],
			detail:{},
			currentComments:[],
			isFollowed:false,
			isCollected:false,
			isMe:false,
			isPraised:false,
			isLogin:false,
		}
	},
	components:{
		Comment
	},
	computed:{
		current:function(){
			return this.$route.params.articleId;
		}
	},
	activated(){
		this.load();
		this.isLogin = this.$store.state.loginFlag;
	},
	deactivated(){
		this.isFollowed = false;
		this.isCollected = false;
		this.isMe = false;
		this.isPraised = false;
	},
	methods:{
		sortBy(type){
			if(type == 'time'){
				this.comments.sort((a,b)=>{
					return new Date(b.time).getTime() - new Date(a.time).getTime();
				})
				this.onePage(1);
			}else{
				this.comments.sort((a,b)=>{
					return new Date(a.time).getTime() - new Date(b.time).getTime();
				})
				this.onePage(1);
			}
		},
		load(){
			article.detail(this.current).then(({ data:{ detail,comments } })=>{
				this.detail = detail[0];
				this.detail.html = this.detail.html.replace(/&amp;/g, "&");
				this.detail.html = this.detail.html.replace(/&lt;/g, "<");
				this.detail.html = this.detail.html.replace(/&gt;/g, ">");
				this.detail.html = this.detail.html.replace(/&nbsp;/g, " ");
				this.detail.html = this.detail.html.replace(/&#39;/g, "\'");
				this.detail.html = this.detail.html.replace(/&quot;/g, "\"");
				this.comments = comments;
				for(let value of this.comments){
					Object.assign(value,{
						isPraised:false,
					});
				}
				this.onePage(1);
				this.statusCheck();
				this.sortBy('time');
			}).catch((err)=>{
				console.log(err);
			})
		},
		onePage(page){
			this.currentComments = this.comments.slice((page-1)*10,page*10);
		},
		statusCheck(){
			let author = this.detail.userID;
			let {streetCollection,friendsList} = this.$store.state;
			streetCollection.forEach(e=>{
				if(e.articleID == this.current){
				   this.isCollected = true;
				}
			});
			friendsList.forEach(e=>{
				if(e.userID == author){
					this.isFollowed = true;
				}
			})
			if(author == this.$store.state.userIfo.userID){
				this.isMe = true;
				this.isFollowed = false;
			}
		},
		followed(){
			let author = this.detail.userID;
			user.follow(author,true).then(()=>{
				this.$store.dispatch('userIfo');
			})
			this.isFollowed = true;
		},
		collected(){
			user.collect(this.current,true).then(()=>{
				this.$store.dispatch('userIfo');
			})
			this.isCollected = true;
		},
		praised(status){
			article.praise(this.current,status);
			this.isPraised = status;
			if(status){
				this.detail.praise++;
			}else{
				this.detail.praise--;
			}      
		},
		reply(item,status){
			article.replyPraise(item.replyID,status);
			item.isPraised = status;
			if(status){
				item.praise++;
			}else{
				item.praise--;
			}          
		},
	},
	filters:{
		dateFormat:function(value){
			let time = new Date(value);
			let now = new Date();
			return Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
		}
	}
}
</script>

<style scoped>
.active,.sortBy span:hover{
	color:#ea6f5a;
	cursor: pointer;
}
.bg{
	margin-top:58px;
	min-height:1000px;
	background-color: #F7F7F7;
	display:flex;
	justify-content: center;
	padding-top:10px;
}
.main{
	width:1000px;
	display: flex;
}
.left{
	width:730px;
	margin:0 10px 24px 0;
}
.right{
	width:260px;
	background-color: #fff;
	border-radius: 4px;
	margin-bottom: 10px;
	box-shadow: 0 1px 3px rgba(26,26,26,.1);
	height:80px;
	padding:16px;
}
.content{
	background-color: #fff;
	border-radius: 4px;
	margin-bottom: 10px;
	box-shadow: 0 1px 3px rgba(26,26,26,.1);
	min-height:500px;
	width:730px;
	padding:24px;
}
.topic{
	font-size: 32px;
	font-weight: 700;
	word-break: break-word;
	color: #404040;
	margin-bottom: 16px;
}
.info{
	line-height:19px;
	margin-bottom:32px;
	color: #969696;
	font-size: 14px;
}
.text{
	margin-bottom: 20px;
	line-height: 1.7;
	font-size: 16px;
	word-break: break-word;
}
.comment{
	background-color: #fff;
	border-radius: 4px;
	margin-bottom: 10px;
	box-shadow: 0 1px 3px rgba(26,26,26,.1);
	min-height:400px;
	width:730px;
	padding:24px;
}
.author_info{
	height:45px;
	display:flex;
}
.author_info>div{
	width:175px;
	overflow: hidden;
}
.author{
	color: #2d2d2d;
	font-weight: 500;
	font-size: 14px;
	line-height:23px;
	width:175px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	height:23px;
	margin-bottom:5px;
	padding-left:10px;
	display:flex;
	align-items: center;
}
.author .el-button{
	height:20px;
	font-size:7px;
	padding:3px 10px; 
	margin-left:5px;
}
.sign{
	margin:0;
	height:17px;
	line-height:17px;
	color: #969696;
	font-size: 12px;
	white-space: nowrap;
	text-overflow: ellipsis;
	padding-left:10px;
}
.comment_header{
	height:25px;
	margin-bottom:16px;
	padding-left:12px;
	border-left:4px solid #ec7259;
	display:flex;
	justify-content: space-between;
	align-items: center;
}
.comment_header>span{
	font-size: 18px;
	font-weight: 500;
	color: #404040;
}
.sort{
	font-size:12px;
	color:#969696;
}
.comment_item{
	display: flex;
}
.comment_content{
	margin:0 0 20px 10px;
	border-bottom: 1px solid #e6e6e6;
	width:632px;
	min-height:122px;
}
.comment_content p:nth-child(1){
	height:19px;
	margin:0;
	font-size:14px;
	line-height:19px;
}
.comment_content p:nth-child(2){
	margin-top: 2px;
	font-size: 12px;
	color: #969696;
	margin-bottom:0;
}
.comment_content p:nth-child(3){
	margin-bottom:0;
	margin-top: 10px;
	font-size: 16px;
	line-height: 1.5;
	color: #404040;
}
.comment_content div{
	width:100%;
	margin-top:12px;
	height:21px;
	font-size:15px;
	color:#999;
}
.comment_content div span{
	display: flex;
	align-items: center;
}
.comment_content i {
	cursor: pointer;
	margin-right:5px;
}
.page{
	display: flex;
	justify-content: center;
}
.page>>>.number{
	border-radius: 50% !important;
	background-color: #fff !important;
	border: 1px solid #e6e6e6;
	font-weight: 400 !important;
}
.page>>>.active{
	background-color: #fff !important;
	border: 1px solid #ec7259 !important;
	color:#ec7259 !important;
}
.page>>>button{
	background-color: white !important;
	border-radius: 20px !important;
	border: 1px solid #e6e6e6;
	width:68px !important;
	font-weight: 400 !important;
}
.oper{
	position: fixed;
	top: 216px;
	left: calc((100vw - 1000px)/2 - 78px);
	height:136px;
	width:48px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}
.oper p{
	font-size: 14px;
	text-align: center;
	color: #999;
	line-height:19px;
	margin:5px 0;
}
.like,.col{
	width:48px;
	height:48px;
	font-size: 18px;
	border-radius: 50%;
	box-shadow: 0 1px 3px rgba(26,26,26,.1);
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}
</style>