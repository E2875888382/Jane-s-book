<template>
    <div class="container col-8">
        <div class="bread col-12">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path:'/photo' }">相簿</el-breadcrumb-item>
                <el-breadcrumb-item>发表相簿</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-input v-model="title" maxlength="10" show-word-limit style="margin-top:40px;" class="col-12" clearable>
            <template slot="prepend">标题：</template>
        </el-input>

        <div class="col-12 tags">
            <el-tag
            :key="index"
            v-for="(tag,index) in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
            </el-tag>
            <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新标签</el-button>
        </div>

        <div class="col-12">
            <p>添加封面：</p>
            <van-uploader @oversize="oversize" v-model="src" multiple  :max-count="1" :max-size="1000000" preview-size="200"/>
        </div>

        <div class="col-12">
            <p>添加相片(最多8张)：</p>
            <van-uploader @oversize="oversize" v-model="photo" multiple  :max-count="8" :max-size="1000000" preview-size="200"/>
        </div>

        <div class="col-12">
            <el-button type="primary" @click="addNewPhoto">发表</el-button>
            <el-button @click="reset">重置</el-button>
        </div>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import photo from '../common/photo.js'
export default {
    data() {
        return {
            title:'',// 标题
            dynamicTags: ['私服', '生活', ],// 标签
            inputVisible: false,
            inputValue: '',
            src:[],
            photo:[]
        }
    },
    methods: {
        // oversize触发
        oversize(){
            this.$message({
                    message:'请上传小于1M的图片',
                    type:'warning',
                    offset:100,
                });
        },
        // tag关闭触发
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

        reset(){
            this.title = '';
            this.dynamicTags = ['私服', '生活'];
            this.src = [];
            this.photo = [];
        },

        addNewPhoto(){
            if((this.title.trim()!==''&&this.src.length !== 0)&&this.photo.length !== 0 ){
                let tags = this.dynamicTags.join(',');
                let src = this.src[0].content;
                let time = new Date().toLocaleString();
                let temp = [];
                for(let i = 0;i<this.photo.length;i++){
                    temp.push(this.photo[i].content)
                };
                let photos = temp.join('@');
                photo.newPhoto(tags,src,this.title,time,photos).then((result)=>{
                    if(result.data.code == 200){
                        this.$message({
                            message:'发表成功',
                            type:'success',
                            offset:100,
                        })
                    }
                })
            }else{
                this.$message({
                    message:'请把相簿内容填写完整！',
                    type:'warning',
                    offset:100,
                })
            }

        }
    }
}
</script>

<style scoped>
.container{
    margin-top:70px;
    margin-bottom: 40px;
    min-height:1000px;
}
.bread{
    height:30px;
    display: flex;
    align-items: center;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.tags{
    margin:40px 0;
}
</style>
