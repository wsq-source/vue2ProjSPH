// 用户登录注册小仓库
import { reqGetCode, reqUserRegister, reqUserLogin } from "@/api";

const state = {
    code: "",
    token: "",
};
// 注意: vuex存储数据不是持久化的
const mutations = {
    GETCODE(state, code){
        state.code = code;
    },
    USERLOGIN(state, token){
        state.token = token;
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
            return "ok";
        }else{
            return Promise.reject(new Error("failed"));
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