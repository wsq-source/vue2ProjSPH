const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy:{
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {"^/api": ""},
      },
    }
  },
  productionSourceMap: false, // 打包时成不生成map文件, false不生成
})
