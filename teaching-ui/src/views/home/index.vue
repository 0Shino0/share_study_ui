<script lang="ts">
import { ref, inject, onMounted, onBeforeUnmount } from "vue";
import eventBus from "@/libs/eventBus";

export default {
  setup() {
    const $bus: any = inject("$bus");
    let count = ref(1);

    function test(val = "test") {
      console.log("val=>", val);
      return val;
    }

    onMounted(() => {
      $bus.on("test", test);
    });

    /* 方法 */
    function incre() {
      count.value++;
    }

    return {
      count,

      incre,
    };
  },
};
</script>

<template>
  <div @click="incre">Home</div>
  {{ count }}
</template>

<style lang="scss"></style>
