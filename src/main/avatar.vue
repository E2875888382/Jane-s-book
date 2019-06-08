<template>
    <div>
        <div style="position:relative">
            <van-uploader :after-read="afterRead" @oversize="oversize"  v-model="fileList" multiple  :max-count="1" :max-size="100000" />            
            <el-button type="primary" @click="useAvatar" class="using" >使用自定义头像</el-button>                
            <van-image width="64" height="64" class="preview"  :src="imgPreview"  /> 
            <el-button type="primary" @click="useAvatarT" class="using-o" >使用推荐头像</el-button>
        </div>
                        
        <el-divider content-position="center">推荐头像</el-divider>        
        <div>
            <el-card class="box-card" v-for="v in imgList" :key="v.id">
                <van-image width="64" height="64" class="user_img" :src="v.src"  @click="addImg(v.src)"/>
            </el-card>           
        </div>

    </div>
    
</template>

<script>
export default {
    data() {
        return {
            fileList: [],
            imgPreview:'',
            imgList:[
                { id:0,src:'https://i0.hdslb.com/bfs/face/95aa23fa00e619330a10e55cff328a7cace08e32.png' },
                { id:1,src:'https://i1.hdslb.com/bfs/face/b7308569c797c1b7f6fdc580fea37c43939552db.jpg'},
                { id:2,src:'https://i1.hdslb.com/bfs/face/b7308569c797c1b7f6fdc580fea37c43939552db.jpg'},
                { id:3,src:'https://i1.hdslb.com/bfs/face/b7308569c797c1b7f6fdc580fea37c43939552db.jpg'},
                { id:4,src:'https://i1.hdslb.com/bfs/face/b7308569c797c1b7f6fdc580fea37c43939552db.jpg'},
                { id:5,src:'https://i1.hdslb.com/bfs/face/b7308569c797c1b7f6fdc580fea37c43939552db.jpg'},
                { id:6,src:'https://i1.hdslb.com/bfs/face/b7308569c797c1b7f6fdc580fea37c43939552db.jpg'},
                { id:7,src:'https://i1.hdslb.com/bfs/face/b7308569c797c1b7f6fdc580fea37c43939552db.jpg'},    
            ]
        }
    },
    methods: {
        afterRead(file) {          
        // 此时可以自行将文件上传至服务器
            this.$http.post("http://localhost:8000/uploadAvatar",file,{credentials: true}).then(function(result){
                console.log(result.body)
            })
            
        },
        oversize(){
            this.$message( '请上传小于100KB的图片');
        },
        useAvatar(){
            if(this.fileList.length!==0){
                this.$message( '切换头像成功');
                this.fileList.shift();
            }
            
        },
        useAvatarT(){
            if(this.imgPreview.length!==0){
                this.$http.post("http://localhost:8000/uploadAvatarT",{src:this.imgPreview},{credentials: true}).then(function(result){
                    console.log(result.body)
                })
                this.$message( '切换头像成功');
                this.imgPreview='';
            }
            
        },        
        addImg(src){
            this.imgPreview=src;
             
          
        }
    }
}
</script>

<style scoped>
.user_img{
    width: 64px;
    height: 64px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    top: 42px;
    left: 46px;
}
.box-card{
    width: 158px;
    height: 158px;
    box-sizing: border-box;
    border: 1px solid #e5e9ef;
    border-radius: 50%;
    float: left;
    margin-right: 52px;
    margin-bottom: 30px;
    cursor: pointer;
    position: relative;
}
.box-card:hover{
    border-color:deepskyblue;
}
.using{
    position: absolute;
    left: 100px;
    top: 30px;
}
.using-o{
    position: absolute;
    right: 100px;
    top: 30px;
}
.preview{
    width: 64px;
    height: 64px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    top: 20px;
    left: 300px;  
}
</style>
