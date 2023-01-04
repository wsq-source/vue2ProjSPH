// 引入一级路由组件
// import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";

const foo = () => {
    console.log("foo 调用了");
    return import("@/pages/Home");
};

/* 
    当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
    如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
*/
// 路由配置信息
export default [
    // home
    {
        path: "/home",
        // component: Home,
        component: foo,
        meta: { showFooter: true }
    },
    // search
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
    // login
    {
        path: "/login",
        component: Login,
        meta: { showFooter: false }
    },
    // register
    {
        path: "/register",
        component: Register,
        meta: { showFooter: false }
    },
    // detail
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { showFooter: true}
    },
    // addcartsuccess
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: { showFooter: true }
    },
    // shopcart
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { showFooter: true }
    },
    // trade
    {
        path: "/trade",
        component: Trade,
        meta: { showFooter: true },
        // 路由独享首位
        beforeEnter: (to, from, next) => {
            // 从/shopcart来才让进入
            if(from.path === "/shopcart" || from.path === "/"){
                next();
            }else{
                // 中断当前的导航, 从其他地方来的重置到from来的路由位置
                next(false);
            }
        },
    },
    // pay
    {
        path: "/pay",
        component: Pay,
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            // 从/trade来的才让进入
            if(from.path === "/trade" || from.path === "/"){
                next();
            }else{
                // 从其他地方来的不跳转
                next(false);
            }
        },
    },
    // paysuccess
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { showFooter: true },
        // 这里写组件内守卫, 见PaySuccess.vue
        /* beforeEnter: (to, from, next) => {
            // 从/pay来的才让进入
            if(from.path === "/pay" || from.path === "/"){
                next();
            }else{
                // 从其他地方来的不跳转
                next(false);
            }
        }, */
    },
    // center
    {
        path: "/center",
        component: Center,
        meta: { showFooter: true },
        // 二级路由组件
        children: [
            {
                path: "myorder",
                component: MyOrder,
            },
            {
                path: "grouporder",
                component: GroupOrder,
            },
            // 重定向到myorder路由
            {
                path: "/center",
                redirect: "/center/myorder", // /center不写也能重定向
            }
        ],
    },
    // 重定向, 在项目跑起来时, 访问/, 立马让它定向到首页
    {
        path: "*",
        redirect: "/home",
    },
];