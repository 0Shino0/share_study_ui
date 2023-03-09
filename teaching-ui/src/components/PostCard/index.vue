<template>
  <div class="post-item">
    <el-card class="post-card" shadow="hover">
      <div class="title item">测试测试测试测试测</div>
      <!-- 简介 -->
      <div class="post-description text item">
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
      </div>
      <!-- 收藏 -->
      <ul class="icon-container">
        <!-- 
          el-icon-star-on
          el-icon-star-off
          -->
        <li class="icon-item">
          <i class="el-icon-star-off"> </i>
          <span>666</span>
        </li>
        <li class="icon-item">
          <i class="el-icon-view"> </i>
          <span>666</span>
        </li>
        <li class="icon-item">
          <i class="el-icon-s-comment"> </i>
          <span>666</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.post-item {
  .post-card {
    height: 127px;
    .title {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #1d2129;
      margin-bottom: 8px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .text {
      color: #8a919f;
      font-size: 13px;
      line-height: 22px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      margin-bottom: 8px;
    }

    .icon-container {
      display: flex;

      .icon-item {
        text-decoration: none;
        list-style: none;
        margin-right: 20px;
        color: #8a919f;
        cursor: pointer;

        span {
          margin-left: 4px;
        }
      }

      .icon-item:hover {
        color: #409eff;
      }
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
}
</style>
