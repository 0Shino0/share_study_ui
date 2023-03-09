<template>
  <div>
    <Main></Main>
  </div>
</template>

<script>
import Main from "@/components/layout/Main.vue";

export default {
  name: "Home",
  components: { Main },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
body,
html {
  font-size: 16px;
}

* {
  padding: 0;
  margin: 0;
}

.el-button {
  padding: 8px 15px;
}
</style>
