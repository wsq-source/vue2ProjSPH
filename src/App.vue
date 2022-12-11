<template>
    <div>
        <Header />
        <!-- 路由组件出口 -->
        <router-view></router-view>

        <!-- 在Home、Search中显示, 在Search、Register中隐藏 -->
        <!-- 可以 -->
        <!-- <Footer v-show="$route.path==='/home' || $route.path==='/search'"/> -->
        
        <!-- 可以 -->
        <!-- <Footer v-show="isShowFooter" /> -->

        <!-- 可以 -->
        <!-- <Footer v-show="showFooter()" /> -->
        <!-- 最终方案 -->
        <Footer v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
    name: "",
    data() {
        return {
            isShowFooter: this.$route.path.includes("/home") || this.$route.path.includes("/search"),
        };
    },
    components: { Header, Footer },
    mounted() {
        // 通知vuex发请求, 获取数据, 存储于仓库中
        // 在App.vue的mount()中, 一挂载就发请求且请求只发一次, 提升性能
        // 不要写在main.js中, this是undefined, 不是组件实例
        this.$store.dispatch("categoryList");
        
        console.log(this);
    },
    updated(){
        console.log(this.$route.path);
    },
    methods: {
        showFooter(){
            return this.$route.path === "/home" || this.$route.path === "/search";
        },
    },
};
</script>

<style lang="css"></style>
