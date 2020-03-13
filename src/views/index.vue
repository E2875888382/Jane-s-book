<template>
<el-row type="flex" justify="center" class="bg">
    <el-col :span="12">
        <div class="list">
            <articleItem
                v-for="(item,index) in articleList" :key="index"
                :img="item.img"
                :id="item.articleID"
                :title="item.title"
                :author="item.nickName"
                :reply="item.replyCount"
                :praise="item.praise"
                :view="item.view"
            />
            <el-button type="info" round @click="load" v-if="!finished">阅读更多</el-button>
            <p class="tips" v-if="finished">没有更多了</p>
        </div>
    </el-col>
    <el-col :span="5">
        <news/>
    </el-col>
    <el-backtop/>
</el-row>
</template>

<script>
import article from '@api/article.js';
export default {
    data() {
        return {
            currentPage: 1,
            articleList: [],
            count: 0,
            finished: false
        };
    },
    components: {
        news: ()=> import('@components/news.vue'),
        articleItem: ()=> import('@components/article/articleItem.vue')
    },
    mounted() {
        this.article(this.currentPage);
    },
    methods: {
        article(n) {
            article.get(n).then(({data: {list, count}})=> {
                this.articleList = this.articleList.concat(list);
                this.count = count[0]['COUNT(*)'];
                this.currentPage++;
            }).catch(err=> {
                console.log(err);
            });
        },
        load() {
            const max = Math.ceil(this.count / 10);

            if (this.currentPage <= max) {
                this.article(this.currentPage);
            } else {
                this.finished = true;
            }
        }
    }
};
</script>

<style scoped>
.bg {
    margin-top:58px !important;
    padding-top:30px;
}
.list {
    padding-left:15px;
    width:640px;
    min-height:2000px;
}
.el-button {
    width:625px;
    margin-bottom: 30px;
}
.tips {
    text-align:center;
    color:#999;
    margin:20px 0;
    font-size: 13px;
}
</style>