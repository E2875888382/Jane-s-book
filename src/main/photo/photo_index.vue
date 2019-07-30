<template>
<div class="bg col-12">
    <el-carousel height="264px" class="col-11 m-auto">
        <el-carousel-item v-for="item in banner" :key="item">
            <el-image class="banner_img" :src="item" fit="fill">
            </el-image>
        </el-carousel-item>
    </el-carousel>

    <ul class="col-11 box m-auto" :style="{height:boxheight+'px'}" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
        <vue-waterfall-easy ref="waterfall" :imgsArr="imgs" :maxCols="maxcol" :imgWidth="imgWidth">
            <div slot="waterfall-over">没有更多了</div>
            <div class="img-info" slot-scope="props">
                <p class="some-info">第{{props.value.id}}张图片</p>
                <div class="ifo">
                    <van-image width="24" height="24" class="avatar" :src="$store.state.userIfo.avatar"/>
                    <span>二莫莫莫莫莫莫</span>
                    <i></i>
                </div>
            </div>
        </vue-waterfall-easy>
    </ul>

    <el-backtop></el-backtop>
</div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
    data(){
        return {
            boxheight:1000,
            imgWidth:208,
            imgs: [],
            group: 0,//判断当前是第几组图片
            maxcol:5,
            banner:['https://i0.hdslb.com/bfs/vc/ef1b0509f201362abfc69e6a31e618323e07e73f.jpg@1376w_320h_1e.webp',
                    'https://i0.hdslb.com/bfs/vc/d5df1339b718ec50ef76726fab781c50aaf4b9ba.jpg@1376w_320h_1e.webp'],
        }
    },
    components: {
        vueWaterfallEasy
    },
    mounted(){
        this.load();
    },
    methods:{
        load(){
            // 默认只能加载4组图片
            if(this.group == 4){
                this.$refs.waterfall.waterfallOver()
                return 
            }
            var imgsGroup = [
                [
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rujv3OWNKnFnzL7dRnL5ta4gc10V3fCsibmDPLfblOHJmPvzxvoq6QqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rwDGnvjic7656RToc8iaPsDISyKtDV9KESZoNlj001Mvs5JckSFcjDpPQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rKfNOqJvicJ9LrglTaSaex1Iw5tT6625rqBbdj1qjicOic4iaYUGxibq7PMA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r5uZiamqkYm7Wf2MqTbeKfLTbCnWHuMicPSB86wJFjgKqzEuaSIuV1icZw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rzPz13aibrU3eo33iaxaoticsEyHjOQs5w5Rl6ibJ2alE5OtRVYqj5JyQAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rhIBVdMukVfpfTOhicWmzYZyOsduFKfqlicgJ7AlGks3POq33L25H7jEw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rym9o7k43ObjHQzIiaDUnMw5pfSia5hVNoykpxRuUsjTqn1zbljyGr7Hg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r2ZrUeYE0jCHia8HosFleCSb3glqgMEcCoNibiaOpCDRLzwENLkQNyjDbw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgWhECta0OPjEGRalCj8ARRmicjY1icT1E0E8wzdht8iaZXQcs4iabA97Sw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rHI4sqoBcTFiaISe2Wx3ZjsPgaODCVusyXF8O5QOV656sODibiaZic1S9icg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rDcpPTcJtTVZkmvGPrsIx1Z7ZPHTDicYOgKP4ibvWD8OpKnpJaibdPpib3g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rm5O87a6hZUh7dAwsKNZjibShA2WWRzOnSEges2iafpaVU2jmfFdibMCWA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535raP8ruElgzQkbWIibDlA5JdmlW8ekUBRIaEa59h5icfahNEicPibJ5w6LTA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rYlaz6F91lvhvrmFDNCb0zia4jicsZWLHODodwVuMZ0OXpEv65EEkQicIA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                ],
                [
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rym9o7k43ObjHQzIiaDUnMw5pfSia5hVNoykpxRuUsjTqn1zbljyGr7Hg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r2ZrUeYE0jCHia8HosFleCSb3glqgMEcCoNibiaOpCDRLzwENLkQNyjDbw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgWhECta0OPjEGRalCj8ARRmicjY1icT1E0E8wzdht8iaZXQcs4iabA97Sw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rHI4sqoBcTFiaISe2Wx3ZjsPgaODCVusyXF8O5QOV656sODibiaZic1S9icg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rDcpPTcJtTVZkmvGPrsIx1Z7ZPHTDicYOgKP4ibvWD8OpKnpJaibdPpib3g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rm5O87a6hZUh7dAwsKNZjibShA2WWRzOnSEges2iafpaVU2jmfFdibMCWA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535raP8ruElgzQkbWIibDlA5JdmlW8ekUBRIaEa59h5icfahNEicPibJ5w6LTA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rYlaz6F91lvhvrmFDNCb0zia4jicsZWLHODodwVuMZ0OXpEv65EEkQicIA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rujv3OWNKnFnzL7dRnL5ta4gc10V3fCsibmDPLfblOHJmPvzxvoq6QqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rwDGnvjic7656RToc8iaPsDISyKtDV9KESZoNlj001Mvs5JckSFcjDpPQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rKfNOqJvicJ9LrglTaSaex1Iw5tT6625rqBbdj1qjicOic4iaYUGxibq7PMA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r5uZiamqkYm7Wf2MqTbeKfLTbCnWHuMicPSB86wJFjgKqzEuaSIuV1icZw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rzPz13aibrU3eo33iaxaoticsEyHjOQs5w5Rl6ibJ2alE5OtRVYqj5JyQAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rhIBVdMukVfpfTOhicWmzYZyOsduFKfqlicgJ7AlGks3POq33L25H7jEw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                ],
                [
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rym9o7k43ObjHQzIiaDUnMw5pfSia5hVNoykpxRuUsjTqn1zbljyGr7Hg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r2ZrUeYE0jCHia8HosFleCSb3glqgMEcCoNibiaOpCDRLzwENLkQNyjDbw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgWhECta0OPjEGRalCj8ARRmicjY1icT1E0E8wzdht8iaZXQcs4iabA97Sw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rHI4sqoBcTFiaISe2Wx3ZjsPgaODCVusyXF8O5QOV656sODibiaZic1S9icg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rDcpPTcJtTVZkmvGPrsIx1Z7ZPHTDicYOgKP4ibvWD8OpKnpJaibdPpib3g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rm5O87a6hZUh7dAwsKNZjibShA2WWRzOnSEges2iafpaVU2jmfFdibMCWA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535raP8ruElgzQkbWIibDlA5JdmlW8ekUBRIaEa59h5icfahNEicPibJ5w6LTA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rYlaz6F91lvhvrmFDNCb0zia4jicsZWLHODodwVuMZ0OXpEv65EEkQicIA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rujv3OWNKnFnzL7dRnL5ta4gc10V3fCsibmDPLfblOHJmPvzxvoq6QqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rwDGnvjic7656RToc8iaPsDISyKtDV9KESZoNlj001Mvs5JckSFcjDpPQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rKfNOqJvicJ9LrglTaSaex1Iw5tT6625rqBbdj1qjicOic4iaYUGxibq7PMA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r5uZiamqkYm7Wf2MqTbeKfLTbCnWHuMicPSB86wJFjgKqzEuaSIuV1icZw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rzPz13aibrU3eo33iaxaoticsEyHjOQs5w5Rl6ibJ2alE5OtRVYqj5JyQAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rhIBVdMukVfpfTOhicWmzYZyOsduFKfqlicgJ7AlGks3POq33L25H7jEw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                ],
                [
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rym9o7k43ObjHQzIiaDUnMw5pfSia5hVNoykpxRuUsjTqn1zbljyGr7Hg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r2ZrUeYE0jCHia8HosFleCSb3glqgMEcCoNibiaOpCDRLzwENLkQNyjDbw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgWhECta0OPjEGRalCj8ARRmicjY1icT1E0E8wzdht8iaZXQcs4iabA97Sw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rHI4sqoBcTFiaISe2Wx3ZjsPgaODCVusyXF8O5QOV656sODibiaZic1S9icg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rDcpPTcJtTVZkmvGPrsIx1Z7ZPHTDicYOgKP4ibvWD8OpKnpJaibdPpib3g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rm5O87a6hZUh7dAwsKNZjibShA2WWRzOnSEges2iafpaVU2jmfFdibMCWA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535raP8ruElgzQkbWIibDlA5JdmlW8ekUBRIaEa59h5icfahNEicPibJ5w6LTA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rYlaz6F91lvhvrmFDNCb0zia4jicsZWLHODodwVuMZ0OXpEv65EEkQicIA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rujv3OWNKnFnzL7dRnL5ta4gc10V3fCsibmDPLfblOHJmPvzxvoq6QqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rwDGnvjic7656RToc8iaPsDISyKtDV9KESZoNlj001Mvs5JckSFcjDpPQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgianUTXVNSA2XcfPRPick0FXIXXCklVyNM87qRRHVepicgvicJibwXTUPOA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rKfNOqJvicJ9LrglTaSaex1Iw5tT6625rqBbdj1qjicOic4iaYUGxibq7PMA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r5uZiamqkYm7Wf2MqTbeKfLTbCnWHuMicPSB86wJFjgKqzEuaSIuV1icZw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rzPz13aibrU3eo33iaxaoticsEyHjOQs5w5Rl6ibJ2alE5OtRVYqj5JyQAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                    {id:17482,src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rhIBVdMukVfpfTOhicWmzYZyOsduFKfqlicgJ7AlGks3POq33L25H7jEw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'},
                ],
            ]
            this.imgs = this.imgs.concat(imgsGroup[this.group]);//增量添加图片
            this.boxheight += 600;
            this.group++;//记载完1组图片记得设置this.group
        }
    }
}
</script>

<style scoped>
.bg{
    min-height:2000px;
    padding:30px 0;
    background-color: #f2f3f5;
}
.banner_img{
    width:100%;
    height:264px;
    border-radius: 10px;
}
.box{
    padding-top: 40px;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy-scroll{
    overflow-y: hidden;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy a.img-inner-box{
    border-radius: 10px;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy a{
    overflow: hidden;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy a.img-wraper > img{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: all 0.5s;
}
.box>>>.vue-waterfall-easy-container .vue-waterfall-easy a.img-wraper > img:hover{
    transform: scale(1.2);
}
.avatar{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right:10px;
}
.img-info{
    padding: 16px;
    background-color: #fff;
}
.ifo{
    display:flex;
    align-items: center;
}
.ifo span{
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
.ifo i{
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
.some-info{
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
</style>
