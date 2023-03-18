<template>
  <div class="test">
    <Loading />
  </div>
</template>

<script>
import Loading from "@/components/Loading/index.vue";
export default {
  name: "test",
  components: {
    Loading,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.test {
  width: 500px;
  height: 1000px;
}
</style>
