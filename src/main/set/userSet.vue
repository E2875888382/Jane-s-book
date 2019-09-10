<template>
<div>
    <div class="item">
        <span class="label">昵称</span>
        <el-input v-model="nickName"></el-input>
    </div>
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
    <el-button type="success" round size="small" @click="save">保存</el-button>
</div>
</template>

<script>
import user from '../common/user.js'
export default {
    data(){
        return {
            nickName:'',
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
            this.nickName = this.$store.state.userIfo.nickName;
        },
        save(){
            if(this.nickName.trim().length !== 0&&this.birthday!==null){
                let ifo = {
                    birth:this.birthday,
                    sign:this.sign.trim().length == 0 ? '无':this.sign.trim(),
                    gender:this.gender,
                    nickName:this.nickName,
                }
                user.update(ifo).then(()=>{
                    this.$message({
                        message:'已保存',
                        type:'success'
                    })
                    this.userIfo();
                })
            }
        }
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
.el-input{
    width:214px;
    height:33px;
}
.el-input>>>.el-input__inner{
    background-color: whitesmoke;
    height:33px;
}
</style>