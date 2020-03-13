<template>
<div class="bg">
    <div class="main">
        <el-tabs v-model="activeName">
            <el-tab-pane label="登录" name="login">
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="email">
                        <el-input v-model="loginForm.email" autocomplete="off" prefix-icon="el-icon-user"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input 
                            v-model="loginForm.password" 
                            autocomplete="off" 
                            show-password 
                            minlength="8" 
                            maxlength="10" 
                            prefix-icon="el-icon-lock"
                        />
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input 
                            v-model="loginForm.code" 
                            autocomplete="off" 
                            style="max-width:180px" 
                            prefix-icon="el-icon-key"
                        />
                        <canvasCode :value.sync="validCode" v-if="activeName == 'login'"/>
                    </el-form-item>
                </el-form>
                <el-button type="primary" round @click="login">登录</el-button>
            </el-tab-pane>
            <el-tab-pane label="注册" name="registered">
                <el-form :model="newForm" :rules="rules" ref="newForm" label-position="right">
                    <el-form-item prop="email">
                        <el-input 
                            v-model="newForm.email" 
                            autocomplete="off" 
                            prefix-icon="el-icon-user"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input 
                            v-model="newForm.password" 
                            autocomplete="off" 
                            show-password 
                            minlength="8" 
                            maxlength="10" 
                            prefix-icon="el-icon-lock"
                        />
                    </el-form-item>
                    <el-form-item prop="passwordAgain">
                        <el-input 
                            v-model="newForm.passwordAgain" 
                            autocomplete="off" 
                            show-password 
                            minlength="8"
                            maxlength="10" 
                            prefix-icon="el-icon-lock"
                        />
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input 
                            v-model="newForm.code" 
                            autocomplete="off" 
                            style="max-width:180px" 
                            prefix-icon="el-icon-key"
                        />
                        <canvasCode :value.sync="validCode" v-if="activeName == 'registered'"/>
                    </el-form-item>
                </el-form>
                <el-button type="primary" round @click="newUser">注册</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
import md5 from 'js-md5';
import user from '@api/user.js';
export default {
    data() {
        const checkEmail = (rule, value, callback)=> {
            const reEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if (!reEmail.test(value)) {
                callback(new Error('请输入正确的邮箱格式'));
            } else {
                callback();
            }
        };
        const checkPassword = (rule, value, callback)=> {
            const rePassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/;

            if (!rePassword.test(value)) {
                callback(new Error('请输入8-10位的混合密码（数字，字母）'));
            } else {
                callback();
            }
        };
        const checkPasswordAgain = (rule, value, callback)=> {
            if (value !== this.newForm.password) {
                callback(new Error('请再次确认密码'));
            } else {
                callback();
            }
        };
        const checkCode = (rule, value, callback)=> {
            if (value.toLowerCase() !== this.validCode.toLowerCase()) {
                callback(new Error('请再次确认验证码'));
            } else {
                callback();
            }
        };

        return {
            validCode: '',
            activeName: 'login',
            loginForm: { // 登录表单
                email: '',
                password: '',
                code: ''
            },
            newForm: { // 注册表单
                email: '',
                password: '',
                passwordAgain: '',
                code: ''
            },
            rules: { // 模态框输入规则
                email: [
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    },
                    {
                        required: 'true',
                        message: '请输入邮箱',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        validator: checkPassword,
                        trigger: 'blur'
                    },
                    {
                        required: 'true',
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ],
                passwordAgain: [
                    {
                        validator: checkPasswordAgain,
                        trigger: 'blur'
                    },
                    {
                        required: 'true',
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ],
                code: [
                    {
                        validator: checkCode,
                        trigger: 'blur'
                    },
                    {
                        required: 'true',
                        message: '请输入验证码',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    components: {
        canvasCode: ()=> import('@components/canvasCode.vue')
    },
    methods: {
        log(form) {
            (async()=> {
                try {
                    const {data: {code, token}} = await user.login(form);

                    if (code === 1) {
                        localStorage.setItem('token', token);
                    }
                    this.$store.dispatch('userIfo');
                    this.$router.push({path: '/'});
                } catch (e) {
                    this.$message({
                        message: '账号或密码错误',
                        type: 'warning',
                        offset: 100
                    });
                }
            })();
        },
        // 注册
        newUser() {
            this.$refs['newForm'].validate(valid=> {
                if (valid) {
                    const newForm = {
                        email: this.newForm.email,
                        password: md5(this.newForm.password)
                    };

                    user.register(newForm).then(({data: {code}})=> {
                        if (code === 0) {
                            this.$message({
                                message: '该邮箱已被注册',
                                type: 'warning',
                                offset: 100
                            });
                        } else {
                            this.dialogNewVisible = false;
                            this.$message({
                                message: '注册成功',
                                type: 'success',
                                offset: 100
                            });
                            this.log(newForm);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 登录
        login() {
            this.$refs['loginForm'].validate(valid=> {
                if (valid) {
                    this.log({
                        email: this.loginForm.email,
                        password: md5(this.loginForm.password)
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.bg {
    margin-top:58px;
    background-color: #F7F7F7;
    height:500px;
    display:flex;
    align-items: center;
    justify-content: center;
}
.main {
    width:300px;
    height:350px;
    background-color: #fff;
    opacity: 0.8;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    padding:20px 50px;
}
.el-button {
    width:300px;
}
</style>