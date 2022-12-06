// 当前这个模块: api进行统一管理
import requests from "./request"; // requests是封装过的axios

// 三级联动接口
// /api/product/getBaseCategoryList GET 无参数
// 发请求: axios发请求返回结果是Promise对象
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: "get" });

