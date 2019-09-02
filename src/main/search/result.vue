<template>
<div class="container m-auto">
    <div class="aside">
        <div>
            <router-link to="/search/article">
                <div class="icon">
                    <van-icon name="orders-o" />
                </div>
                <span>文章</span>
            </router-link>
        </div>
        <div>
            <router-link to="/search/news">
                <div class="icon">
                    <van-icon name="new-o" />
                </div>
                <span>新闻</span>
            </router-link>
        </div>
        <div>
            <router-link to="/search/photo">
                <div class="icon">
                    <van-icon name="photo-o" />
                </div>
                <span>相册</span>
            </router-link>
        </div>
        <div>
            <router-link to="/search/user">
                <div class="icon">
                    <van-icon name="friends-o" />
                </div>
                <span>用户</span>
            </router-link>
        </div>
    </div>
    <div class="content">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    methods:{
        highLight:function(value){
            // 1.从vuex中取出搜索的内容
            let search = this.$store.state.search;
            value = value.split(search).join(`<em style="color:gold;font-style:normal">${search}</em>`)
            return value;
        }
    }
}
</script>

<style scoped>
.container{
    margin-top:58px !important;
    width:960px;
    min-height:800px;
    padding:30px 0;
}
.aside{
    position:fixed;
    width:280px;
    height:400px;
    top: 86px;
    overflow: auto;
}
.aside>div{
    padding:10px 15px;
    height:52px;
}
.aside>div:hover{
    background-color: #f0f0f0;
}
.aside>div a{
    display: flex;
    align-items: center;
    text-decoration: none;
}
.aside span{
    font-size: 15px;
    cursor: pointer;
    color: #333;
}
.icon{
    margin-right: 15px;
    width: 32px;
    height: 32px;
    color: #fff;
    background-color: #a0a0a0;
    border-radius: 4px;
    font-size:18px;
    display:flex;
    align-items: center;
    justify-content: center;
}
.content{
    float:right;
    width:625px;
    margin-right:15px;
    min-height:500px;
    margin-top:20px;
}
</style>