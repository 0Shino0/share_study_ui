<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Footer from "@/components/layout/Footer.vue";
import Header from "@/components/layout/Header.vue";

export default {
  name: "Home",
  components: { Footer, Header },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
a {
  outline: none;
  text-decoration: none;
}
</style>
