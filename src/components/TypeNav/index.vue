<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派(委托) -->
            <div @mouseleave="leaveShowSort" @mouseenter="enterShowSort">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="showSort">
                        <!-- 利用事件委派 + 编程式导航实现路由的跳转与传递参数 -->
                        <div class="all-sort-list2" @click="goSearch($event)">
                            <div
                                class="item"
                                v-for="(c1, index) in categoryList"
                                :key="c1.categoryId"
                                :class="{ cur: currentIndex === index }"
                            >
                                <h3 @mouseenter="changeIndex(index)">
                                    <a
                                        :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId"
                                        >{{ c1.categoryName }}</a
                                    >
                                    <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div
                                    class="item-list clearfix"
                                    :style="{
                                        display:
                                            currentIndex === index ? 'block' : 'none',
                                    }"
                                >
                                    <div
                                        class="subitem"
                                        v-for="c2 in c1.categoryChild"
                                        :key="c2.categoryId"
                                    >
                                        <dl class="fore">
                                            <dt>
                                                <a
                                                    :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId"
                                                    >{{ c2.categoryName }}</a
                                                >
                                                <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="c3 in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        :data-categoryName="
                                                            c3.categoryName
                                                        "
                                                        :data-category3Id="c3.categoryId"
                                                        >{{ c3.categoryName }}</a
                                                    >
                                                    <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"; // 把lodash全部功能函数引入, 最好按需加载

export default {
    name: "TypeNav",
    data() {
        return {
            // 存储用户鼠标移到哪一个分类
            currentIndex: -1,
            showSort: true,
        };
    },
    // 组件挂载完毕: 可以向服务器发请求
    mounted() {
        // 放在App.vue的mounted()中, 只发一次请求
        // 通知vuex发请求, 获取数据, 存储于仓库中
        // this.$store.dispatch("categoryList");

        // 组件挂载完毕, 让showSort属性变为false
        // 如果不是Home路由组件, 将TypeNav进行隐藏
        if (this.$route.path !== "/home") {
            this.showSort = false;
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数, 当使用这个计算属性时, 右侧函数会立即执行一次
            // 会注入一个参数state, 即大仓库中的数据
            categoryList(state) {
                return state.home.categoryList;
            },
        }),
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex属性
        /* changeIndex(index) {
            // index 鼠标移入某一个一级分类的元素的索引值
            // 正常情况(用户慢慢地操作) 鼠标进入, 每一个一级分类h3都会触发鼠标进入事件
            // 非正常情况(用户操作很快) 全部地一级分类都应该触发鼠标进入事件, 但经过测试, 只有部分h3触发了
            // 就是由于用户行为过快, 导致浏览器反应不过来. 如果当前回调函数有大量业务, 则有可能出现卡顿现象.
            this.currentIndex = index;
            console.log("鼠标进入",this.currentIndex);
        }, */
        // throttle节流函数别用箭头函数, 可能出现上下文this的问题
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
            // console.log("鼠标进入", this.currentIndex);
        }, 50),

        // 一级分类鼠标移出的事件回调
        leaveShowSort() {
            // 鼠标移出, 让currentIndex变为-1
            this.currentIndex = -1;
            // console.log("鼠标移出",this.currentIndex);

            // 路由为/search时, 让商品分类列表进行隐藏
            if (this.$route.path !== "/home") {
                this.showSort = false;
            }
        },
        // 路由跳转
        goSearch(e) {
            // 最好的方案: 编程式导航 + 事件委派
            // 利用事件委派存在一些问题: 1.点击的一定是a标签 2.如何获取参数(1,2,3级分类的产品名字和id)
            // 事件委派, 是把所有的子节点(h3,dt,dl,em)的事件委派给父节点
            // 点击a标签才能进行路由跳转, 怎么确定点击的一定是a标签
            // 另外一个问题: 即使能确定点击的是a标签, 如何区分是一级、二级、三级分类的a标签

            // 第一个问题: 为子结点中的a标签加上自定义属性 data-categoryName, 其余的子节点是没有的
            let element = e.target;
            // 获取到当前出发这个事件的节点(h3,a,dt,dl), 需要带有 data-categoryName 这样的节点一定是a标签
            // 节点有一个dataset属性, 可以获取到节点的自定义属性和属性值
            // console.log(element, element.dataset);

            // dataset中的属性都是小写的, 解构出来放到query中要把id改成Id
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            // 如果标签身上拥有categoryname一定是a标签
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: "search" };
                let query = { categoryName: categoryname };
                // 一级分类、二级分类、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }

                // 判断: 如果路由跳转的时候, 带有params参数, 捎带着传递过去
                // 如果点击左侧列表分类里的数据时, 路由上已经有了params参数(Header中keyword参数), 则将其加入location配置对象中
                // this.$route.params是存在的属性, 没有赋值是null, null转换成boolean是true, 所以不必在if外再写this.$router.push()了
                if(this.$route.params){
                    location.params = this.$route.params;
                    // 整理完参数
                    location.query = query;
                    this.$router.push(location);
                }
            }
        },
        // 当鼠标移入时, 让商品列表进行展示
        enterShowSort() {
            if (this.$route.path !== "/home") {
                this.showSort = true;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27.3px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    /* &:hover {
                        // background-color: skyblue;
                        .item-list {
                            display: block;
                        }
                    } */
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }

        // 过渡动画的样式
        // 过渡动画开始状态(进入)
        .sort-enter{
            height: 0;
        }
        // 过渡动画的结束状态
        .sort-enter-to{
            height: 461px;
        }
        // 定义动画时间, 速率
        .sort-enter-active{
            transition: all 0.5s ease-in; // ease-in 加速运动
        }
    }
}
</style>
