<template>
    <div>
        <div class="top_container">
            <div class="left_carousel">
                <el-carousel height="420px">
                    <el-carousel-item v-for="item in carousel" :key="item">
                        <img :src="item">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="img_box_first">
                <div class="img_box_first_img1">
                    <img src="https://online-public-manhua.nos-eastchina1.126.net/pic201907019f49777c794c47b69b7791f5c3939d82.jpg?imageView&thumbnail=420y180">
                </div>
                <div class="img_box_first_img2">
                    <img src="https://online-public-manhua.nos-eastchina1.126.net/pic201907103e0c3f7cd6444e0abdb9627bf14a222b.jpg?imageView&thumbnail=320y180">
                </div>
            </div>
            <div class="img_box_second">
                <div class="img_box_second_img1">
                    <img src="https://online-public-manhua.nos-eastchina1.126.net/pic20190701a46e572e8bff4d46a498e6b55e8a99f6.jpg?imageView&thumbnail=320y180">
                </div>
                <div class="img_box_second_img2">
                    <img src="https://online-public-manhua.nos-eastchina1.126.net/pic20190701b1d0e1152cdd4eb3b2498d0ffb6d85ad.jpg?imageView&thumbnail=420y180">
                </div>
            </div>
        </div>
        <div class="content_container">
            <div class="head_title">
                <h2>热门分类</h2>
            </div>
            <div class="classification" v-for="item in comic" :key="item.index">
                <h3>{{ item.className }}</h3>
                <div class="first_item">
                    <el-image class="img" :src="item.firstItem.img" fit="fill"></el-image>
                    <div class="first_item_details">
                        <a href="#" class="comic_title">{{ item.firstItem.title }}</a>
                        <p>{{ item.firstItem.summary }}</p>
                        <div class="new">
                            <span>最新</span>
                            <a href="#">{{ item.firstItem.new }}</a>
                        </div>
                        <div class="author">
                            <div class="icon_1"></div>
                            <span>{{ item.firstItem.author }}</span>
                        </div>
                        <div class="hot">
                            <div class="icon_2"></div>
                            <span>{{ item.firstItem.hot }}</span>
                        </div>
                        <div class="tags">
                            <van-tag class="tag" round plain v-for="i in item.firstItem.tag" :key="i">{{ i }}</van-tag>
                        </div>
                    </div>
                </div>
                <div class="other_item">
                    <div class="item" v-for="(i,index) in item.otherItem" :key="index">
                        <span class="item_order">{{ index+2 }}</span>
                        <a class="item_title" href="#">{{ i.title }}</a>
                        <a class="item_new" href="#">{{ i.new }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            carousel:['https://online-public-manhua.nos-eastchina1.126.net/pic2019070193dd892e8a964d98adc0d662d0c3b870.jpg?imageView&thumbnail=416y362',
                    'https://online-public-manhua.nos-eastchina1.126.net/pic2019070161acf373a6004a1b87cb39c28ee6d156.jpg?imageView&thumbnail=416y362',
                    'https://online-public-manhua.nos-eastchina1.126.net/pic201907011d1c50d95bd842d29740cf90b6d34760.jpg?imageView&thumbnail=416y362',
                    'https://online-public-manhua.nos-eastchina1.126.net/pic201907011053928ed56543a38fe731a92cc84d0d.jpg?imageView&thumbnail=416y362'
                    ],
            comic:[],
        }
    },
    mounted(){
        this.getComic();
    },
    methods:{
        getComic(){
            this.$http.get("getComic").then((result) =>{
                this.comic = result.body;
            })
        }
    }
}
</script>

<style scoped>
.top_container{
    width:1160px;
    height:362px;
    margin: 40px auto;
    position:relative;
}
.content_container{
    width:1200px;
    height:1000px;
    margin:0 auto;
    padding:0 20px;
    position: relative;
}
.head_title>h2{
    font-size: 24px;
    line-height: 31px;
    color: #333333;
    font-weight: bold;
}
.left_carousel{
    width:416px;
    height:362px;
}
.img_box_first{
    width: 742px;
    height:180px;
    position:absolute;
    top:0;
    right:0;
}
.img_box_first .img_box_first_img1{
    width:420px;
    height:180px;
    float: left;
}
.img_box_first .img_box_first_img2{
    width: 320px;
    height:180px;
    float: left;
    margin-left:1px;
}
.img_box_second{
    width: 742px;
    height:180px;
    margin-top:2px;
    position:absolute;
    top:180px;
    right:0;
}
.img_box_second .img_box_second_img1{
    width:320px;
    height:180px;
    float: left;
}
.img_box_second .img_box_second_img2{
    width: 420px;
    height:180px;
    float: left;
    margin-left:1px;
}
.classification{
    width: 33.3%;
    height: 481px;
    position: relative;
    float: left;
}
.classification>h3{
    height:25px;
    margin:12px 0;
    font-size: 18px;
    line-height: 25px;
    color:#ff175d;
    font-weight: bold;
    font:"PingFang SC", "Lantinghei SC", "Microsoft Yahei", "Hiragino Sans GB", "Microsoft Sans Serif", "WenQuanYi Micro Hei", sans-serif;
}
.classification>.first_item{
    width: 100%;
    height:223px;
}
.classification>.first_item>.img{
    width: 160px;
    height: 223px;
    border-radius: 4px;
}
.classification>.first_item .first_item_details{
    width: 186px;
    height: 223px;
    padding-top:15px;
    position: absolute;
    top: 50px;
    left:180px;
}
.classification>.first_item .first_item_details p{
    color: #999;
    font-size: 13px;
    line-height: 1.7;
    margin: 0;
    margin-top: 5px;
}
.classification>.first_item .first_item_details .comic_title{
    color:#333;
    text-decoration-line: none;
    font-weight: bold;
}
.classification>.first_item .first_item_details .comic_title:hover{
    color:#ff175d;
}
.classification>.first_item .first_item_details .new{
    font-size: 13px;
    line-height: 1.7;
    margin: 0;
    margin-top: 5px;
}
.classification>.first_item .first_item_details .new>a{
    color:#ff175d;
}
.other_item{
    height: 185px;
    margin-top:15px;
}
.other_item .item{
    height: 33px;
    width:100%;
    margin: 4px 0;
}
.item .item_order{
    display: block;
    width: 16px;
    height:16px;
    margin-top:8.5px;
    float:left;
    background-color: #eee;
    color: #666666;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    border-radius: 8px;
}
.item .item_title{
    margin-left: 10px;
    font-size: 14px;
    color: #333333;
    width: 148px;
    display:block;
    float: left;
    line-height: 33px;
    text-decoration-line: none;
}
.item .item_title:hover{
    color:#ff175d;
}
.item .item_new{
    font-size: 12px;
    width: 180px;
    color: #999;
    padding-left: 6px;
    display: inline-block;
    vertical-align: middle;
    line-height: 33px;
    cursor: pointer;
}
.author {
    height: 17px;
    position: absolute;
    bottom: 55px;
    left: 0;
}
.hot{
    height: 17px;
    position: absolute;
    bottom: 30px;
    left: 0;
}
.tags{
    height: 25px;
    position: absolute;
    bottom:0;
    left: 0;
}
.tags .tag{
    margin-right: 4px;
}
.author span,.hot span{
    display: inline-block;
    vertical-align:top;
    font-size: 13px;
    line-height: 17px;
    color: #999;
}
.icon_1{
    width: 15px;
    height:16px;
    margin-right: 7px;
    display: inline-block;
    background-position: 0 -84px;
    background-image: url('https://163.bilibili.com/images/sprites/icon.png?acc9c4274adc16d47e7033a34b17c167');
}
.icon_2{
    width: 15px;
    height:16px;
    margin-right: 7px;
    display: inline-block;
    background-position: -66px -64px;
    background-image: url('https://163.bilibili.com/images/sprites/icon.png?acc9c4274adc16d47e7033a34b17c167');
}
</style>
