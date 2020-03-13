<template>
<div class="container">
    <div class="aside">
        <div>
            <router-link to="/set/baseset">
                <div class="icon">
                    <i class="iconfont">&#xe6aa;</i>
                </div>
                <span>基础设置</span>
            </router-link>
        </div>
        <div>
            <router-link to="/set/userset">
                <div class="icon">
                    <i class="iconfont">&#xe618;</i>
                </div>
                <span>个人资料</span>
            </router-link>
        </div>
    </div>
    <div class="content">
        <router-view/>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
    margin-top:58px !important;
    width:960px;
    min-height:800px;
    padding:30px 0;
    margin:58px auto;
}
.aside{
    position:fixed;
    width:280px;
    height:156px;
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