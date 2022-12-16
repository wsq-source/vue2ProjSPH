import { reqGetSearchInfo } from "@/api";


// search模块的小仓库
const state = {
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList;
    },
};
const actions = {
    // 获取search模块数据
    // params形参是当用户派发action的时候, 第二个参数传递的, 至少是一个空对象
    async getSearchList({commit}, params){
        let result = await reqGetSearchInfo(params);
        if(result.code === 200){
            commit("GETSEARCHLIST", result.data);
        }
    },
};
// 计算属性: 在项目中, 是为了简化数组的
// 可以把将来在组件中需要用的数据简化一下(组件在获取数据时就方便了)
const getters = {
    // state是当前仓库的state, 并非大仓库中的state
    goodsList(state){
        // searchList可能是个空对象, 没有goodsList
        // 如果服务器的数据回来了, 返回一个数组
        // 如果网络不好state.searchList.goodsList应该返回的是undefined, undefined遍历时会报错
        // 计算新的属性的属性值至少应该返回一个数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
