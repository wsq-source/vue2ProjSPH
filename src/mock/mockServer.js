import Mock from "mockjs"; // 引入mockjs模块

// 引入json数据(json数据个数没向外暴露, 但是可以引入)
// webpack默认对外暴露: 图片, json数据
import banner from "./banner.json";
import floor from "./floor.json";

// 模拟数据
/**
 *  Mock.mock(reqUrl, reqData)
 *      - reqUrl 请求地址
 *      - reqData 请求数据
 */
Mock.mock("/mock/banner", { code: 200, data: banner }); // 轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor }); // 底部数据
