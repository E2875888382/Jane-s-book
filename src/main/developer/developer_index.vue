<template>
<div class="container">
    <van-grid>
        <van-grid-item v-for="value in 4" :key="value">
             <el-avatar size="medium" src="https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rym9o7k43ObjHQzIiaDUnMw5pfSia5hVNoykpxRuUsjTqn1zbljyGr7Hg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"></el-avatar>
        </van-grid-item>
    </van-grid>
    <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData"></vue-waterfall-easy>
</div>

</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
    data() {
        return {
            imgsArr: [],
            group: 0, // request param
        }
    },
    components: {
        vueWaterfallEasy
    },
    created() {
        this.getData()
    },
    methods:{
        getData(){
            var imgs = [
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rym9o7k43ObjHQzIiaDUnMw5pfSia5hVNoykpxRuUsjTqn1zbljyGr7Hg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535r2ZrUeYE0jCHia8HosFleCSb3glqgMEcCoNibiaOpCDRLzwENLkQNyjDbw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rgWhECta0OPjEGRalCj8ARRmicjY1icT1E0E8wzdht8iaZXQcs4iabA97Sw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rHI4sqoBcTFiaISe2Wx3ZjsPgaODCVusyXF8O5QOV656sODibiaZic1S9icg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rDcpPTcJtTVZkmvGPrsIx1Z7ZPHTDicYOgKP4ibvWD8OpKnpJaibdPpib3g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rw0Mu6UdQeqlZ3uaDRrp1gtULKXYDKYHmGQk3fca4ib0BczxSicVEFS4g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rm5O87a6hZUh7dAwsKNZjibShA2WWRzOnSEges2iafpaVU2jmfFdibMCWA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535raP8ruElgzQkbWIibDlA5JdmlW8ekUBRIaEa59h5icfahNEicPibJ5w6LTA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rYlaz6F91lvhvrmFDNCb0zia4jicsZWLHODodwVuMZ0OXpEv65EEkQicIA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rPCZ6QLcqv2gY9QMCW7uHJ3jUI02xUxwDniabxGIQsKMibKjGvKjslC7Q/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rAX71RlaEvFvRHmqWicSKjA7via5Z6UPN0LvGiahX5sJWL7ltYo6TOSIkg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rovtQVIcH2oQEIyaNRBrng3ZZNc4ibESdxvQgaXdOice6icRNfVUoUoDJg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rJvRpBd912kD27abOUwecib4dyj2AibsWiaZnoicCwvVbTXI6sJbbJXVicicA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rYYpaDnusu6yShWBRJxheAdWpvicFcyOAvm8naHc31yX3BiaiaiadL7e98w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rH66sumvX9mVt8SiaAooUeiaabqYgvRKibDjNvQm7URRnMOHSYcCPc0tsg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
                {src:'https://mmbiz.qpic.cn/mmbiz_jpg/n9RSiaiayZMLtJOOxkFZuO4HHCqB1p535rdudX5tS4hz6fQSF47eKPWvcEU6mZmBMEowYvRkYN6MiaRpkCjkib8gAQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',href:''},
            ];
            this.imgsArr = this.imgsArr.concat(imgs);
        }
    }
}
</script>

<style scoped>
.container{
    width:1000px;
    height:2000px;
    margin: 20px auto;
}
.vue-waterfall-easy-container{
    height:1500px;
    width:100%
}
</style>
