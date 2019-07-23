<template>
<div class="container">
    <vue-waterfall-easy :imgsArr="imgs" @scrollReachBottom="load" ref="waterfall">
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
        }
    },
    components: {
        vueWaterfallEasy
    },
    created() {
        this.load()
    },
    methods:{
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
    height: 1000px;
    margin: 20px auto;
}
</style>
