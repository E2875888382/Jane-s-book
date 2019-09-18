<template>
    <div class="container col-10">
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
import article from '../common/article.js'
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
            console.log(this.html)
            // var newStreet = {
            //     topic:this.Form.topic,
            //     content:this.Form.text,
            //     img:this.Form.img,
            // }
            // article.newArticle(newStreet).then((result)=>{
            //     if(result.data.code == 200){
            //         this.$message.success('发帖成功，快去步行街看看吧');
            //     }
            // })
        },

    }
}
</script>

<style scoped>
.container{
    margin-top:80px;
    margin-bottom: 40px;
    min-height:700px;
}
.bread{
    height:30px;
    display: flex;
    align-items: center;
}
</style>
