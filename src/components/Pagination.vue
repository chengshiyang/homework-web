<template>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[6]"
            :page-size="6"
            layout="total, sizes, prev, pager, next, jumper"
            :total=total>
    </el-pagination>
</template>

<script>
    export default {
        name: "Pagination",
        methods: {

            // pageSize 改变时会触发
            handleSizeChange(val) {
                //后台写死了页码size因此前端不用监听改变
                console.log(`每页 ${val} 条`);
            },
            // currentPage 改变时会触发
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                //通过$emit(function,params)传值给父组件
                this.$emit('handleCurrentChangeSub', val);
            }
        },
        data() {
            return {
               currentPage:1
            };
        },
        props:{
            //正确写法 不然会报错
            total:{
                type: Number,
                default: 0
            },
            // currentPage:{ //currentPage是在分页组件内发生改变的，内部监听改变，是传值给父组件
            //     type: Number,
            //     default: 1
            // }
        }


    }
</script>

<style lang="less">
.el-pagination {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
}
</style>