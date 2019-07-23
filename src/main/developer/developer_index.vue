<template>
<div class="container">
    <el-card class="box-card" shadow="hover" v-for="(item,index) in developer" :key="index">
        <div slot="header" class="clearfix">
            <el-tag effect="plain">{{ item.bed }}</el-tag>
            <el-tag type="danger" effect="plain">{{ item.title }}</el-tag>
            <el-tag type="info" effect="plain">{{ item.name }}</el-tag>
            <el-tag type="success" effect="plain">{{ item.class }}</el-tag>
        </div>
        <div class="text" :class="{'right':index%2 != 1}">
            <p>皮城id：{{ item.gameName }}</p>
            <p>宿舍地位：{{ item.status }}</p>
            <p>外号由来：{{ item.reason }}</p>
            <p>宿舍昵称：{{ item.nickname }}</p>
            <p>日常爱好：{{ item.hobby }}</p>
            <p>籍贯：{{ item.native }}</p>
            <p>毕业去向：{{ item.career }}</p>
        </div>
        <div  class="img" :class="{'left':index%2 != 1}">
            <el-image  :src="item.avatar" fit="fill"></el-image>
        </div>
    </el-card>

    <vue-waterfall-easy :imgsArr="imgs" @scrollReachBottom="load" ref="waterfall" height="1000px">
        <div slot="waterfall-over">没有更多了</div>
    </vue-waterfall-easy>
</div>

</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
    data() {
        return {
            imgs: [],
            group: 0,//判断当前是第几组图片
            developer:[],
        }
    },
    components: {
        vueWaterfallEasy
    },
    created() {
        this.load();
        this.getDeveloper();
    },
    methods:{
        getDeveloper(){
            this.$http.get("getDeveloper").then((result) =>{
                this.developer = result.body;
            })
        },
        load(){
            // 默认只能加载4组图片
            if(this.group == 4){
                this.$refs.waterfall.waterfallOver()
                return 
            }
            var imgsGroup = [
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                { src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
            ]
            this.imgs = this.imgs.concat(imgsGroup);//增量添加图片
            this.group++;//记载完1组图片记得设置this.group
        }
    }
}
</script>
<style scoped>
.container{
    width:1000px;
    margin: 40px auto;
}
.box-card{
    padding: 20px;
    margin: 20px 0;
}
.right{
    float:right !important;
}
.left{
    float:left !important;
}
.text{
    width: 500px;
    height: 260px;
    float:left;
}
.img{
    width: 300px;
    height: 260px;
    float:right;
}
p{
    font-size:14px;
}
</style>
