<script setup lang="ts">

import { h, getCurrentInstance } from 'vue';

const { proxy }:any = getCurrentInstance(); // 获取上下文
proxy.$message({
  message: h('p', null, [
    h('span', null, 'Message can be '),
    h('i', { style: 'color: teal' }, 'VNode'),
  ]),
})

</script>

<template>
  <div>

  </div>
</template>

<style lang="scss">
// @import '@/assets/scss/home/index.scss';

</style>
