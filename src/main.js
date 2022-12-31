import Vue from "vue";
import App from "./App.vue";

// 三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { Button, MessageBox } from "element-ui";

// 第一个参数: 全局组件的名字  第二个参数: 哪一个组件
// Vue.component("TypeNav", TypeNav);
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 注册为全局组件
Vue.component(Button.name, Button);
// ElementUI注册组件时的另一种写法, 挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from "./router/index";

// 引入仓库
import store from "./store/index";

// 引入mock数据
import "@/mock/mockServer";

// 引入swiper样式
import "swiper/dist/css/swiper.css";

// 统一接收api文件夹里面的请求函数
import * as API from "@/api";

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router, // 注册路由, 当这里书写router的时候, 组件身上都拥有$route, $router属性
    store, // 注册store, 组件身上会多一个属性$store属性
    beforeCreate(){
        // 配置全局事件总线$bus
        Vue.prototype.$bus = this;
        // 配置全局$API到Vue原型上, 组件直接 this.$API.xxx发请求即可
        Vue.prototype.$API = API;
    },
}).$mount("#app");
