<template>
    <div class="student">

        <el-select  v-model="bySearch" placeholder="请选择学生班级" @change="handleChangByOption">
            <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.class_name"
                    :value="item.id"
                    >
            </el-option>
        </el-select>
        <div class="table">
            <el-table
                    border
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="学生姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="登录账号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="class_name"
                        label="所属班级">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="联系电话">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="button"
                                size="mini"
                                @click="handleClick(scope.row)"
                        >编辑</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="修改所属班级" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="班级名称" :label-width="formLabelWidth">
                    <el-select v-model="form.className" placeholder="请选择班级" @change="handleChangByOption2">
                        <el-option
                                v-for="item in classList"
                                :key="item.class_id"
                                :label="item.class_name"
                                :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateClass(stuId,classId)">确 定</el-button>
            </div>
        </el-dialog>

        <Pagination :total="total" @handleCurrentChangeSub="handleCurrentChangeFun"></Pagination>
    </div>

</template>

<script>
    import Pagination from "../Pagination.vue"
    export default {
        inject:["reload"],
        name: "Student",
        data(){
            return {
                classList:[],
                bySearch:"",
                tableData:[],
                total:0,
                currentPage:1,
                id:1,//班级id
                dialogFormVisible:false,
                formLabelWidth: '120px',
                form:{
                    className:"",
                },
                stuId:"",
                classId:"",//新班级id
            }
        },
        created:function () {
            this.getClassInfo();
            this.getClassTable(1,1);

        },
        methods :{
            //获取班级下拉框信息
            getClassInfo(){
                this.axios.get("homework/t/school/getclassinfo.do?")
                    .then((response)=>{
                        if (response.data.code=="200"){
                            // console.log(response.data.data[index]);
                            console.log(response.data.data);
                            this.classList=response.data.data;
                        }
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
            },
            //获取班级列表信息
            getClassTable(id,currentPage){
                this.axios.get("homework/t/school/getstudentsbyclass.do?currentPage="+currentPage+"&class_id="+id)
                    .then((response)=>{
                        if (response.data.code=="200") {
                            console.log(response.data.data);
                            this.tableData=response.data.data.array;
                            this.total=parseInt(response.data.data.sumNum);
                        }
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
            },
            //保存下拉框的值
            handleChangByOption(val){
                this.id=val;
                this.getClassTable(val,this.currentPage);
            },
            //保存分页的当前页
            handleCurrentChangeFun(v){
                this.currentPage=v;
                this.getClassTable(this.id,v);
            },
            //保存当前行学生id
            handleClick(row){
                this.dialogFormVisible=true;
                this.stuId=row.id;
                console.log(row.id);
                // this.classId=row.class_id;
            },
            //保存新班级id
            handleChangByOption2(val){
                this.classId=val;
            },
            //点击确定修改所属班级
            updateClass(stuId,classId){
                this.axios.get("homework/t/school/updatestudentclass.do"+"?id="+stuId+"&class_id="+classId
                    // id:stuId,
                    // class_id:classId
                    // }
                ).then((response)=>{
                    console.log(response.data.code);
                        if (response.data.code=="200"){
                            alert("修改成功");
                            this.dialogFormVisible=false;
                            this.reload();
                        }
                    })
                    .catch((response)=>{
                        alert("服务器发生错误");
                        console.log(error);
                    });
                // alert('已修改');

            },
        },
        components:{
            Pagination
        }

    }
</script>

<style lang="less">
.student {
    padding:10px 20px 0;
    position: relative;
    top: 0;
    left: 0;
    .table {
        margin-top: 15px;
    }
}

</style>