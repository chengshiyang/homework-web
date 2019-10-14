//导入router
import VueRouter from "vue-router"
//导入路由组件
// import account from "./main/Main.vue"
// import goodlist from "./main/Login.vue"
import Login from "./components/Login.vue";
import Main from "./components/Main.vue"
import M1 from "./components/classManagement/M1.vue"
import M2 from "./components/projectManagement/M2.vue"
import M3 from "./components/questionsManagement/M3.vue"
import M4 from "./components/profileManagement/M4.vue"

import Class from "./components/classManagement/Class.vue"
import Student from "./components/classManagement/Student.vue"
import Choice from "./components/questionsManagement/Choice.vue"
import Blanks from "./components/questionsManagement/Blanks.vue"
import Describe from "./components/questionsManagement/Describe.vue"
import Project from "./components/projectManagement/Project.vue"
import Personal from "./components/profileManagement/Personal.vue"
import Change from "./components/profileManagement/Change.vue"
//导入Account的子组件
// import login from "./subcom/login.vue"
// import register from "./subcom/register.vue"
// import test from "./main/test.vue"
//创建路由对象
var router =new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/login'  //重定向
        },
        {   path:"/login",     //url链接前面不加.
            component:Login,
            name: 'Login',
        },
        {
            path:"/main",
            component:Main,
            name:"Main",
            // meta:{title:"主页"},
            children:[
                {
                    path:"m1",
                    component:M1,
                    redirect: 'm1/class',
                    meta:{title:"班级管理"},
                    children: [
                        {
                            path:"class",
                            component:Class,
                            name:"Class",
                            meta:{title:"查看班级"},
                        },
                        {
                            path:"student",
                            component:Student,
                            name:"Student",
                            meta:{title:"学生管理"},
                        },
                    ]

                },
                {
                    path:"m3",
                    component:M3,
                    redirect: 'm3/choice',
                    meta:{title:"题库管理"},
                    children:[
                        {
                            path:"choice",
                            component:Choice,
                            name:"Choice",
                            meta:{title:"选择题"},
                        },
                        {
                            path:"blanks",
                            component:Blanks,
                            name:"Blanks",
                            meta:{title:"填空题"},
                        },
                        {
                            path:"describe",
                            component:Describe,
                            name:"Describe",
                            meta:{title:"简答题"},
                        },
                    ]
                },
                {
                    path:"m2",
                    component:M2,
                    redirect: 'm2/project',
                    meta:{title:"任务管理"},
                    children:[
                        {
                            path:"project",
                            component:Project,
                            name:"Project",
                            meta:{title:"作业管理"},
                        },
                    ]
                },
                {
                    path:"m4",
                    component:M4,
                    redirect: 'm4/personal',
                    meta:{title:"个人信息"},
                    children:[
                        {
                            path:"personal",
                            component:Personal,
                            name:"Personal",
                            meta:{title:"信息中心"},
                        },
                        {
                            path:"change",
                            component:Change,
                            name:"Change",
                            meta:{title:"修改信息"},
                        },
                    ]
                },


            ]
        },

    ]
});
//把路由对象暴露出去
export default router;