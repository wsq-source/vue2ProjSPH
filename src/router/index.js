// 引入
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter);

// 引入路由配置信息
import routes from "./routes";

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
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition){
        return { y: 0 }; // 代表滚动条在最上方
    }
})
