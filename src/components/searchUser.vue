<template>
<div>
	<div class="top">
		<span>综合排序</span>
		<span>{{user.length}} 个结果</span>
	</div>
	<div class="user_item" v-for="item in check()" :key="item.userID">
		<div class="main">
			<div>
				<el-avatar shape="circle" :size="52" :src="item.avatar" style="margin-right:10px;"/>
				<div>
					<div class="name" v-html="highLight(item.nickName)"></div>
					<p class="sign">{{item.sign}}</p>
				</div>
			</div>
			<div v-if="$store.state.loginFlag">
				<el-button v-if="!item.isFollowed" type="success" round size="large" icon="el-icon-plus" @click="followed(item)">关注</el-button>
				<el-button v-if="item.isFollowed"  type="primary" disabled round size="large">已关注</el-button>
			</div>
		</div>
		<hr>
	</div>
</div>
</template>

<script>
import user from '../api/user.js'
export default {
	data(){
		return {
			user:this.$store.state.result.user,
		}
	},
	methods:{
		// 区分已经关注，和没有关注的用户
		check(){
			this.user.forEach(item=>{
				if(this.$store.state.loginFlag){
					let friend = this.$store.state.friendsList;
					friend.forEach(e=>{
						if(e.userID == item.userID){
							Object.assign(item,{
								isFollowed:true,
							})
						}
					})
				}
			})
			return this.user;
		},
		highLight:function(value){
			let search = this.$store.state.search;
			value = value.split(search).join(`<em style="color:#ea6f5a;font-style:normal">${search}</em>`)
			return value;
		},
		followed(item){
			user.follow(item.userID,true).then(()=>{
				this.$store.dispatch('userIfo');
			})
			Object.assign(item,{
				isFollowed:true,
			})
		}
	},
}
</script>

<style scoped>
.top{
	width:625px;
	display:flex;
	justify-content: space-between;
	align-items:center;
	height:40px;
	padding-bottom: 20px;
	color:#969696;
	font-size: 13px;
}
.main,.main>div{
	height: 57px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.name{
	font-size: 15px;
	font-weight: 700;
	color: #333;
}
.sign{
	font-size: 12px;
	color: #969696;
	font-weight:530;
	width:440px;
	height:20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin:0;
}
</style>