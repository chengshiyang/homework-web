<template>
    <div class="my_main" style="height: 100%">
        <el-container style="height:100%">
<!--            Header部分-->
            <el-header>
                <el-row>
                    <!--                logo-->
                    <el-col :span="3" class="logo">教师端</el-col>
                    <!--                其它-->
                    <el-col :span="21">
                        <el-menu mode="horizontal">
                            <el-menu-item index="3"><i class="el-icon-help"></i>帮助</el-menu-item>
                            <el-submenu index="2">
                                <template slot="title"><i class="el-icon-user-solid"></i>个人中心</template>
                                <el-menu-item index="2-1"><router-link to="/login" class="exit">退出</router-link></el-menu-item>
<!--                                <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--                                <router-link index="2-" to="/login" class="exit">退出</router-link>-->
                            </el-submenu>

                            <el-menu-item index="1"><i class="el-icon-message"></i>消息中心</el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-header>

<!--            以下-->
            <el-container style="height: inherit">
<!--                侧边栏-->

                    <el-aside width="200px" >
                            <el-menu
                                default-active="this.$route.path" router
                                class="el-menu-vertical-demo"
                                background-color="#2c3e50"
                                style="height: 100%"

                            >
                            <el-submenu index="/main/m1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>班级管理</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title"></template>
                                    <el-menu-item index="/main/m1/class">查看班级</el-menu-item>
                                    <el-menu-item index="/main/m1/student">学生管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="/main/m3">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>题库管理</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title"></template>
                                    <el-menu-item index="/main/m3/choice">选择题</el-menu-item>
                                    <el-menu-item index="/main/m3/blanks">填空题</el-menu-item>
                                    <el-menu-item index="/main/m3/describe">简答题</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="/main/m2">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>任务管理</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title"></template>
                                    <el-menu-item index="/main/m2/project">作业管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="/main/m4">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>个人信息</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title"></template>
                                    <el-menu-item index="/main/m4/personal">信息中心</el-menu-item>
                                    <el-menu-item index="/main/m4/change">修改信息</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item index="/main">
                                 <i class="el-icon-menu"></i>
                                  <span slot="title">导航栏</span>
                            </el-menu-item>
                             <el-menu-item index="/main">
                                 <i class="el-icon-menu"></i>
                                 <span slot="title">导航栏</span>
                             </el-menu-item>



                            </el-menu>
                    </el-aside>

                    <el-container class="right">
                        <BreadcrumbNav ></BreadcrumbNav>
                        <router-view style="width: 100%">
                        </router-view>
                    </el-container>
                        <!--                    主体部分-->





            </el-container>


        </el-container>
    </div>
</template>

<script>
    import BreadcrumbNav from "./BreadcrumbNav.vue";
    export default {
        name: "main",
        data(){
            return {
                // breads:[]
            }
        },
        methods: {
            // handleMenuSelect(index,indexPath){
            //     this.breads=indexPath;
            // }
        },
        components:{
            BreadcrumbNav
        }

    }
</script>

<style >
    .my_main .el-header{
        background-color:#2c3e50;

    }
    .my_main .el-menu {
        background-color: #2c3e50;
    }
    .my_main .el-menu--horizontal>.el-menu-item.is-active {
        /*border-bottom: 2px solid #2c3e50;;*/
        /*color: #303133;*/
        color: coral;

    }
    .my_main .el-aside {
        /*border-top: 2px solid #ccc;*/
        overflow:visible;
    }
    .my_main .el-main {
        /*background-color: rebeccapurple;*/
    }
    .my_main .logo {
       font-size: 25px;
        line-height: 60px;
        color: coral;
        padding-left: 30px;

    }
     .exit {
        text-decoration: none;
        color: inherit;
    }
    .my_main .el-menu--horizontal>.el-menu-item {
        float: right;
    }
    .my_main .el-menu--horizontal>.el-submenu {
        float: right;
    }
    .my_main .el-menu--horizontal>.el-submenu .el-submenu__title {
        color: #fff;
    }
    .my_main .el-main {
        background-color: #ccc;
    }
    .my_main .el-submenu__title {
        color: #fff;
    }
    .my_main .el-menu-item {
        color: #fff;
    }
    .my_main .el-menu-item:focus, .el-menu-item:hover {
        color: coral;
    }
    .my_main .el-menu--horizontal>.el-submenu:hover .el-submenu__title{
        color: #303133;
    }
    .my_main .right {
        position: relative;
        padding-top: 40px;
    }

</style>