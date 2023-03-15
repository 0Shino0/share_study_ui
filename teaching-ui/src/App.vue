<template>
  <div id="app" @focus="cancelFocus" tabindex="0" style="overflow: auto;">
    <keep-alive>
      <Header></Header>
    </keep-alive>
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



#app {
  outline: none;
  // 方案一
  height: 750px;
  overflow: hidden;

  // 方案二
  // min-height: 750px;
  // overflow: auto;
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

/* 滚动条相关 */
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 16px;
  background-color: #F5F5F5;
  // display: none;
}


/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px #40a0ff36;
  background-color: #409EFF;
}
</style>
