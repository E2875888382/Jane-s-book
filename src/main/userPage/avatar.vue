<template>
    <div>
        <div style="position:relative">
            <van-uploader @oversize="oversize" v-model="Form.img" multiple  :max-count="1" :max-size="1000000" preview-size="200"/>
            <el-button type="primary" @click="useAvatar" class="using" >使用自定义头像</el-button>
        </div>
        <el-divider content-position="center">推荐头像</el-divider>
        <div>
            <el-card class="box-card" v-for="v in imgList" :key="v.id">
                <van-image width="64" height="64" class="user_img" :src="v.src"  @click="useAvatarT(v.src)"/>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            Form:{
                img:[],
            },
            imgList:[
                { id:0,src:'https://i0.hdslb.com/bfs/face/95aa23fa00e619330a10e55cff328a7cace08e32.png' },
                { id:1,src:'https://i1.hdslb.com/bfs/face/b7308569c797c1b7f6fdc580fea37c43939552db.jpg'},
                { id:2,src:'https://i2.hdslb.com/bfs/face/9c9d85a553995df8dd102e3491fe2dc9d593b29b.jpg@96w_96h_100Q_1c.webp'},
                { id:3,src:'https://i2.hdslb.com/bfs/face/156d5d3b3f4b66d940365b3b0e3a809e1fcc0d97.jpg@96w_96h_100Q_1c.webp'},
                { id:4,src:'https://i2.hdslb.com/bfs/face/e8ab7b02d6576f4141ea857734b68b9dd35a5730.jpg@96w_96h_100Q_1c.webp'},
                { id:5,src:'https://i0.hdslb.com/bfs/face/8c3f6747ea74da512c0240bfc72c602f8fec3ac7.jpg@96w_96h_100Q_1c.webp'},
                { id:6,src:'https://i0.hdslb.com/bfs/face/e85d7ab3425d3dd0f0796bd7f945b47ac27ca82a.jpg@96w_96h_100Q_1c.webp'},
                { id:7,src:'https://i2.hdslb.com/bfs/face/e362781786c9bd96a8a0b2fe44e574879114671b.jpg@96w_96h_100Q_1c.webp'},
                { id:8,src:'https://i1.hdslb.com/bfs/face/33b690574913a46efb5958061d5777b6f0fedec9.jpg@96w_96h_100Q_1c.webp'},
                { id:9,src:'https://i0.hdslb.com/bfs/face/2f39e18672473ea845b3483591072537dcf000ff.jpg@96w_96h_100Q_1c.webp'},
                { id:10,src:'https://i0.hdslb.com/bfs/face/b0d35a893785ead9e1f1676f3c4fb6eb4369dd07.jpg@96w_96h_100Q_1c.webp'},
                { id:11,src:'https://i0.hdslb.com/bfs/face/6d307934d924a4651464fb03809d6cf116771994.jpg@96w_96h_100Q_1c.webp'},
                { id:12,src:'https://i2.hdslb.com/bfs/face/8b6d024e50a61c6442ca076a622fb6d005332926.jpg@96w_96h_100Q_1c.webp'},
                { id:13,src:'https://i1.hdslb.com/bfs/face/f2fb25676db69bf9b75c4c853633bc6f0f800278.jpg@96w_96h_100Q_1c.webp'},
                { id:14,src:'https://i1.hdslb.com/bfs/face/0010f77cf72e7c54d4adbcdee73e2ef6611d83e2.jpg@96w_96h_100Q_1c.webp'},
                { id:15,src:'https://i2.hdslb.com/bfs/face/09aa9e3a45ee7e7544a1ca7fb51d51b9e309c33e.jpg@96w_96h_100Q_1c.webp'},
            ]
        }
    },
    methods: {
        // 上传图片超出限制触发oversize
        oversize(){
            this.$message( '请上传小于100KB的图片');
        },
        // 上传自定义头像
        useAvatar(){
            if(this.Form.img[0]){
                // 此时可以自行将文件上传至服务器
                this.post("uploadAvatar",{img:this.Form.img[0]}).then((result)=>{
                    if(result.data.code == 200){
                        this.$message( '切换头像成功');
                        this.getLoginUserIfo();
                    }
                })
            }
        },
        // 上传推荐头像
        useAvatarT(src){
            this.post("uploadAvatarT",{src:src}).then((result)=>{
                if(result.data.code == 200){
                    this.$message( '切换头像成功');
                    this.getLoginUserIfo();
                }
            })
        },
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
    cursor: pointer;
    position: relative;
    margin:5px;
}
.box-card:hover{
    border-color:deepskyblue;
}
.using{
    position: absolute;
    left: 230px;
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
    left: 400px;
}
</style>
