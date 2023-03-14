<template>
  <div id="app" @focus="cancelFocus" tabindex="0">
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
  methods: {
    cancelFocus() {
      this.$bus.$emit('cancelFocus', false)
    }
  }
};
</script>

<style lang="scss">
body,
html {
  font-size: 16px;
  background-color: #E9ECEF;
}

* {
  padding: 0;
  margin: 0;
}

.el-button {
  padding: 8px 15px;
}

a {
  outline: none;
  text-decoration: none;
}
</style>
