import { v4 as uuidv4 } from "uuid";

// 要生成一个随机的字符串, 且每次执行不能发生变化, 游客身份持节存储
export const getUUID = ()=>{
    // 检查本地存储有没有
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    if(!uuid_token){
        // 没有就生成游客临时身份并存储
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    // 没返回值是undefined
    return uuid_token;
}