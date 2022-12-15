<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper"; // 引入swiper

export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      // 为什么watch监听不了list, 因为这个数据从来没有发生变化(数据是父亲给的, 父亲给的时候就是一个对象, 对象里面该有的数据都是有的)
      immediate: true, // 立即监听一次
      handler() {
        // 只能监听到数据已经有了, 但是v-for动态渲染结构我们依然还是没有办法确定的, 因此还是需要用到nextTick
        console.log("watching");
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            direction: "horizontal", // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
              delay: 2000,
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // 点击小球的时候也能切换图片
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
