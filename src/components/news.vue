<template>
  <div>
  	<p class="ranking_head">
  		<span>24小时新闻</span>
  		<span class="change" @click="getTenNews"><i class="iconfont">&#xe63a;</i>换一批</span>
  	</p>
  	<p class="ranking_item" v-for="(item,index) in tenNews" :key="index">
  		<span :class="{ number:index<3 }">{{ index+1 }}</span>
  		<router-link :to="'/newsDetails/'+item.newID">{{ item.title }}</router-link>
  	</p>
  </div>
</template>

<script>
import news from '../api/news.js'
export default {
	data(){
		return {
			tenNews:[],
		}
	},
	mounted(){
		this.getTenNews();
	},
	methods:{
		getTenNews(){
			news.getNews().then(({data})=>{
				this.tenNews = data;
			})
		}
	}
}
</script>

<style scoped>
.change{
	display:flex;
	align-items: center;
	font-size:14px;
	color:#999;
	cursor: pointer;
}
.ranking_head{
	font-size: 18px;
	font-weight: 400;
	color: #1a2939;
	font-family: "Microsoft Yahei";
	display:flex;
	justify-content: space-between;
}
.ranking_item{
	width:280px;
	line-height: 20px;
	font-size: 12px;
	padding:3px;
	margin:0;
}
.ranking_item a{
	color: #989da2 !important;
	text-decoration-line: none;
}
.ranking_item span{
	font-style: italic;
	font-weight: 700;
	width:25px;
	display: inline-block;
}
.number{
	color: #ad0007;
}
</style>