// 用户登录注册小仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";

import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
    code: "",
    token: getToken(),
    userInfo: {},
};
// 注意: vuex存储数据不是持久化的
const mutations = {
    GETCODE(state, code){
        state.code = code;
    },
    USERLOGIN(state, token){
        state.token = token;
    },
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        // 清空vuex仓库数据
        state.token = "";
        state.userInfo = {};
        // 清除本地存储token
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({commit}, phone){
        // 获取验证码的接口把验证码返回了, 但是正常情况应该是后台把验证码发到用户手机上
        let result = await reqGetCode(phone);
        if(result.code === 200){
            commit("GETCODE", result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("failed"));
        }
    },
    // 用户注册
    async userRegister({commit}, user){
        let result = await reqUserRegister(user);
        // console.log(result);
        if(result.code === 200){
            return "ok";
        }else{
            return Promise.reject(new Error("failed"));
        }
    },
    // 用户登录(token)
    async userLogin({commit}, user){
        let result = await reqUserLogin(user);
        // 服务器下发token, 用户唯一标识符(类似于uuid)
        // 将来经常通过带token找服务器要用户信息进行展示
        if(result.code === 200){
            commit("USERLOGIN", result.data.token);
            // 持久化存储token
            // localStorage.setItem("TOKEN", result.data.token);
            setToken(result.data.token);
            return "ok";
        }else{
            return Promise.reject(new Error("failed"));
        }
    },
    // 获取用户信息(携带token)
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code === 200){
            commit("GETUSERINFO", result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("getUserInfo failed"));
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout();
        if(result.code === 200){
            // action中不能操作state, 提交给mutations去修改
            commit("CLEAR");
            return "ok";
        }else{
            return Promise.reject(new Error("userLogout failed"));
        }
    },
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}