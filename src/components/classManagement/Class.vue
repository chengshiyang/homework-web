<template>
    <div class="check_class" width="100%">
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{ path: '/main' }">班级管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>查看班级</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
        <el-table
                :data="tableData"
                style="width: 100%" border >
            <el-table-column
                    prop="class_name"
                    label="班级名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="class_password"
                    label="班级密码"
                    width="180">
            </el-table-column>
            <el-table-column
                prop="school_name"
                label="学校">
            </el-table-column>
            <el-table-column
                    prop="teacher_id"
                    label="任课教师">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            type="button"
                            size="mini"
                            @click="handleClick(scope.row)"
                    >修改密码</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
<!--                <el-input type="password" placeholder="请输入密码" v-model="password" show-password/>-->

            <span slot="footer" class="dialog-footer">
<!--    <el-button @click="centerDialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  </span>
        </el-dialog>
       <div class="pagination">
           <Pagination :total="total"  @handleCurrentChangeSub="handleCurrentChangeFun"></Pagination>
       </div>
    </div>

</template>

<script>
    import Pagination from "../Pagination.vue"
    export default {
        inject:["reload"],
        name: "Class",
        data(){
            //表单验证step1
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {

                tableData:[],
                centerDialogVisible:false,
                total:0,
                // currentPage:1,   currentPage是分页子组件自己监听，不需要父组件传值
                // password:"",
                //以下参数配置的是更新密码 并刷新页面的操作
                classId:"", //根据每一行的id获取
                // current_page:1,
                //表单验证step2
                ruleForm: {
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],

                }


            }
        },
       created:function () {
           this.getTableInfo(1);
       },


        methods: {
            getTableInfo(currentPage){
                this.axios.get("homework/t/school/getclassinfobypage.do?currentPage="+currentPage
                    // params:{
                    //     this.currentPage
                    // }
                ).then((response)=>{
                    // var dataJson = eval("(" + response +")");
                    // response=response.replace(/\\/g,"");

                    if (response.data.code=="200") {
                        // console.log(response.data.data);
                        this.tableData=response.data.data.array;
                        this.total=parseInt(response.data.data.sumNum);
                    }
                }).catch((error)=>{
                    alert("服务器发生错误");
                    console.log(error);
                })
            },
            handleClick(row){
                this.centerDialogVisible=true;
                //将当前行的id保存为"全局变量"存储
                this.classId=row.id;
                // 不需要旧密码
                // this.password=row.password;


            },
            updatePassword(id,password){
                id=parseInt(id);
                password=parseInt(password);
                //修改密码,成功之后,页面显示新密码
                 this.axios.post("homework/t/school/updatepassword.do" +
                     "?class_password="+password+"&id="+id
                     //{
                 //     class_password:password,
                 //     id:id,
                  ).then((response)=>{
                     if(response.data.code=="200"){
                         // console.log(11);
                         // console.log(response.data);
                         // console.log(this.tableData[id]);
                         this.tableData[id].class_pass=password;
                         this.reload();
                         // console.log(11);
                     }

                 }).catch((response)=>{
                     alert("服务器发生错误");
                     console.log(error);
                 })
            },
            //表单验证step3
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //修改密码成功后将当前的"全局变量"classId 以及 checkPass传入
                        this.updatePassword(this.classId,this.ruleForm.checkPass);
                        alert('已修改');
                        this.centerDialogVisible = false;


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //分页 子组件把当前页传值给父组件
            handleCurrentChangeFun(v){
                // this.current_page=v;
                // this.getTableInfo(this.currentPage);
                this.getTableInfo(v);
            },
        },

        components:{
            Pagination
        }

    }
</script>

<style lang="less">
 .el-breadcrumb {
     margin-bottom: 20px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    .el-breadcrumb__inner.is-link{
        font-weight: normal;
    }
 }
 .el-table{
     left: 50%;
     transform: translateX(-50%);
 }
.check_class {
    padding:10px 20px 0;
    position: relative;
    top: 0;
    left: 0;
}
</style>