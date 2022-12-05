import Vue from "vue";
import App from "./App.vue";

// 三级联动组件--全局组件
import TypeNav from "@/pages/Home/TypeNav";
// 第一个参数: 全局组件的名字  第二个参数: 哪一个组件
// Vue.component("TypeNav", TypeNav);
Vue.component(TypeNav.name, TypeNav);

import router from "./router/index";

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router, // 注册路由, 当这里书写router的时候, 组件身上都拥有$route, $router属性
}).$mount("#app");
