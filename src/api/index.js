// 当前这个模块: api进行统一管理
import requests from "./ajax"; // requests是封装过的axios

import mockRequests from "./mockAjax";

// 三级联动接口
// /api/product/getBaseCategoryList GET 无参数
// 发请求: axios发请求返回结果是Promise对象
export const reqCategoryList = () => {
    return requests({
        url: "/product/getBaseCategoryList",
        method: "get"
    });
};

// 获取banner
export const reqGetBannerList = () => {
    return mockRequests.get("/banner");
};

// 获取floor数据
export const reqFloorList = () => {
    return mockRequests.get("/floor");
}

// 获取Search模块的数据
// /api/list  post
/**
 *  参数:
 *      {
 *          "category3Id": "61",
 *          "categoryName": "手机",
 *          "keyword": "小米",
 *          "order": "1:desc",
 *          "pageNo": 1,
 *          "pageSize": 10,
 *          "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
 *          "trademark": "4:小米"
 *      }
 *
 */
// 需要接受外部的参数
// 当前这个接口, 给服务器传递的参数params, 至少是一个空对象
export const reqGetSearchInfo = (params = {}) => {
    return requests({
        url: "/list",
        method: "post",
        data: params
    })
}