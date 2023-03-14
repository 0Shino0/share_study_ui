<template >
  <div class="main" style="overflow-x: auto;height:100%;" v-infinite-scroll="load" infinite-scroll-disabled="disabled"
    infinite-scroll-immediate="true" infinite-scroll-distance="1">
    <!-- 无限滚动数据 -->
    <div v-if="userInfo && userInfo.isLogin" class="post-container infinite-list">
      <router-link class="infinite-list-item" v-for="item in postList" :key="item.resourceId"
        :to="'/postDetail/' + item.resourceId">
        <div class="post-item">
          <el-card class="post-card" shadow="hover">
            <div class="post-avater-info">
              <span class="post-user-name">{{ item.userName }}</span>
              <span>{{ item.collegeName }}</span>
              <span>发布时间{{ item.createTime }}</span>
            </div>
            <div class="title item">{{ item.resourceName }}</div>
            <!-- 简介 -->
            <div class="post-description text item">
              {{ item.resourceInfo }}
            </div>
            <!-- 收藏 -->
            <ul class="icon-container">
              <!-- 
          el-icon-star-on
          el-icon-star-off
          -->
              <li class="icon-item">
                <i class="el-icon-star-off"> </i>
                <span>{{ item.resourceScore }}</span>
              </li>
              <li class="icon-item">
                <i class="el-icon-view"> </i>
                <span>666</span>
              </li>
              <li class="icon-item">
                <i class="el-icon-s-comment"> </i>
                <span>{{ item.commentCount }}</span>
              </li>
            </ul>
          </el-card>
        </div>
      </router-link>
      <p class="post-card-loading" v-if="loading">加载中...</p>
      <p class="post-card-loading" v-if="noMore">没有更多了</p>
    </div>

    <!-- 待登录页面 -->
    <div class="no-login" v-else>
      <h1 @click="handleLogin">请登录</h1>
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import { mapState } from "vuex";
import { getPostPage } from '@/api/post';

export default {
  name: "home",
  components: {
    PostCard,
  },
  data() {
    return {
      loading: false,
      pageFinish: false,
      count: 1, // 标记 默认第二页
      // 帖子相关
      pageSize: 8,
      postLength: undefined, // 总帖子数
      postAveList: [], // 
      postList: [],
      componentKey: undefined,
      userInfo: {}
    };
  },
  created() {
    this.userInfo = this.getTokenData();
  },
  mounted() {
    this.getPostPageInfo(1, 100);

    // 登录时获取信息
    this.$bus.$on('getPostPageInfo', (val) => {
      this.userInfo = this.getTokenData();
      this.getPostPageInfo(1, 100);
      // this.load()

      // this.$forceUpdate()
      // this.$forceUpdate(); // 组件重新渲染

      // key
      // this.componentKey += 1;
      // console.log(this.componentKey);

      // v-if

    });
    // 退出登录时重置信息
    this.$bus.$on('resetUserInfo', (val) => {
      // this.userInfo = this.getTokenData();
      this.userInfo = undefined;
      this.postLength = undefined;
      this.postAveList = [];
      this.postList = [];
    });
    // console.log(this.isLogin);
  },
  methods: {
    // 获取帖子数
    async getPostPageInfo(current, pageSize) {
      const { data } = await getPostPage(current, pageSize);
      // 原数组
      this.postLength = data.total;
      this.postAveList = this.aveArr(data.records.reverse(), this.pageSize);
      this.postList = this.postAveList[0];
      this.userInfo = this.getTokenData();
      console.log(this.postAveList[this.count]);
    },
    // 均分数组
    aveArr(data, num) {
      let result = [];
      for (let i = 0, len = data.length; i < len; i += num) {
        result.push(data.slice(i, i + num));
      }
      console.log('result=>', result);
      return result;
    },
    // 无限滚动加载方法
    load() {
      this.loading = true;
      setTimeout(() => {
        // this.count += 4;
        try {
          let length = 0;
          length = this.postAveList[this.count].length;
          for (let i = 0; i < length; i++) {
            this.postList.push(this.postAveList[this.count][i])
          }
          this.count++;
          this.loading = false;
        } catch (error) {
          console.log(error);
        }
      }, 2000);
    },
    handleLogin() {
      this.$bus.$emit('handleLogin', true)
    }
  },
  computed: {
    // ...mapState({
    //   isLogin: state => state.user.isLogin
    // }),
    noMore() {
      // console.log(this.postLength);
      // console.log(this.postList.length);
      return this.postList.length >= (this.postLength);
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
};
</script>

<style lang="scss">
.main {
  min-height: 1092px;

  .post-container {
    max-width: 680px;
    min-width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // flex-wrap: no-wrap;
    padding-top: 60px;
    margin: 0 auto;

    .post-card-loading {
      align-items: center;
      margin: 10px auto;
    }

    // post 帖子
    .post-item {

      .post-card {
        position: relative;
        height: 127px;

        .el-card__body {
          padding-top: 30px;
          // padding-bottom: 20px;

          .item {}

          .post-avater-info {
            // display: flex;
            position: absolute;
            top: 8px;
            left: 18px;

            .post-user-name {
              padding-left: 0;
            }

            span {
              font-size: 12px;
              padding-right: 12px;
              padding-left: 12px;
              border-right: 1px solid #8a919f;
              color: #8a919f;
            }
          }

          .title {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #1d2129;
            margin-bottom: 8px;
            margin-top: 8px;
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
          }

          .item {
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
              font-size: 12px;

              span {
                margin-left: 4px;
              }
            }

            .icon-item:hover {
              color: #409eff;
            }
          }

          // .clearfix:before,
          // .clearfix:after {
          //   display: table;
          //   content: "";
          // }

          // .clearfix:after {
          //   clear: both;
          // }
        }
      }

      .post-card:hover {
        background-color: #FAFAFA;
      }
    }


  }

  .no-login {
    max-width: 680px;
    min-width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // flex-wrap: no-wrap;
    padding-top: 160px;
    margin: 0 auto;

    h1 {
      text-align: center;
    }
  }
}
</style>
