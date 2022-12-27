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