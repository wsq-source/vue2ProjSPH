// 对于axios进行二次封装
import axios from "axios";
// 引入进度条  start进度条开始 done进度条结束
import nProgress from "nprogress";
// 引入进度条样式 修改进度条颜色去nprogress.css修改 #nprogress .bar
import "nprogress/nprogress.css";

// 在当前模块中引入store
import store from "@/store";


// 1.利用axios对象的create方法, 去创建一个axios实例
// 2.request就是axios, 只不过稍微配置了一下
const requests = axios.create({
    // 配置对象
    baseURL: "/api", // 基础路径, 发请求的时候, 路径中会出现/api
    timeout: 5000, // 代表请求超时的时间5s
});

// 请求拦截器: 在发请求之前, 请求拦截器可以监测到, 可以在请求发出前做一些事情
requests.interceptors.request.use((config) => {
    // config: 配置对象, 对象里面有一个属性很重要, headers请求头
    // 进度条开始动
    nProgress.start();
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段, 和后端商量好的
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    return config;
});

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        // 成功的回调函数: 服务器响应数据回来以后, 响应拦截器可以监测到, 可以做一些事情
        // 进度条结束
        nProgress.done();
        return res.data;
    },
    (err) => {
        // 响应失败的回调函数
        return Promise.reject(new Error("fail"));
    }
);

export default requests;
