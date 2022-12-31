<template>
    <div>
        <!-- 三级联动全局组件: 三级联动已经注册为全局组件, 因此不需要再import引入 -->
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <!-- Floor组件在内部没有自己发请求, 数据是父组件给的 -->
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
        <Brand />
    </div>
</template>

<script>
// 引入其余的组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

export default {
    name: "",
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
    mounted(){
        // 派发action, 获取floor组件的数据
        this.$store.dispatch("getFloorList");
        // 登录了就获取用户信息在首页展示
        /* if(this.$store.state.user.token){
            this.$store.dispatch("getUserInfo");
        } */
    },
    computed: {
        ...mapState({
            floorList(state){
                return state.home.floorList;
            }
        }),
    }
};
</script>

<style lang="css">
body{
    /* 解决关闭弹出框的页面抖动问题 */
    padding-right: 0 !important; 
}
</style>
