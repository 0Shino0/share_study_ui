<template>
  <div class="test">
    <!-- <Loading /> -->
    <vue-emojis></vue-emojis>
  </div>
</template>

<script>
import Loading from "@/components/Loading/index.vue";
import VueEmojis from "@/components/VueEmojis";
export default {
  name: "test",
  components: {
    Loading,
    VueEmojis,
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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
