<template>
	<div class="container">
		<el-input v-model="title" maxlength="40" clearable>
			<el-button slot="append" @click="submit">发帖</el-button>
		</el-input>
		<mavon-editor 
			v-model="content" 
			ref="md"
			@change="change" 
			@save="save"
			:toolbars="toolbars"
			placeholder=" " 
			style="min-height: 600px"
		/>      
		<el-backtop></el-backtop>
	</div>
</template>

<script>
import article from '../api/article.js'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
	components: {
		mavonEditor,
	},
	data() {
	  return {
		toolbars: {
			imagelink: true, // 图片链接
			code: true, // code
			table: true, // 表格
			help: true, // 帮助
			undo: true, // 上一步
			redo: true, // 下一步
			trash: true, // 清空
			save: true, // 保存（触发events中的save事件）
			alignleft: true, // 左对齐
			aligncenter: true, // 居中
			alignright: true, // 右对齐
			subfield: true, // 单双栏模式
			preview: true, // 预览
		},
		content:'', // 输入的markdown
		html:'',    // 及时转的html
		title:'',
	  };
	},
	methods: {
		change(value, render){
			// render 为 markdown 解析后的结果[html]
			this.html = render;
		},
		// 暂时保存
		save(){
			console.log(this.title,this.html)
		},
		// 提交表单
		submit() {
			let newArticle = {
				title:this.title,
				html:this.html,
				img:[],
			}
			if(this.title.trim() !== '' && this.html.trim() !== ''){
				article.newArticle(newArticle).then(({data:{code}})=>{
					if(code == 200){
						this.$message({
								message:'发帖成功，快去步行街看看吧',
								type:'success',
								offset:100,
							});
					}
				})
			}else{
				this.$message({
					message:'标题或内容不能为空',
					type:'warning',
					offset:100,
				});               
			}
		},
	}
}
</script>

<style scoped>
.container{
	margin: 70px auto;
	min-height:700px;
	max-width: 900px;
}
.bread{
	height:30px;
	display: flex;
	align-items: center;
}
</style>
