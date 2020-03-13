<template>
<div class="list_item">
    <div :class="{'list_item_left':img,'long':!img}">
        <p class="title">
            <router-link :to="{name:'articleDetail',params:{articleId:id}}">{{ title }}</router-link>
        </p>
        <p class="abstract">虎扑8月10日讯 据《洛杉矶时报》报道，湖人球员贾维尔-麦基以330万美元的价格出售位于加利福利亚州洛杉矶恩西诺地区的一处豪宅。</p>
        <div class="info">
            <span>{{ author }}</span>
            <span><i class="iconfont">&#xe62b;</i>{{ reply }}</span>
            <span><i class="iconfont">&#xe640;</i>{{ view }}</span>
            <span><i class="iconfont">&#xe60c;</i>{{ praise }}</span>
        </div>
    </div>
    <el-image style="width:150px; height:100px" v-if="img" :src="img" fit="fill"/>
</div>
</template>

<script>
export default {
    props:{
        img:String,
        title:String,
        id:Number,
        author:String,
        reply:Number,
        view:Number,
        praise:Number
    }
}
</script>

<style scoped>
i {
    font-size:12px;
    margin-right:4px;
}
.list_item {
    height:160px;
    padding:15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.list_item_left {
    width:458px;
    height:131px;
}
.long {
    width:625px;
    height:131px;
}
.title {
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.title a {
    color:black;
}
.abstract {
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
}
.info {
    height:20px;
    display:flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #999;
}
.info span {
    margin-right:10px;
    display:flex;
    align-items: center;
}
.el-image {
    border-radius: 4px;
}
</style>