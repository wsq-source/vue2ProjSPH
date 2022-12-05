// 引入
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// console.log(VueRouter.prototype);
// 先把VueRouter原型对象的push和replace方法, 先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push与replace
// 第一个参数location: 告诉原来push方法, 往哪里跳转以及传递哪些参数
// 第二个参数: 成功回调
// 第三个参数: 失败回调
// call和apply
// 相同点: 都可以调用函数一次, 都可以篡改函数的上下文一次
// 不同点: call传递参数时用逗号隔开, apply传递参数时传递数组
VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve && reject){
        originPush.call(this, location, resolve, reject); // 修改this指向为当前VueRouter的实例
    }else{
        originPush.call(this, location, ()=>{}, ()=>{});
    }
};
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        originReplace.call(this, location, resolve, reject); // 修改this指向为当前VueRouter的实例
    }else{
        originReplace.call(this, location, ()=>{}, ()=>{});
    }
};



// 配置路由
export default new VueRouter({
    routes:[
        {
            path: "/home",
            component: Home,
            meta: { showFooter: true }
        },
        {
            name: "search",
            path: "/search/:keyword?",
            component: Search,
            meta: { showFooter: true },
            // 路由组件能不能传递props数据?
            // 1.布尔值写法: 只能传递params参数, true是传, false是不传
            // props: true,
            // 2.对象写法: 额外的给路由组件传递一些props参数
            // props: { a: 1, b: 2 },
            // 3.函数写法: 可以把params参数、query参数, 通过props传递给路由组件
            // 接收App组件的 this.$route作为参数, 通过 $route获取里面的query和params
            props($route){
                return {
                    keyword: $route.params.keyword,
                    k: $route.query.k,
                }
            },
        },
        {
            path: "/login",
            component: Login,
            meta: { showFooter: false }
        },
        {
            path: "/register",
            component: Register,
            meta: { showFooter: false }
        },
        // 重定向, 在项目跑起来时, 访问/, 立马让它定向到首页
        {
            path: "*",
            redirect: "/home",
        }
    ]
})
