<template>
  <div class="pagination">
    <!-- 上部分 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{active: pageNo === 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <!-- 遍历 end-start+1次即continues次 -->
    <template v-for="(page, index) in startNumAndEndNum.end">
      <button v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo', page)" :class="{active: page === pageNo}">{{ page }}</button>
    </template>
    <!-- <button v-for="(page, index) in startNumAndEndNum.end" :key="index">{{ page }}</button> -->

    <!-- 下部分 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{active: pageNo === totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo === totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 父组件传递给子组件的数据: 当前页、每一页展示多少条数据、数据总个数、连续的页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize); // 向上取整
    },
    // 计算出连续页码的起始数字与结束数字(连续页码的数字至少是continues即5)
    startNumAndEndNum() {
      let start = 0,
        end = 0;
      // 连续页码数字5(至少5页), 如果出现不正常的现象(不够5页)
      // 不正常现象(总页数没有连续页码多)
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 正常现象(总页数大于连续页码)
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        // 纠正不正常现象(start出现0或负数)
        if(start <= 0){
            start = 1;
            end = this.continues;
        }
        // 纠正不正常现象(end大于总页数)
        if(end > this.totalPage){
            end = this.totalPage;
            start = end - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>
