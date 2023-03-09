<template>
  <div class="main">
    <div class="post-container">
      <post-card></post-card>

      <post-card></post-card>

      <post-card></post-card>

      <post-card></post-card>
      <post-card></post-card>
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
export default {
  name: "Main",
  components: {
    PostCard,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.main {
  .post-container {
    max-width: 680px;
    min-width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // flex-wrap: no-wrap;
    padding-top: 60px;
    margin: 0 auto;
  }
}
</style>
