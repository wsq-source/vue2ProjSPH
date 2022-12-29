import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api/index";

const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车列表的数据
    async getCartList({commit}){
        let result = await reqCartList();
        console.log(result);
        if(result.code === 200){
            commit("GETCARTLIST", result.data);
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit}, skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code === 200){
            return "ok";
        }else{
            Promise.reject(new Error("failed"));
        }
    },
    // 修改某个产品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}){
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if(result.code === 200){
            return "ok";
        }else{
            Promise.reject(new Error("failed"));
        }
    },
    // 删除选中的产品
    deleteAllCheckedCart({dispatch, getters}){
        // context 小仓库, commit getters dispatch state
        // 获取购物车中全部的产品
        let cartInfoList = getters.cartList.cartInfoList
        let promiseAll = [];
        cartInfoList.forEach(item => {
            if(item.isChecked === 1){
                // 将每一次返回的promise添加到数组中
                let promise = dispatch("deleteCartListBySkuId", item.skuId);
                promiseAll.push(promise);
            }
            // item.isChecked === 1 && dispatch("deleteCartListBySkuId", item.skuId);
        });
        return Promise.all(promiseAll);
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch, state, getters}, isChecked){
        let promiseAll = [];
        // 注意在getters中cartList是一个对象, 而在state中cartList是一个数组
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch("updateCheckedById", {skuId: item.skuId, isChecked});
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    },
};
// 简化数组
const getters = {
    cartList(state){
        return state.cartList[0] || {};
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
}