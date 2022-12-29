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

// 获取产品详细信息的接口  /api/item/{skuId}  get
export const reqGoodsInfo = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: "get",
    })
}

// 将产品添加到购物车中(获取更新某一个产品的个数)
// /api/cart/addToCart/{skuId}/{skuNum}  post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: "post",
    })
}

// 获取购物车列表数据的接口
// /api/cart/cartList  get
export const reqCartList = () => {
    return requests({
        url: "/cart/cartList",
        method: "get",
    })
}

// 删除购物产品的接口
// /api/cart/deleteCart/{skuId}  delete
export const reqDeleteCartById = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: "delete",
    })
}

// 修改商品的选中状态(0 未选中, 1 选中)
// /api/cart/checkCart/{skuId}/{isChecked}  get
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: "get",
    })
}

// 获取注册验证码
// /api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: "get",
    })
}

// 用户注册
// /api/user/passport/register  post  phone,code,password
export const reqUserRegister = (data) => {
    return requests({
        url: "/user/passport/register",
        data,
        method: "post",
    })
}

// 用户登录
// /api/user/passport/login  post  phone,password
export const reqUserLogin = (data) => {
    return requests({
        url: "/user/passport/login",
        data,
        method: "post",
    })
}