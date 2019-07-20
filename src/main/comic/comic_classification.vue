<template>
    <div class="container">
        <div class="top_container">
            <div class="top_container_selected">
                <span>已选</span>
                <el-divider direction="vertical"></el-divider>
                <el-tag type="danger">全部</el-tag>
            </div>
            <div class="top_container_classes">
                <div class="theme">
                    <span class="class_head">题材</span>
                    <div class="right_box">
                        <div class="class_item"><van-tag type="danger" size="large">全部</van-tag></div>
                        <div class="class_item">热血</div>
                        <div class="class_item">恋爱</div>
                        <div class="class_item">后宫</div>
                        <div class="class_item">恐怖</div>
                        <div class="class_item">治愈</div>
                        <div class="class_item">玄幻</div>
                        <div class="class_item">唯美</div>
                        <div class="class_item">悬疑</div>
                        <div class="class_item">搞笑</div>
                        <div class="class_item">古风</div>
                        <div class="class_item">萌系</div>
                        <div class="class_item">穿越</div>
                        <div class="class_item">校园</div>
                        <div class="class_item">都市</div>
                        <div class="class_item">魔幻</div>
                        <div class="class_item">冒险</div>
                        <div class="class_item">科幻</div>
                        <div class="class_item">武侠</div>
                        <div class="class_item">战斗</div>
                        <div class="class_item">儿童</div>
                    </div>
                </div>
                <div class="area">
                    <span class="class_head">地区</span>
                    <div class="right_box">
                        <div class="class_item"><van-tag size="large" type="danger">全部</van-tag></div>
                        <div class="class_item">中国</div>
                        <div class="class_item">日本</div>
                        <div class="class_item">韩国</div>
                        <div class="class_item">欧美</div>
                    </div>
                </div>
                <div class="plan">
                    <span class="class_head">进度</span>
                    <div class="right_box">
                        <div class="class_item"><van-tag size="large" type="danger">全部</van-tag></div>
                        <div class="class_item">连载中</div>
                        <div class="class_item">已完结</div>
                    </div>
                </div>
                <div class="charge">
                    <span class="class_head">收费</span>
                    <div class="right_box">
                        <div class="class_item"><van-tag size="large" type="danger">全部</van-tag></div>
                        <div class="class_item">免费</div>
                        <div class="class_item">VIP免费</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sort">
            <span>排序</span>
            <div>
                <span>全站热门</span>
                <i></i>
            </div>
            <div>
                <span>新作人气</span>
                <i></i>
            </div>
            <div>
                <span>新作上架</span>
                <i></i>
            </div>
            <div>
                <span>更新时间</span>
                <i></i>
            </div>
            <div>
                <span>读者打赏</span>
                <i></i>
            </div>
        </div>
        <div class="comic_list">
            <div class="comic_item" v-for="(item,index) in comic" :key="index">
                <div class="cover">
                    <a :href="item.link">
                        <img :src="item.img">
                    </a>
                </div>
                <div class="comic_ifo">
                    <a :href="item.link">
                        <div class="title">
                           {{ item.title }}
                        </div>
                    </a>
                    <div class="new">
                        <span>最新</span>
                        <a href="#" class="newOne">{{ item.new }}</a>
                    </div>
                    <p>点击：{{ item.click }}</p>
                </div>
            </div>
        </div>
        <div class="page">
            <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            comic:[],
        }
    },
    mounted(){
        this.getComic();
    },
    methods:{
        getComic(){
            this.$http.get("getComicClass").then((result) =>{
                this.comic = result.body;
            })
        }
    }
}
</script>

<style scoped>
.container{
    width:1200px;
    min-height:4550px;
    margin: 30px auto;
}
.top_container_classes{
    width: 100%;
    height:200px;
    margin: 20px auto 0 auto;
    padding:24px;
    background: #ffffff;
    border: 1px solid #f6f6f6;
    box-shadow: 0 3px 14px 0 rgba(203, 193, 187, .20);
    border-radius: 4px;
}
.top_container_classes .theme{
    height: 64px;
    position:relative;
}
.top_container_classes .area,
.top_container_classes .plan,
.top_container_classes .charge{
    height:32px;
    position:relative;
}

.class_head{
    display: inline-block;
    width:42px;
    height:32px;
    position:absolute;
    top:0;
    left:0;
    color: #999;
    line-height: 32px;
    font-size: 14px;
}
.right_box{
    width:1018px;
    padding-left:6px;
    position: absolute;
    left:42px;
    top:0;
}
.class_item{
    display:inline-block;
    width:64px;
    height:32px;
    text-align: left;
    line-height: 32px;
    cursor: pointer;
    font-size: 14px;
}
.sort{
    height: 21px;
    margin-top:40px;
}
.sort>span{
    float: left;
    color: #999;
    line-height: 21px;
    font-size: 14px;
}
.sort div{
    width:73px;
    height:21px;
    margin-left: 32px;
    display: block;
    float:left;
    position:relative;
}
.sort div>span{
    position:absolute;
    top:0;
    line-height: 21px;
    font-size: 14px;
    cursor: pointer;
}
.sort div>span:hover{
    color:#ff2853;
}
.sort i{
    width:12px;
    height:21px;
    display: inline-block;
    position:absolute;
    right:0;
    top:0;
    background-position: -36px -64px;
    background-image: url('https://163.bilibili.com/images/sprites/icon.png?acc9c4274adc16d47e7033a34b17c167')
}
.comic_list{
    width:1110px;
    min-height: 4150px;
    margin-top:20px;
}
.comic_item{
    width: 160px;
    float: left;
    margin-left: 10px;
    margin-right: 15px;
    height: 345px;
}
.comic_item>.cover{
    width: 160px;
    height: 223px;
    border-radius: 4px;
    box-shadow: 0 3px 14px 0 rgba(203, 193, 187, .40);
    overflow: hidden;
}
.comic_item>.cover img{
    max-width: 100%;
    height: auto;
}
.comic_item>.comic_ifo{
    width:160px;
    height:69px;
    margin-top:16px;
}
.comic_item>.comic_ifo .title{
    height:21px;
    width:169px;
    font-size: 16px;
    line-height: 21px;
    font-weight: bold;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
}
.comic_item>.comic_ifo .title:hover{
    color:#ff2853;
}
.comic_item>.comic_ifo .new{
    max-height: 2.6em;
    overflow: hidden;
    line-height: 1.3;
    margin-top: 10px;
    font-size: 13px;
    color: #666;
}
.comic_item>.comic_ifo p{
    line-height: 22px;
    height: 22px;
    color:#999;
    font-size:13px;
}
.comic_item>.comic_ifo a{
    text-decoration-line: none;
}
.newOne{
    color:#ff2853;
}
.page{
    width: 1110px;
    height:32px;
    padding: 0 300px;
}
.el-pagination{
    width: 600px;
    height:32px;
    margin: 0 auto;
}
</style>
