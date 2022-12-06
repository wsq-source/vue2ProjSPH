import { reqCategoryList } from "@/api";

// home模块的小仓库
const state = {
    // state中的数据默认初始值别瞎写(根据接口返回值进行初始化)
    categoryList: [],
};
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList;
    },
};
const actions = {
    // 通过调用api中的接口函数发服务器请求, 获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        console.log(result);
        if(result.code === 200){
            commit("CATEGORYLIST",result.data);
        }
    },
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
};