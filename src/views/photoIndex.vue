<template>
<div class="bg">
    <el-row type="flex" justify="center">
        <el-carousel height="264px" style="width:960px">
            <el-carousel-item v-for="item in banner" :key="item">
                <el-image class="banner_img" :src="item" fit="fill"/>
            </el-carousel-item>
        </el-carousel>
    </el-row>
    <el-row type="flex" justify="center" class="leader">
        <el-col :span="14"><el-page-header content="全部相簿"/></el-col>
        <el-col :span="2" v-if="this.$store.state.loginFlag">
            <i class="el-icon-edit"></i>
            <router-link to="/photo/new" class="lead_link">发表我的相簿</router-link>
        </el-col>
    </el-row>
    <el-row type="flex" justify="center">
        <ul class="box" :style="{'height':boxheight+'px'}" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
            <vue-waterfall-easy ref="waterfall" :imgsArr="imgs" :maxCols="maxcol" :imgWidth="imgWidth" @click="clickFn" :reachBottomDistance='400'>
                <div slot="waterfall-over">没有更多了</div>
                <div class="img-info" slot-scope="props">
                    <p class="some-info">{{props.value.title}}</p>
                    <div class="ifo">
                        <el-avatar shape="circle" :size="24" :src="props.value.avatar" style="margin-right:10px;"/>
                        <span class="user">{{props.value.nickName}}</span>
                        <el-popover placement="top" trigger="hover" content="支持一下" popper-class='tip'>
                            <i @click="praise(props.value.photoID,$event)" slot="reference"></i>
                        </el-popover>
                    </div>
                </div>
            </vue-waterfall-easy>
        </ul>
    </el-row>
    <el-backtop/>
</div>
</template>

<script>
import photo from '@api/photo.js'
export default {
    data(){
        return {
            boxheight:800,
            imgWidth:200,
            imgs: [],
            group: 1,
            maxcol:4,
            maxGroup:0,
            banner:['https://i0.hdslb.com/bfs/vc/ef1b0509f201362abfc69e6a31e618323e07e73f.jpg@1376w_320h_1e.webp',
                            'https://i0.hdslb.com/bfs/vc/d5df1339b718ec50ef76726fab781c50aaf4b9ba.jpg@1376w_320h_1e.webp'],
        }
    },
    components: {
        vueWaterfallEasy: ()=> import('vue-waterfall-easy')
    },
    created(){
        this.init(this.group);
    },
    methods:{
        // 加载图片组
        init(n){
            photo.get(n).then(({ data:{ list,count } })=>{
                this.imgs = [...this.imgs,...list];
                this.maxGroup = Math.ceil(count[0]['COUNT(*)'] / 10);
                this.boxheight += 500;
                this.group++;
            }).catch((err)=>{
                console.log(err);
            })
        },
        load(){
            // 如果当前组数大于最大组数，就停止触发无限加载
            if(this.group > this.maxGroup){
                this.$refs.waterfall.waterfallOver()
                return 
            }else{
                this.init(this.group)
            }
        },
        // 点击图片跳转到相簿详情
        clickFn(event, { index, value }) {
            // 阻止a标签跳转
            event.preventDefault()
            // 只有当点击到图片时才进行操作
            if (event.target.tagName.toLowerCase() == 'img') {
                this.$router.push({ path:`/photoDetails/${value.photoID}`});
            }
        },
        // 点赞相簿
        praise(id,event){
            // 根据praise样式判断点赞状态
            if(!event.target.classList.contains("praise")){
                photo.praisePhoto(id,true);
                event.target.classList.add('praise');
            }else{
                photo.praisePhoto(id,false);
                event.target.classList.remove('praise');
            }
        }
    }
}
</script>

<style scoped>
.bg {
    min-height:2000px;
    padding:30px 0;
    margin-top:58px;
}
.banner_img {
    width:100%;
    height:264px;
    border-radius: 10px;
}
.box {
    width:960px;
    padding-top: 40px;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy-scroll {
    overflow-y: hidden;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy a.img-inner-box {
    border-radius: 10px;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy a {
    overflow: hidden;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy a.img-wraper > img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: all 0.5s;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy a.img-wraper > img:hover {
    transform: scale(1.2);
    cursor: pointer;
}
.img-info {
    padding: 16px;
    background-color: #fff;
}
.ifo {
    display:flex;
    align-items: center;
}
.ifo .user {
    cursor: pointer;
    color: #999;
    width: 60%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
}
.praise {
    background-position: 0em -43em !important;
}
.ifo i {
    display: inline-block;
    height:30px;
    width:32px;
    font-size: 40px;
    vertical-align: middle;
    background-image: url(https://s1.hdslb.com/bfs/static/blive/blfe-picture-index/static/img/svg-sprite.e15d8c310a8b0ec9fc61ec24d605fed4.svg);
    background-repeat: no-repeat;
    background-position: 0em -42em;
    background-size: 1em 4620px;
}
.some-info {
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 16px;
    line-height: 16px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 12px;
}
.leader {
    padding-top: 20px;
    height:40px;
    /* width:960px; */
}
.lead_link {
    color:#fd7e14 !important;
    font-size:12px;
}
</style>
