<template>
        <div>
            <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
                <h3 class="login-title">欢迎登录</h3>
                <el-form-item label="账号" prop="username">
                    <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>

            <el-dialog
                    title="温馨提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    >
                <span>请输入账号和密码</span>
                <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
            </el-dialog>
        </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                        username: '',
                        password: ''
                    },

                    // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                        username: [
                            //required:必须
                            //trigger:触发时机,blur输入框失去焦点触发,change输入框内容改变就触发
                            {required: true, message: '账号不可为空', trigger: 'blur'}
                        ],
                        password: [
                            {required: true, message: '密码不可为空', trigger: 'blur'}
                        ]
                    },

                // 对话框显示和隐藏
                dialogVisible: false
                }
            },
        methods: {
            getUserInfo(){
                this.axios.get("user/login/teacher.do",{
                    params: {
                        username:this.form.username,
                        password:this.form.password
                    }
                }).then((response)=>{
                    console.log(response);
                    if (response.data.code=="200"){
                        this.$router.push("/main/m1");
                    }
                    else {
                        alert("账号或密码错误");
                    }

                }).catch((error)=>{
                    alert("服务器发生错误");
                })
            },
                onSubmit(formName) {
                    // 为表单绑定验证功能
                    // validate()是对整个表单进行校验的方法，Function(callback: Function(boolean, object))
                    //回调函数两个参数：是否校验成功和未通过校验的字段
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            //如果校验为true
                            this.getUserInfo();
                            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                            // this.$router.push("/components");
                        } else {
                            this.dialogVisible = true;
                            return false;
                        }
                    });
                }
            }
        }
    </script>

    <style lang="less" scoped>
        .login-box {
            border: 1px solid #DCDFE6;
            width: 350px;
            margin: 180px auto;
            padding: 35px 35px 15px 35px;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            box-shadow: 0 0 25px #909399;

        }

        .login-title {
            text-align: center;
            margin: 0 auto 40px auto;
            color: #303133;
        }

    </style>

