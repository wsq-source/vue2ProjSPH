// vue插件要暴露一个对象
let myPlugin = {};

myPlugin.install = function (Vue, options) {
    // Vue.prototype.$bus 任何组件都能使用
    // Vue.directive
    // Vue.component
    // Vue.filter

    // 全局自定义指令
    Vue.directive(options.name, (el, params) => {
        el.innerHTML = params.value.toUpperCase();
    });


    // console.log("myPlugin is invoked");
    // console.log(Vue, options);
}

export default myPlugin;