<template>
<div id="app" style="height: 100%">
    <router-view v-if="isRouterAlive"></router-view>
</div>

</template>

<script>
export default {
    name:"app",
    //利用provide/inject实现自动刷新
    provide(){
        return{
            reload:this.reload
        }
    },
    data() {
        return {
            isRouterAlive:true
        }

    },
    methods:{
        reload() {
            // console.log(this.isRouterAlive);
            this.isRouterAlive = false;
            // console.log(this.isRouterAlive);
            this.$nextTick(function () {
                this.isRouterAlive = true;
            })
        }

    }
}
</script>

<style scoped>
    /*.el-header{*/
    /*    background-color: red;*/
    /*}*/
    /*.el-aside {*/
    /*    background-color: green;*/
    /*}*/
    /*.el-components {*/
    /*    background-color: rebeccapurple;*/
    /*}*/

</style>