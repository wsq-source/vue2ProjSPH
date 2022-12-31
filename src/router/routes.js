// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";

// 路由配置信息
export default [
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
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { showFooter: true}
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: { showFooter: true }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { showFooter: true }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { showFooter: true }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { showFooter: true }
    },
    // 重定向, 在项目跑起来时, 访问/, 立马让它定向到首页
    {
        path: "*",
        redirect: "/home",
    },
];