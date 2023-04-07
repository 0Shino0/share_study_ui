<template>
  <div class="test">
    <!-- <Loading /> -->
    <!-- <vue-emojis></vue-emojis> -->
    <wang-editor></wang-editor>
  </div>
</template>

<script>
// import Loading from "@/components/Loading/index.vue";
// import VueEmojis from "@/components/VueEmojis";
// import WangEditor from "@/components/WangEditor";

export default {
  name: "test",
  components: {
    // Loading,
    // VueEmojis,
    // WangEditor,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.test {
  padding-top: 64px;
  width: 100%;
  height: 100%;
}

// .test {
//   width: 500px;
//   height: 1000px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// }
</style>
