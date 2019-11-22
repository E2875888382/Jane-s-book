<template>
<div class="container m-auto">
	<div class="aside">
		<div v-for="item in list" :key="item.title">
			<router-link :to="item.link">
				<div class="icon">
					<i class="iconfont" v-html="item.icon"></i>
				</div>
				<span>{{item.title}}</span>
			</router-link>
		</div>
	</div>
	<div class="content">
		<router-view></router-view>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			list:[
				{
					title:'文章',
					icon:'&#xe681;',
					link:'/search/article'
				},
				{
					title:'新闻',
					icon:'&#xe67b;',
					link:'/search/news'
				},
				{
					title:'相册',
					icon:'&#xe607;',
					link:'/search/photo'
				},
				{
					title:'用户',
					icon:'&#xe7e9;',
					link:'/search/user'
				}
			]
		}
	}
}
</script>

<style scoped>
.container{
	margin-top:58px !important;
	width:960px;
	min-height:800px;
	padding:30px 0;
}
.aside{
	position:fixed;
	width:280px;
	height:400px;
	top: 86px;
	overflow: auto;
}
.aside>div{
	padding:10px 15px;
	height:52px;
}
.aside>div:hover{
	background-color: #f0f0f0;
}
.aside>div a{
	display: flex;
	align-items: center;
	text-decoration: none;
}
.aside span{
	font-size: 15px;
	cursor: pointer;
	color: #333;
}
.icon{
	margin-right: 15px;
	width: 32px;
	height: 32px;
	color: #fff;
	background-color: #a0a0a0;
	border-radius: 4px;
	font-size:18px;
	display:flex;
	align-items: center;
	justify-content: center;
}
.content{
	float:right;
	width:625px;
	margin-right:15px;
	min-height:500px;
	margin-top:20px;
}
</style>