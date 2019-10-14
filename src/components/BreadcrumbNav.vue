<template>

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">教师端</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item) in breadlist" :key="item.path" >
                <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>


</template>

<script>
    export default {
        name: "BreadcrumbNav",
        data(){
            return {
                breadlist:null
            }

        },
        mounted() {
            this.getBreadcrumb();
        },

        watch:{
            $route(){ //监听路由变化
                this.getBreadcrumb();
            }
        },
        methods:{
            // 通过watch来监听$route的值让Breadcrumb与 route同步
            getBreadcrumb(){
                // 通过$route.matched 得到面包屑的标题的数组 filter筛选一下数组中存在meta和meta.title的对象。
                // let matched=this.$router.matched.filter(item=>item.meta&&item.meta.title);
                //这里是一个大坑，$router 和 $route
                //$router 1.router是VueRouter的一个对象，通过Vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，
                   // 这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。
                //$route 2.route是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，
                // 可以获取对应的name,path,params,query等 // 我们可以从vue devtools中看到每个路由对象的不同
                let matched=this.$route.matched.filter(item=>item.meta&&item.meta.title);
                this.breadlist=matched;
            }
        }
    }
</script>

<style >
.el-breadcrumb {
    display: inline-block;
    line-height: 50px;
    position: absolute;
    top: 5px;
    left: 20px;
}
.el-breadcrumb__inner a {
    font-weight: normal;
}
</style>