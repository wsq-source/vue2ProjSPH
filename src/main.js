import Vue from "vue";
import App from "./App.vue";

// 三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
// 第一个参数: 全局组件的名字  第二个参数: 哪一个组件
// Vue.component("TypeNav", TypeNav);
Vue.component(TypeNav.name, TypeNav);

import router from "./router/index";

// 引入仓库
import store from "./store/index";

// 引入mock数据
import "@/mock/mockServer";

// 引入swiper样式
import "swiper/dist/css/swiper.css";

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router, // 注册路由, 当这里书写router的时候, 组件身上都拥有$route, $router属性
    store, // 注册store, 组件身上会多一个属性$store属性
}).$mount("#app");
