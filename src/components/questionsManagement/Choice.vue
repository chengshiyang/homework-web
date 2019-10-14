<template>
    <div>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    >
                <el-table-column
                        fixed
                        prop="question"
                        label="问题"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="choice_a"
                        label="A选项"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="choice_b"
                        label="B选项"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="choice_c"
                        label="C选项"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="choice_d"
                        label="D选项"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="answer"
                        label="答案"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="danger"
                                size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <Pagination :total="total"  @handleCurrentChangeSub="handleCurrentChangeFun"></Pagination>
    </div>
</template>

<script>
    import Pagination from "../Pagination.vue"
    export default {
        name: "Choice",
        data(){
            return{
                tableData:[],
                total:0,

            }
        },
        created:function () {
            this.getTableData(1);
        },
        methods:{
            deleteRow(index, rows) {
                rows.splice(index, 1);
                //删除不合理，与后台交互接口未写
            },
            getTableData(currentPage){
                this.axios.get("homework/t/question/getchoicesinfo.do?currentPage="+currentPage
                ).then((response)=>{
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
            //分页 子组件把当前页传值给父组件
            handleCurrentChangeFun(v){
                this.getTableData(v);
            },
        },
        components:{
            Pagination
        }
    }
</script>

<style scoped>

</style>