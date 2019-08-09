<template>
<div class="search_box">
    <div class="search-form" >
            <el-autocomplete
            class="inline-input"
            v-model="input"
            :fetch-suggestions="querySearch"
            placeholder="search for ..."
            clearable
            ></el-autocomplete>
        <button class="form-btn" @click="search"></button>
    </div>
</div>
</template>

<script>
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
            if(this.input.trim()!==''){// 去除空格后判断是否为空
                this.$store.commit('searchContent',this.input);
                this.$router.push({ path:'/searchResult'});// 跳转到搜索结果页
                this.$http.get('searchForStreet',{params:{content:this.input}}).then((result)=>{
                    if(result.body.code == 200){
                        this.$store.commit('searchStreet',result.body.street)
                    }
                })
                this.$http.get('searchForPhoto',{params:{content:this.input}}).then((result)=>{
                    if(result.body.code == 200){
                        this.$store.commit('searchPhoto',result.body.photo)
                    }
                })
                this.$http.get('searchForUser',{params:{content:this.input}}).then((result)=>{
                    if(result.body.code == 200){
                        this.$store.commit('searchUser',result.body.user)
                    }
                })
                this.$http.get('searchForNews',{params:{content:this.input}}).then((result)=>{
                    if(result.body.code == 200){
                        this.$store.commit('searchNews',result.body.news)
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.search_box{
    width: 300px;
    height: 32px;
    background-color: rgba(0,0,0,.12);
    border-radius: 20px;
    font-size: 12px;
    z-index: 10;
    display: flex;
    align-self: center;
}
.search-form{
    width:300px;
    height:32px;
    padding:0;
    margin:0;
    background-color: hsla(0,0%,100%,.88);
    border-radius: 20px;
    transition: background-color 0.2s;
    display: flex;
    justify-content: space-between;
}
.search-form:hover{
    background-color: #fff;
    cursor: pointer;
}
.inline-input{
    width: 250px;
    color: #222;
    font-size: 12px;
    overflow: hidden;
    height: 32px;
    line-height: 32px;
    border: 0;
    box-shadow: none;
    background-color: transparent;
}
.inline-input>>>.el-input__inner{
    height:32px;
    padding:0 10px;
    line-height: 32px;
    font-size:13px;
    border-radius: 20px 0 0 20px;
}
.form-btn{
    display: block;
    width: 50px;
    min-width: 0;
    cursor: pointer;
    height: 32px;
    background: url("../../img/icons.png") -653px -720px;
    margin: 0;
    padding: 0;
    border: 1px solid #DCDFE6;
    border-radius:0 20px 20px 0;
}
</style>
