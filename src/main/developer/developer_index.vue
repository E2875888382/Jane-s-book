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
    <el-divider></el-divider>
    <vue-waterfall-easy :imgsArr="imgs" @scrollReachBottom="load" ref="waterfall" height="400px" :maxCols="maxcol">
        <div slot="waterfall-over">没有更多了</div>
    </vue-waterfall-easy>
    <el-backtop></el-backtop>
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
            maxcol:3
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
                [
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rujv3OWNKnFnzL7dRnL5ta4gc10V3fCsibmDPLfblOHJmPvzxvoq6QqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rwDGnvjic7656RToc8iaPsDISyKtDV9KESZoNlj001Mvs5JckSFcjDpPQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rKfNOqJvicJ9LrglTaSaex1Iw5tT6625rqBbdj1qjicOic4iaYUGxibq7PMA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r5uZiamqkYm7Wf2MqTbeKfLTbCnWHuMicPSB86wJFjgKqzEuaSIuV1icZw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rzPz13aibrU3eo33iaxaoticsEyHjOQs5w5Rl6ibJ2alE5OtRVYqj5JyQAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rhIBVdMukVfpfTOhicWmzYZyOsduFKfqlicgJ7AlGks3POq33L25H7jEw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                ],
                [
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rym9o7k43ObjHQzIiaDUnMw5pfSia5hVNoykpxRuUsjTqn1zbljyGr7Hg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r2ZrUeYE0jCHia8HosFleCSb3glqgMEcCoNibiaOpCDRLzwENLkQNyjDbw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgWhECta0OPjEGRalCj8ARRmicjY1icT1E0E8wzdht8iaZXQcs4iabA97Sw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rHI4sqoBcTFiaISe2Wx3ZjsPgaODCVusyXF8O5QOV656sODibiaZic1S9icg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rDcpPTcJtTVZkmvGPrsIx1Z7ZPHTDicYOgKP4ibvWD8OpKnpJaibdPpib3g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rm5O87a6hZUh7dAwsKNZjibShA2WWRzOnSEges2iafpaVU2jmfFdibMCWA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535raP8ruElgzQkbWIibDlA5JdmlW8ekUBRIaEa59h5icfahNEicPibJ5w6LTA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rYlaz6F91lvhvrmFDNCb0zia4jicsZWLHODodwVuMZ0OXpEv65EEkQicIA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                ],
                [
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rym9o7k43ObjHQzIiaDUnMw5pfSia5hVNoykpxRuUsjTqn1zbljyGr7Hg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r2ZrUeYE0jCHia8HosFleCSb3glqgMEcCoNibiaOpCDRLzwENLkQNyjDbw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgWhECta0OPjEGRalCj8ARRmicjY1icT1E0E8wzdht8iaZXQcs4iabA97Sw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rHI4sqoBcTFiaISe2Wx3ZjsPgaODCVusyXF8O5QOV656sODibiaZic1S9icg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rDcpPTcJtTVZkmvGPrsIx1Z7ZPHTDicYOgKP4ibvWD8OpKnpJaibdPpib3g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rm5O87a6hZUh7dAwsKNZjibShA2WWRzOnSEges2iafpaVU2jmfFdibMCWA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535raP8ruElgzQkbWIibDlA5JdmlW8ekUBRIaEa59h5icfahNEicPibJ5w6LTA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rYlaz6F91lvhvrmFDNCb0zia4jicsZWLHODodwVuMZ0OXpEv65EEkQicIA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                ],
                [
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rujv3OWNKnFnzL7dRnL5ta4gc10V3fCsibmDPLfblOHJmPvzxvoq6QqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rwDGnvjic7656RToc8iaPsDISyKtDV9KESZoNlj001Mvs5JckSFcjDpPQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rKfNOqJvicJ9LrglTaSaex1Iw5tT6625rqBbdj1qjicOic4iaYUGxibq7PMA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r5uZiamqkYm7Wf2MqTbeKfLTbCnWHuMicPSB86wJFjgKqzEuaSIuV1icZw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rzPz13aibrU3eo33iaxaoticsEyHjOQs5w5Rl6ibJ2alE5OtRVYqj5JyQAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rhIBVdMukVfpfTOhicWmzYZyOsduFKfqlicgJ7AlGks3POq33L25H7jEw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                ],
            ]
            this.imgs = this.imgs.concat(imgsGroup[this.group]);//增量添加图片
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
