// 引入
import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

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
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition){
        return { y: 0 }; // 代表滚动条在最上方
    }
});

// 全局前置守卫(在路由跳转前进行判断)
router.beforeEach(async (to, from, next) => {
    // to, 可以获取到需要跳转的路由信息
    // from, 可以获取到从哪个路由来的信息
    // next, 放行的函数. next()全部放行, next("/login")放行到指定路由, next(false)重置到from来的路由位置
    // console.log(from, to);

    // 获取仓库中的token, 判断用户是否登录
    let token = store.state.user.token;
    // 获取用户信息
    let name = store.state.user.userInfo.name;

    // 判断用户有没有登录
    if(token){
        // 用户已登录还想去/login, 拒绝并跳转在首页
        if(to.path === "/login" || to.path === "/register"){
            next("/home");
        }else{
            // 登录了, 去的不是/login(home|search|detail|shopcart)
            // 如果有用户信息
            if(name){
                next();
            }else{
                // 没有用户信息, 派发action, 让仓库存储用户信息再跳转
                try {
                    // 在路由跳转之前获取用户信息成功, 有则放行
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token失效了, 清除token, 让用户重新登录
                    await store.dispatch("userLogout");
                    next("/login");
                }
            }  
        }
    }else{
        let toPath = to.path;
        // 未登录, 不能去交易相关、支付相关、个人中心
        if(toPath.includes("/trade") || toPath.includes("/pay") || toPath.includes("/center")){
            // 把未登录时想去但去不了的路径的信息, 存储于路由中
            next("/login?redirect=" + toPath);
        }else{
            next();
        }
    }
});

export default router;
