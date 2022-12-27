import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api/index";
import { getUUID } from "@/utils/uuid_token"; // uuid模块, 用于辨认游客身份, 生成一个随机的字符串(不能再变了)

const state = {
    goodInfo: {},
    uuid_token: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    // 获取产品信息的action, commit是从context中解构出来的
    async getGoodInfo({commit}, skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code === 200){
            commit("GETGOODINFO", result.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit}, {skuId, skuNum}){
        // 加入购物车以后(发请求), 前台将参数带给服务器
        // 服务器写入数据成功, 并没有返回其他的数据, 只是返回code=200代表这一次操作成功
        // 因为服务器没有返回其余数据, 因此不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 当前这个函数如果执行返回一个Promise对象
        // async函数执行一定返回一个Promise
        // 加入购物车成功
        if(result.code === 200){
            return "ok";
        }else{
            // 加入购物车失败
            return Promise.reject(new Error("failed"));
        }
    },
};
// 简化数组
const getters = {
    // 路径导航
    // state.goodInfo初始状态是个空对象, 空对象的categoryView属性值是undefined
    categoryView(state){
        // 当前计算出的 categoryView属性值至少是一个空对象, 假的报错就不会有了
        return state.goodInfo.categoryView || {};
    },
    // 产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    // 平台售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
}