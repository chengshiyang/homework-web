//这里main.js是我们项目的js入口文件
//1.1，导入 vue
import Vue from "vue"
//2.1 导入vue-router
import VueRouter from "vue-router"
//2.2 手动安装 VueRouter
Vue.use(VueRouter);
// 点击没问题 如果在这个点击页面 在点击一次router-link 就会报这个错 但是不影响功能
//解决办法：
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入ajax
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs';
axios.defaults.baseURL="http://192.168.0.102:8080/";
Vue.use(VueAxios, axios);
// Vue.prototype.$axios = axios; //全局注册
Vue.prototype.qs = qs; //qs.js它的作用是能把json格式的直接转成data所需的格式



//1.2，导入App组件
import app from "./App.vue"
//导入自定义路由模块(抽离路由模块时用)
import router from "./router.js"
//导入Account GoodList组件
// import account from "./components/Account.vue"
// import goodlist from "./components/GoodList.vue"

//2.3创建路由
// var router =new VueRouter({
//     routes:[
//         {path:"./account",component:account},
//         {path:"./goodlist",component:goodlist}
//     ]
// });

//全局过滤器
Vue.filter("index",function (value) {
    return index.value;
});

var vm=new Vue({
    el:"#app",
    data:{
        message:"",
    },


      //简写形式
     render:c => c(app),
    // render:function (createElement) {
    //     return createElement(app)
    //
    // },
    //render函数渲染组件
    ////createElement是一个函数
    //createElement 的第一个参数是必选的，它可以是 {String | Object | Function}中的任何一种 。
    //第二个参数是一个包含模板相关属性的数据对象（比如 class，style，attrs，domProps 等等），只能是对象。
    router, //挂载路由
    axios,

});

