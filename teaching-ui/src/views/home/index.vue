<template>
  <div
    class="main"
    style="overflow: auto; margin-top: 10px"
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
    infinite-scroll-immediate="false"
    infinite-scroll-distance="1"
  >
    <!-- 骨架屏 -->
    <el-skeleton animated :loading="skeletonLoading">
      <template #template>
        <div class="main-container">
          <div class="main-left">
            <el-row class="post-container">
              <el-card
                class="post-card"
                shadow="hover"
                v-for="i in skeletonCount"
                :key="i"
              >
                <el-row :gutter="20" class="post-avater-info">
                  <el-col :span="2">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                  <el-col :span="4">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                  <el-col :span="7">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                </el-row>
                <el-row class="title item" style="margin: 8px 0">
                  <el-col :span="10">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                </el-row>
                <!-- 简介 -->
                <el-row class="post-description text item">
                  <el-skeleton-item></el-skeleton-item>
                </el-row>
                <!-- 收藏 -->
                <el-row :gutter="10" class="icon-container">
                  <el-col :span="2" class="icon-item">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                  <el-col :span="2" class="icon-item">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                  <el-col :span="2" class="icon-item">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-row>
          </div>
          <div class="main-right">
            <el-row>
              <el-col> </el-col>
            </el-row>
          </div>
        </div>
      </template>
    </el-skeleton>

    <div class="main-container">
      <div class="main-left">
        <!-- 无限滚动数据 -->
        <div
          v-if="userInfo && userInfo.isLogin && postLength != 0"
          class="post-container infinite-list"
        >
          <router-link
            class="infinite-list-item"
            v-for="item in postList"
            :key="item.resourceId"
            :to="
              '/postDetail/' +
              item.resourceId +
              '?collectStatus=' +
              item.collectStatus
            "
          >
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
                  <!-- <li class="icon-item">
                      <i class="el-icon-view"> </i>
                      <span>666</span>
                    </li> -->
                  <li class="icon-item">
                    <i class="el-icon-s-comment"> </i>
                    <span>{{ item.commentCount }}</span>
                  </li>
                </ul>
              </el-card>
            </div>
          </router-link>
          <p class="post-card-loading" v-if="loading">加载中...</p>
          <!-- <p class="post-card-loading" v-if="noMore">没有更多了</p> -->
        </div>
      </div>

      <div class="main-right">
        <!-- logo -->
        <div class="main-right-wecome">
          <img
            src="@/assets/img/support-team.png"
            alt="Welcome"
            style="width: 237px"
          />
        </div>

        <!-- 头部卡片 展示个人信息 -->
        <div class="card">
          <div class="card-info">
            <div class="card-avatar">
              <default-avatar
                v-if="userInfo.avatar === ''"
                width="60px"
                height="60px"
                :avatarName="userInfo.name.split('')[0]"
              ></default-avatar>
              <img
                v-else
                :src="userInfo.avatar"
                style="width: 60px; border-radius: 50%"
                alt="头像"
              />
            </div>
            <div class="card-title">{{ userInfo.name }}</div>
            <div class="card-subtitle">{{ userInfo.collegeName }}</div>
          </div>
          <ul class="card-social">
            <li class="card-social__item">
              <i class="iconfont icon-jifen">
                <br /><span>{{ userInfo.score }}</span></i
              >
            </li>
            <li class="card-social__item">
              <i class="el-icon-s-comment">
                <br /><span>{{ userInfo.messageNumber }}</span></i
              >
            </li>
            <li class="card-social__item">
              <i class="el-icon-s-data">
                <br /><span>{{ postLength }}</span></i
              >
            </li>
          </ul>
        </div>

        <!-- 更新消息 -->
        <div class="upgrate-card">
          <div class="cart-container">
            <div class="upgrate-card-title">更新公告</div>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="2023年4月2日" name="4">
                <div>- 界面美化：在登录注册以及首页加入一些插图，美化界面</div>
                <div>
                  - 项目重构：Vue3 + Element Plus + TypeScript + Pinia +
                  Vite对本项目进行重构重构基本完成，进入测试阶段，测试地址<a
                    href="http://43.142.74.200:82/"
                    >http://43.142.74.200:82/</a
                  >
                  。
                </div>
              </el-collapse-item>
              <el-collapse-item title="2023年3月24日" name="3">
                <div>
                  -
                  帖子修改：修改帖子经过测试已经相对完善，但是还有一些小Bug，比如发帖时没有添加附件那么修改时添加附件就会报错。
                </div>
                <div>
                  - 目前目标：利用Vue3 + Element Plus + TypeScript + Pinia +
                  Vite对本项目进行重构。
                </div>
              </el-collapse-item>
              <el-collapse-item title="2023年3月23日" name="2">
                <div>
                  -
                  富文本支持：更新了发帖页面，短篇为原来的发帖页，长篇为更新后的富文本编辑。支持
                  大部分word操作。
                </div>
                <div>- 移动端适配：目前已经初步适配移动端，后续还会优化。</div>
              </el-collapse-item>
              <el-collapse-item title="2023年3月22日" name="1">
                <div>
                  - docker时区问题：修复了实际发帖时间与北京时间的偏差。
                </div>
              </el-collapse-item>
              <el-collapse-item title="之前的更新" name="0">
                <div>
                  - 骨架屏支持：支持首页以及帖子详情页面的骨架屏，优化首屏加载。
                </div>
                <div>
                  - 文件上传优化：开放了大部分编程源文件格式的文件上传。
                </div>
                <div>- 文件的预览：支持图片、视频、文档的预览。</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>

        <!-- logo  -->
        <div class="main-right-wecome">
          <img
            src="@/assets/img/forpeople.png"
            alt="forpeople"
            style="width: 237px"
          />
        </div>
      </div>
    </div>

    <!-- 无数据时使用 -->
    <div class="no-data" v-if="postLength === 0 || noMore">
      <div class="loader">
        <div>
          <ul>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path
                  d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"
                ></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path
                  d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"
                ></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path
                  d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"
                ></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path
                  d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"
                ></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path
                  d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"
                ></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path
                  d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"
                ></path>
              </svg>
            </li>
          </ul>
        </div>
        <span>没有帖子了呢~~~,快点击右上角发帖吧！</span>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading/index.vue";
import DefaultAvatar from "@/components/DefaultAvater";
// import { mapState } from "vuex";
import { getPostPage } from "@/api/post";

export default {
  name: "home",
  components: {
    Loading,
    DefaultAvatar,
  },
  data() {
    return {
      loading: false, // 无限滚动 触底 loading
      skeletonLoading: true, // 骨架屏loading
      skeletonCount: 6,
      pageFinish: false,
      count: 1, // 标记 默认第二页
      // 帖子相关
      pageSize: 8,
      postLength: undefined, // 总帖子数
      postAveList: [], //
      postList: [],
      filterPostList: [],
      userInfo: {},
      searchInfo: null, // 搜索信息
      // 更新信息
      activeName: "4",
      upgrateInfo: [{}],
    };
  },
  created() {
    this.userInfo = this.getTokenData();
  },
  mounted() {
    this.getPostPageInfo(1, 100);

    // 登录时获取信息
    // this.$bus.$on("getPostPageInfoFromHeader", (val) => {
    //   this.userInfo = this.getTokenData();
    //   this.getPostPageInfo(1, 100);
    //   // this.load()

    //   // this.$forceUpdate()
    //   // this.$forceUpdate(); // 组件重新渲染

    //   // key
    //   // this.componentKey += 1;
    //   // console.log(this.componentKey);

    //   // v-if
    // });

    // 退出登录时重置信息
    this.$bus.$on("resetUserInfo", (val) => {
      // this.userInfo = this.getTokenData();
      this.userInfo = {};
      this.postLength = undefined;
      this.postAveList = [];
      this.postList = [];
    });

    // console.log(this.isLogin);
    // 传递searchInfo
    this.$bus.$on("tranSearchInfo", (val) => {
      this.searchInfo = val;
      // var reg = new RegExp("^[0-9]+"+param+"[a-z]+$","g");

      let reg = new RegExp(val);
      // console.log(reg);
      this.filterPostList = this.postList.filter((c) =>
        reg.test(c.resourceInfo)
      );
    });
  },
  methods: {
    // 获取帖子数
    async getPostPageInfo(current, pageSize) {
      const { data } = await getPostPage(current, pageSize);
      // 原数组
      this.postLength = data.total;
      // this.postAveList = this.aveArr(data.records.reverse(), this.pageSize);
      this.postAveList = this.aveArr(data.records, this.pageSize);
      this.postList = this.postAveList[0];
      this.userInfo = this.getTokenData();
      // console.log(this.postAveList[this.count]);

      this.skeletonLoading = false;
    },
    // 均分数组
    aveArr(data, num) {
      let result = [];
      for (let i = 0, len = data.length; i < len; i += num) {
        result.push(data.slice(i, i + num));
      }
      // console.log("result=>", result);
      return result;
    },
    // 无限滚动加载方法
    async load() {
      this.loading = true;
      setTimeout(() => {
        // this.count += 4;
        try {
          let length = 0;
          length = this.postAveList[this.count].length;
          for (let i = 0; i < length; i++) {
            this.postList.push(this.postAveList[this.count][i]);
          }
          this.count++;
          this.loading = false;
        } catch (error) {
          console.log(error);
        }
      }, 300);
    },
  },
  computed: {
    // ...mapState({
    //   isLogin: state => state.user.isLogin
    // }),
    noMore() {
      // console.log(this.postLength);
      // console.log(this.postList.length);
      return this.postList.length >= this.postLength;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
};
</script>

<style lang="scss">
/*大型屏幕pc 超大屏*/
@media screen and (min-width: 1200px) {
}
/*1200>=pc>=992 大屏，字体红色，背景黑色*/
@media screen and (min-width: 992px) and (max-width: 1199px) {
}
/*768<=pad<992 中屏，字体黄色，背景红色*/
@media screen and (min-width: 768px) and (max-width: 991px) {
  .main {
    // max-height: 730px;
    .main-container {
      // max-height: 730px;

      .main-left {
      }

      .main-right {
        display: none;
      }

      // .main-right {
      //   .card {
      //     width: 100%;
      //     width: 400px;
      //   }
      // }
    }

    .no-data {
      display: flex;
    }
  }
}
/*phone<768  小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 767px) and (min-width: 480px) {
  .main {
    .main-container {
      // .main-left {
      // }

      .main-right {
        display: none;
        // margin-top: 20px;
        // .card {
        //   width: 100%;
        //   // width: 400px;
        // }
      }
    }

    .no-data {
      display: flex;
    }
  }
}
/* 超小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 480px) {
  .main {
    .main-container {
      // .main-left {
      //   margin-bottom: 70px;
      //   padding-top: 70px;
      // }

      .main-right {
        display: none;
      }
      // .main-right {
      //   margin-top: 20px;
      //   width: 390px;

      //   // padding-top: 70px;
      //   .card {
      //     width: calc(100% - 34px) !important;
      //     margin: 0 auto;
      //   }
      // }
    }
  }
}

.main {
  // min-height: 730px;
  height: 100%;

  .main-container {
    // min-height: 730px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 60px;
    margin: 0 auto;

    // 左侧帖子
    .main-left {
      width: 700px;

      .post-container {
        max-width: 680px;
        // min-width: 460px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        // flex-wrap: no-wrap;

        // .infinite-list-item:first-child {
        //   margin-top: 300px;
        // }

        .post-card-loading {
          align-items: center;
          margin: 10px auto;
        }

        // post 帖子
        .post-item {
          .post-card {
            position: relative;
            height: 127px;
            background-color: #f9fbff; // card 颜色

            .el-card__body {
              padding-top: 30px;
              // padding-bottom: 20px;

              .item {
              }

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
            background-color: #fafafa;
          }
        }
      }

      // 动画效果
      .post-container {
        -webkit-animation: fade-in-fwd 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
          both;
        animation: fade-in-fwd 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
      }

      @-webkit-keyframes fade-in-fwd {
        0% {
          -webkit-transform: translateZ(-80px);
          transform: translateZ(-80px);
          opacity: 0;
        }

        100% {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          opacity: 1;
        }
      }

      @keyframes fade-in-fwd {
        0% {
          -webkit-transform: translateZ(-80px);
          transform: translateZ(-80px);
          opacity: 0;
        }

        100% {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          opacity: 1;
        }
      }
    }

    // 右侧信息
    .main-right {
      // position: fixed;
      .upgrate-card {
        width: 190px;
        // height: 254px;
        margin-top: 10px;
        background: #f9fbff;
        // background: #f5f5f5;
        padding: 1rem 1.5rem;
        transition: box-shadow 0.3s ease, transform 0.2s ease;

        .upgrate-card-title {
          margin-bottom: 5px;
          font-weight: bold;
        }
      }

      .upgrate-card:hover {
        box-shadow: 0 8px 50px #23232333;
      }

      // 头部展示个人信息
      .card {
        width: 190px;
        height: 254px;
        background: #f9fbff;
        // background: #f5f5f5;
        padding: 2rem 1.5rem;
        transition: box-shadow 0.3s ease, transform 0.2s ease;
      }

      .card-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: transform 0.2s ease, opacity 0.2s ease;
      }

      /*Image*/
      .card-avatar {
        --size: 60px;
        background: linear-gradient(to top, #f1e1c1 0%, #fcbc97 100%);
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        transition: transform 0.2s ease;
        margin-bottom: 1rem;
      }

      /*Card footer*/
      .card-social {
        transform: translateY(200%);
        display: flex;
        justify-content: space-around;
        width: 100%;
        opacity: 0;
        transition: transform 0.2s ease, opacity 0.2s ease;
      }

      .card-social__item {
        list-style: none;
      }

      .card-social__item i {
        display: block;
        height: 18px;
        line-height: 18px;
        width: 18px;
        fill: #515f65;
        cursor: pointer;
        transition: fill 0.2s ease, transform 0.2s ease;
      }

      /*Text*/
      .card-title {
        color: #333;
        font-size: 1.5em;
        font-weight: 600;
        line-height: 2rem;
      }

      .card-subtitle {
        color: #859ba8;
        font-size: 0.8em;
      }

      /*Hover*/
      .card:hover {
        box-shadow: 0 8px 50px #23232333;
      }

      .card:hover .card-info {
        transform: translateY(-5%);
      }

      .card:hover .card-social {
        transform: translateY(100%);
        opacity: 1;
      }

      .card-social__item i:hover {
        fill: #232323;
        transform: scale(1.1);
      }

      .card-avatar:hover {
        transform: scale(1.1);
      }
    }
  }

  .no-data {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 100px;

    // loading
    .loader {
      --background: linear-gradient(135deg, #23c4f8, #275efe);
      --shadow: rgba(39, 94, 254, 0.28);
      --text: #6c7486;
      --page: rgba(255, 255, 255, 0.36);
      --page-fold: rgba(255, 255, 255, 0.52);
      --duration: 3s;
      width: 200px;
      height: 140px;
      position: relative;
    }

    .loader:before,
    .loader:after {
      --r: -6deg;
      content: "";
      position: absolute;
      bottom: 8px;
      width: 120px;
      top: 80%;
      box-shadow: 0 16px 12px var(--shadow);
      transform: rotate(var(--r));
    }

    .loader:before {
      left: 4px;
    }

    .loader:after {
      --r: 6deg;
      right: 4px;
    }

    .loader div {
      width: 100%;
      height: 100%;
      border-radius: 13px;
      position: relative;
      z-index: 1;
      perspective: 600px;
      box-shadow: 0 4px 6px var(--shadow);
      background-image: var(--background);
    }

    .loader div ul {
      margin: 0;
      padding: 0;
      list-style: none;
      position: relative;
    }

    .loader div ul li {
      --r: 180deg;
      --o: 0;
      --c: var(--page);
      position: absolute;
      top: 10px;
      left: 10px;
      transform-origin: 100% 50%;
      color: var(--c);
      opacity: var(--o);
      transform: rotateY(var(--r));
      -webkit-animation: var(--duration) ease infinite;
      animation: var(--duration) ease infinite;
    }

    .loader div ul li:nth-child(2) {
      --c: var(--page-fold);
      -webkit-animation-name: page-2;
      animation-name: page-2;
    }

    .loader div ul li:nth-child(3) {
      --c: var(--page-fold);
      -webkit-animation-name: page-3;
      animation-name: page-3;
    }

    .loader div ul li:nth-child(4) {
      --c: var(--page-fold);
      -webkit-animation-name: page-4;
      animation-name: page-4;
    }

    .loader div ul li:nth-child(5) {
      --c: var(--page-fold);
      -webkit-animation-name: page-5;
      animation-name: page-5;
    }

    .loader div ul li svg {
      width: 90px;
      height: 120px;
      display: block;
    }

    .loader div ul li:first-child {
      --r: 0deg;
      --o: 1;
    }

    .loader div ul li:last-child {
      --o: 1;
    }

    .loader span {
      display: block;
      left: 0;
      right: 0;
      top: 100%;
      margin-top: 20px;
      text-align: center;
      color: var(--text);
    }

    @keyframes page-2 {
      0% {
        transform: rotateY(180deg);
        opacity: 0;
      }

      20% {
        opacity: 1;
      }

      35%,
      100% {
        opacity: 0;
      }

      50%,
      100% {
        transform: rotateY(0deg);
      }
    }

    @keyframes page-3 {
      15% {
        transform: rotateY(180deg);
        opacity: 0;
      }

      35% {
        opacity: 1;
      }

      50%,
      100% {
        opacity: 0;
      }

      65%,
      100% {
        transform: rotateY(0deg);
      }
    }

    @keyframes page-4 {
      30% {
        transform: rotateY(180deg);
        opacity: 0;
      }

      50% {
        opacity: 1;
      }

      65%,
      100% {
        opacity: 0;
      }

      80%,
      100% {
        transform: rotateY(0deg);
      }
    }

    @keyframes page-5 {
      45% {
        transform: rotateY(180deg);
        opacity: 0;
      }

      65% {
        opacity: 1;
      }

      80%,
      100% {
        opacity: 0;
      }

      95%,
      100% {
        transform: rotateY(0deg);
      }
    }
  }
}
</style>
