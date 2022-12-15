import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

// home模块的小仓库
const state = {
    // state中的数据默认初始值别瞎写(根据接口返回值进行初始化)
    categoryList: [],
    bannerList: [], // 轮播图的数据
    floorList: [], // 底部的数据
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList;
    }
};
const actions = {
    // 通过调用api中的接口函数发服务器请求, 获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code === 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    // 获取首页轮播图地数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        // console.log(result);
        if (result.code === 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    // 获取floor数据
    async getFloorList({commit}){
       let result = await reqFloorList();
       if(result.code === 200){
        commit("GETFLOORLIST", result.data);
       }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
};
