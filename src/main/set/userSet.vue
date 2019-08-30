<template>
<div>
    <div class="item">
        <span class="label">出生日期</span>
        <el-date-picker
        v-model="birthday"
        type="date"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
        </el-date-picker>
    </div>
    <div class="item">
        <span class="label">性别</span>
        <el-radio v-model="gender" label="男">男</el-radio>
        <el-radio v-model="gender" label="女">女</el-radio>
    </div>
    <div class="item">
        <span class="label">个人简介</span>
        <el-input
            type="textarea"
            :rows="3"
            resize="none"
            v-model="sign">
        </el-input>
    </div>
    <el-button type="success" round size="small">保存</el-button>
</div>
</template>

<script>
export default {
    data(){
        return {
            sign:'',
            gender:'',
            birthday:'',
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.sign = this.$store.state.userIfo.sign;
            this.gender = this.$store.state.userIfo.gender;
            this.birthday = this.$store.state.userIfo.birthday;
        },
    }
}
</script>

<style scoped>
.item{
    height:100px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items:center;
}
.label{
    font-size: 15px;
    color: #969696;
    display: inline-block;
    width:150px;
}
.el-button{
    margin-top:30px;
    width:100px;
}
.el-textarea{
    width:475px;
}
.el-textarea>>>.el-textarea__inner{
    background-color: whitesmoke;
}
</style>