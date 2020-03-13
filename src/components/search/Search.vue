<template>
<div class="search_box">
    <el-autocomplete
        v-model="input"
        :fetch-suggestions="querySearch"
        prefix-icon="el-icon-search"
        placeholder="搜索"
        @keyup.enter.native="search"
        >
    </el-autocomplete>
</div>
</template>

<script>
import req from '@api/request.js'
export default {
    data(){
        return {
            input:'',
            hot:[],
        }
    },
    mounted() {
        this.hot = this.loadAll();
    },
    methods:{
        querySearch(queryString, cb) {
            var hot = this.hot;
            var results = queryString ? hot.filter(this.createFilter(queryString)) : hot;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (hot) => {
            return (hot.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "梦之泪伤狂少"},
                { "value": "这波什么水平"},
                { "value": "jrs"},
                { "value": "为什么"},
                { "value": "谢邀"},
                { "value": "高圆圆"},
            ];
        },
        // 搜索
        search(){
            if(this.input.trim()!==''){
                this.$store.commit('searchContent',this.input);
                this.$router.push({ path:'/search'});
                req.get('search', {search:this.input}).then(({data})=>{
                    this.$store.commit('searchResult',data);
                })
            }
        }
    }
}
</script>

<style scoped>
.search_box{
    width: 300px;
    height: 40px;
    border-radius: 20px;
    font-size: 12px;
    z-index: 10;
    display: flex;
    align-self: center;
}
div>>>.el-input__inner:focus{
    width:250px;
}
div>>>.el-input__inner{
    border-radius:50px;
    border:none;
    background: #eee;
    transition:all 0.5s;
}
</style>
