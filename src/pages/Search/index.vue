<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread: 面包屑, 带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 关键字(keyword)的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 分类(categoryName)的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 品牌(trademark)的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(":")[1]}}
              <i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <!-- 排序方式导航 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 动态添加类名 active -->
                <!-- <li :class="isActiveOne ? 'active' : ''"> -->
                <!-- <li :class="{ active: searchParams.order.indexOf('1') != -1 }"> -->
                <li :class="{ active: isActiveOne }" @click="changeOrder('1')">
                  <a>综合 <span v-show="isActiveOne" class="iconfont" :class="{'icon-shangjiantou': orderAsc, 'icon-xiajiantou': orderDesc}"></span></a>
                </li>
                <!-- <li :class="isActiveTwo ? 'active' : ''"> -->
                <!-- <li :class="{ active: searchParams.order.indexOf('2') != -1 }"> -->
                <li :class="{ active: isActiveTwo }" @click="changeOrder('2')"> 
                  <a>价格 <s  pan v-show="isActiveTwo" class="iconfont" :class="{'icon-shangjiantou': orderAsc, 'icon-xiajiantou': orderDesc}"></s></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候带上id(params参数) -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      :title="good.title"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 测试阶段, 将来数据需要替换为来自服务器的数据 -->
          <Pagination :pageNo="searchParams.pageNo" 
          :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data(){
    return {
      // 带给服务器的参数
      searchParams: {
        category1Id: this.$route.query.category1Id,
        category2Id: this.$route.query.category2Id,
        category3Id: this.$route.query.category3Id,
        categoryName: this.$route.query.categoryName,
        keyword: this.$route.params.keyword,
        order: "1:desc", // 初始值按综合降序排序
        pageNo: 1,
        pageSize: 10,
        props: [], // 平台售卖属性操作带的参数
        trademark: "", // 品牌
      },
    };
  },
  // 当组件挂在完毕之前执行一次(先于mounted之前, created也行)
  beforeMount(){
    // 在发请求之前, 把接口需要的参数进行整理(服务器会返回查询的数据)
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // this.searchParams = [...this.searchParams, this.$route.query, this.$route.params]; // 不行
  },
  // 组件挂载完毕执行一次(仅一次)
  mounted() {
    // 测试接口返回的数据格式
    // 在发请求带给服务器的参数(searchParams发生变化, 有数值带给服务器)
    this.getData();
  },
  computed: {
    // mapGetters里面的写法, 传递一个数组, 因为getters计算是没有划分(home, search)模块的
    ...mapGetters(["goodsList", "trademarkList", "attrsList"]),
    ...mapState({
      total(state){
        return state.search.searchList.total;
      },
      /* continues(state){
        return state.search.searchList.continues;
      }, */
    }),
    isActiveOne(){
      return this.searchParams.order.split(':')[0] == 1;
    },
    isActiveTwo(){
      return this.searchParams.order.split(':')[0] == 2;
    },
    orderAsc(){
      return this.searchParams.order.split(":")[1] == "asc";
    },
    orderDesc(){
      return this.searchParams.order.split(":")[1] == "desc";
    },
  },
  methods: {
    // 向服务器发请求获取search模块数据(根据参数不同返回不同的数据)
    // 把这次请求封装为一个函数, 但需要调用的时候调用即可
    getData(){
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除面包屑中分类的名字(点击三级分类列表出来的)
    removeCategoryName(){
      // 置空带给服务器的请求参数
      // 带给服务器的参数说明了是可有可无的, 如果属性值为空的字符串还会把相应的字段带给服务器
      // 但是把相应的字段变为undefined, 那么当前这个字段就不会带给服务器了(优化性能)
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData(); // 再向服务器发请求
      // 地址栏也需要改: 进行路由跳转(现在是跳转到自己这里)
      // 如果带有params参数, 则携带它进行push路由跳转
      // 注意: 本意是删除query参数, 如果有params参数应该带着进行push路由跳转
      if(this.$route.params){
        this.$router.push({name: "search", params: this.$route.params});
      }
    },
    // 删除面包屑分类中的keyword(通过Header模块的搜索按钮)
    removeKeyword(){
      this.searchParams.keyword = undefined;
      this.getData(); // 再向服务器发请求
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clearKeyword");
      if(this.$route.query){
        this.$router.push({name: "search", query: this.$route.query});
      }
    },
    // 自定义事件trademarkInfo的回调
    trademarkInfo(trademark){
      // 整理参数 "id: 品牌名称" -- 这里不是合并参数(beforeMount), 而是将searchParams中的空的trademark进行替换
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 发请求
      this.getData();
    },
    // 删除面包屑分类中的trademark(通过点击品牌来的)
    removeTrademark(){
      this.searchParams.trademark = undefined; // 有bug? 改成""
      this.getData();
      // 这里点击品牌不会影响路由
      /* if(this.$route.params || this.$route.query){
        this.$router.push({name: "search", query: this.$route.query, params: this.$route.params});
      } */
    },
    // 收集平台售卖属性的回调函数(自定义事件)
    attrInfo(attr, attrValue){
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组中不包含新的props才push进去
      // if(this.searchParams.props.indexOf(props) === -1){ // 等于-1表示没有该元素
      if(!this.searchParams.props.includes(props)){
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    // 删除面包屑分类中的attr(平台售卖属性)
    removeAttr(index){
      // this.searchParams.props[index] = "";
      // 删除数组中的一个元素 arr.splice(index)
      this.searchParams.props.splice(index, 1); // 整理参数
      this.getData();
    },
    // 接收到的flag不能传数值类型, 传字符串!
    changeOrder(flag){
      // flag 代表用户用户点击的是什么  1综合, 2价格 用户点击时传递进来的
      let originOrder = this.searchParams.order; // 起始order
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      // 准备一个新的order的属性值
      let newOrder = ""; 
      if(flag === originFlag){
        newOrder = `${originFlag}:${originSort === "desc"?"asc":"desc"}`;
      }else{
        // 和升降序上次一致还是默认降序
        newOrder = `${flag}:${originSort}`;
        // newOrder = `${flag}:desc`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 自定义事件回调获取pageNo
    getPageNo(pageNo){
      console.log(pageNo);
      // 整理参数
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
    
  },
  // 监听组件实例身上属性值的变化
  watch: {
    // $route也是一个响应式数据, 和searchParams平级
    // 监听路由的信息是否发生变化, 如果发生变化, 再次发起请求
    $route(newValue, oldValue){
      console.log("watched route changed");
      // 再次整理参数并发请求
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      console.log(this.searchParams);
      this.getData();
      // 每次发请求之后, 将category1Id、category2Id、category3Id置为空, 接收下一次的id
      // 不置空上一次的id依然在(上一次是category1Id, 这一次是category2Id, 两个id都会在searchParams中)
      // 为什么categoryName和keyword不用置空, 因为每次路由发生变化时, 都会赋予新的数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    }
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
