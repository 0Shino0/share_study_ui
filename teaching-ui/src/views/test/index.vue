<script lang="ts">
// 这是一个基于 TypeScript 的 Vue 组件
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, context) {
    // 在这里声明数据，或者编写函数并在这里执行它
    // 在使用 setup 的情况下，请牢记一点：不能再用 this 来获取 Vue 实例

    return {
      // 需要给 `<template />` 用的数据或函数，在这里 `return` 出去
    };
  },

  mounted() {},
});
</script>

<template>
  <div></div>
</template>

<style lang="scss"></style>
