<template>
<div class="search_box">
    <div class="search-form" >
        <input type="text" class="form-control search-input" placeholder="Search for..." v-model="input">
        <button class="form-btn" @click="search"></button>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            input:'',
        }
    },
    methods:{
        search(){
            if(this.input.trim()!==''){
                console.log(this.input)
            }
        }
    }
}
</script>

<style scoped>
.search_box{
    width: 200px;
    height: 32px;
    padding: 0 2px;
    background-color: rgba(0,0,0,.12);
    border-radius: 6px;
    font-size: 12px;
    z-index: 10;
    display: flex;
    align-self: center;
}
.search-form{
    width:200px;
    height:32px;
    padding:0;
    margin:0;
    background-color: hsla(0,0%,100%,.88);
    border-radius: 4px;
    transition: background-color 0.2s;
    display: flex;
}
.search-form:hover{
    background-color: #fff;
    cursor: pointer;
}
.search-input{
    float: left;
    width: 162px;
    color: #222;
    font-size: 12px;
    overflow: hidden;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    border: 0;
    box-shadow: none;
    background-color: transparent;
}
.form-btn{
    display: block;
    width: 48px;
    min-width: 0;
    cursor: pointer;
    height: 32px;
    background: url("../../img/icons.png") -653px -720px;
    margin: 0;
    padding: 0;
    border: 0;
}
</style>
