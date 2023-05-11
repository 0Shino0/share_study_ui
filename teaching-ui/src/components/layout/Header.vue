<template>
  <!-- v-show="showHeader" -->
  <div class="header" :class="showHeader ? 'header-up' : 'header-down'" ref="headerRef" v-if="userInfo && Object.keys(userInfo).length != 0">
    <div class="header-content">
      <!-- logo -->
      <router-link class="logo" to="/">
        <!-- <span>T</span>
        <span>e</span>
        <span>s</span>
        <span>t</span> -->
        <!-- <img src="../../assets/logo.svg" alt="logo"> -->
        <img src="../../assets/svg/logo.svg" alt="logo">
        <span class="logo-title">基于联盟链的资源共享平台</span>
      </router-link>

      <!-- 导航 -->
      <div class="menu-panel">
        <router-link class="nav-item" to="/">首页</router-link>
        <router-link class="nav-item" :to="aboutPath">关于</router-link>
        <router-link class="nav-item" to="/intro">项目介绍</router-link>
        <!-- <router-link class="nav-item" to="/">相关高校</router-link>
        <router-link class="nav-item" to="/">教学资料</router-link> -->
      </div>

      <!-- 登录注册 用户信息 -->
      <div class="user-info-panel">
        <div class="input-search">
          <input class="input-text" placeholder="请输入资料名进行搜索" v-model="searchInfo"></input>
          <span class="iconfont icon-fenxiang search-icon"></span>
        </div>
        <div class="op-btn">
          <!-- <el-button
            type="primary"
            v-if="currentPath === '/addPost/1'"
            class="op-btn"
            @click="pushAddPost"
            >返回<span class="iconfont icon-left-open"></span
          ></el-button> -->
          <el-button type="primary" class="op-btn" @click="pushAddPost">短篇<span
              class="iconfont icon-add"></span></el-button>
          <el-button type="primary" class="op-btn" @click="pushSendPost">长篇<span
              class="iconfont icon-add"></span></el-button>
          <!-- <el-button type="primary" class="op-btn"
            >搜索<span class="iconfont icon-fenxiang"></span
          ></el-button> -->
        </div>
        <!-- 头像 退出登录 -->
        <div class="userInfo-avatar" v-if="userInfo && userInfo.id != undefined" :style="{ 'margin-left': '20px' }">
          <!-- 有头像时 -->
          <el-dropdown placement="bottom" trigger="click">
            <default-avater class="dropdown-avatar" width="40px" height="40px" :avatarName="userInfo.name.split('')[0]" v-if="userInfo.avatar === ''"></default-avater>
            <el-avatar v-else class="dropdown-avatar" size="large" :src="userInfo.avatar"></el-avatar>

            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item> 首页 </el-dropdown-item>
              </router-link>
              <router-link :to="aboutPath">
                <el-dropdown-item> 个人中心 </el-dropdown-item>
              </router-link>
              <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
                <el-dropdown-item>Github</el-dropdown-item>
              </a>
              <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                <el-dropdown-item>Docs</el-dropdown-item>
              </a> -->
              <el-dropdown-item divided @click.native="logout">
                <span style="display: block">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 无头像使用默认头像 -->
          <!-- <el-dropdown placement="bottom">
          <default-avater width="40px" height="40px" :avatarName="userInfo.name.split('')[0]"></default-avater>

            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item> 首页 </el-dropdown-item>
              </router-link>
              <router-link :to="aboutPath">
                <el-dropdown-item> 个人中心 </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">
                <span style="display: block">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->

          <!-- badge提示 -->
          <el-dropdown trigger="click" placement="bottom" class="dropdown-comment-badge">
            <div class="comment-badge" style="width: 50px;height:50px;">
              <el-badge :max="10" :hidden="userCommentLength === 0 ? true : false" :value="userCommentLength"
                class="item">
                <el-button size="large" icon="el-icon-message-solid"></el-button>
              </el-badge>
            </div>

            <el-dropdown-menu placement="bottom" slot="dropdown" class="comment-dropdown">
            <el-dropdown-item v-for="commentItem in userCommentList" :key="commentItem.id" @click.native="toPostDetail(commentItem.resourceId)">
              <!-- click.native:  -->
                  <div class="dropdown-card" >
                  <div class="dropdown-avatar"></div>
                  <div class="dropdown-textBox" >
                    <div class="dropdown-textContent" >
                      <p class="dropdown-h1" >{{commentItem.belongName}}</p>
                      <span class="dropdown-span">{{ commentItem.createTime.split(' ')[0] }}</span>
                    </div>
                    <p class="dropdown-p">{{commentItem.content}}</p>
                  </div>
                </div>
              </el-dropdown-item>
                <el-dropdown-item v-if="userCommentList.length === 0">暂无消息</el-dropdown-item>
                <el-dropdown-item v-else @click.native="commentReadAll">清空消息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 登录注册 -->
        <el-button-group v-else :style="{ 'margin-left': '10px' }">
          <el-button type="primary" class="btn-group" plain @click="login">登录</el-button>
          <el-button type="primary" class="btn-group" plain @click="register">注册</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { login, register } from "@/api/login";
import {getUserCommentPage,readCommentAll} from '@/api/post'
import { getToken } from "@/utils/auth";
import DefaultAvater from '@/components/DefaultAvater'

export default {
  name: "Header",
  components: {
    DefaultAvater
  },
  data() {
    return {
      // isLogin: false , // 标识是否登录
      userInfo: {},
      // 信息
      showHeader: true, // 标记顶部导航是否显示
      showDialog: false,
      currentPath: null,
      searchInfo: null,
      // 收到的评论
      userCommentList: [],
      userCommentLength: undefined,
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.userInfo = this.getTokenData();
    this.getUserCommentPageInfo(this.currentPage, this.pageSize)
    console.log("created");
  },
  async mounted() {
    console.log("mounted");
    this.initScroll();
    this.$bus.$on("changeShowHeaderEvent", (val) => {
      // console.log(val);
      this.showHeader = val;
    });

    // 获取我的评论
    // 获取数据
    // this.currentPath = this.$route.path;
    // 未登录
    this.$bus.$on("noLogin", (val) => {
      this.userInfo = {};
      console.log(val);
      this.noLogin();
    });
    // 用户信息变更
    this.$bus.$on("updateUserInfo", (val) => { // 会被调用多次
      if (val) {
        // console.log(val); 
        // console.log(this.userInfo);
        this.userInfo = val;
        this.getUserCommentPageInfo(this.currentPage, this.pageSize)
      }
    });
    console.log(JSON.stringify(this.userInfo) != '{}');

  },
  computed: {
    // ...mapGetters(['userInfo']),
    aboutPath: function () {
      if (this.userInfo) {
        return "/about?id=" + this.userInfo.id;
      } else {
        return "/about?id=";
      }
    }
  },
  watch: {
    searchInfo(newVal) {
      // console.log(2);
      // console.log(newVal);
      this.$bus.$emit("tranSearchInfo", newVal);
    },
  },
  methods: {
    // 获取评论资料
    async getUserCommentPageInfo(current, pageSize) {
      const result = await getUserCommentPage(current, pageSize);
      if (result === undefined) return;
      this.userCommentList = result.data.records;
      this.userCommentLength = result.data.records.length;
    },
    // 消息已读
    async commentReadAll() {
      console.log(1);
      try {
        await readCommentAll();
        // 获取最新消息
        // 评论
        await this.getUserCommentPageInfo(this.currentPage,this.pageSize)
        // 个人信息
        // const data  = await this.$store.dispatch("user/getInfo", this.userInfo.id)
      } catch (error) {
        this.$message.error('你没有需要清空的评论')
        return error;
      }
    },
    //
    getTokenData() {
      let token = getToken();
      let data = JSON.parse(token);
      // console.log(!data ? {} : data);
      return !data ? {} : data;
    },
    // 登录
    login() {
      if (window.location.href.split('#')[1] !== '/login') {
            this.$router.push({ path: "/login" });
          }else {
            this.$message.info('你已经处在登录页了~')
          }
      // this.loginOrRegister = true;
      // this.showDialog = true;
    },
    // 注册
    register() {
      if (window.location.href.split('#')[1] !== '/register') {
            this.$router.push({ path: "/register" });
      } else {
            this.$message.info('你已经处在注册页了~')
          }
      // this.loginOrRegister = false;
      // this.showDialog = true;
    },
    // 退出
    logout() {
      this.userInfo = {}; // 修改登录状态
      this.$store.dispatch("user/logout"); // 清除user相关token
      this.$message({
        type: "info",
        message: "退出成功",
      });
      this.$bus.$emit("resetUserInfo", {});
    },
    // 未登录情况
    noLogin() {
      this.userInfo = {}; // 修改登录状态
      // console.log('userInfo=>', userInfo);
      this.$store.dispatch("user/logout"); // 清除user相关token
      this.$bus.$emit("resetUserInfo", {});
    },
    // 滚动事件相关
    initScroll() {
      let initScrollTop = this.getScorllTop();
      let scrollType = 0;
      window.addEventListener("scroll", () => {
        // console.log("initScroll");
        let currentScrollTop = this.getScorllTop();
        if (currentScrollTop > initScrollTop) {
          // 往下滚动
          scrollType = 1;
        } else {
          // 往上滚动
          scrollType = 0;
        }
        // console.log(currentScrollTop);
        initScrollTop = currentScrollTop;
        if (scrollType == 1 && currentScrollTop > 100) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      });
    },
    getScorllTop() {
      // 获取滚动条滚动的高度
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;

      return scrollTop;
    },
    // 跳转 addPost页面
    pushAddPost() {
      // console.log(this.$route.path);
      if (this.$route.path !== "/addPost/1") {
        this.$router.push({ path: "/addPost/1" });
      } else {
        this.$message.info("你已经在发帖页面了");
      }

      this.$bus.$emit('resetFormFromHeader',1)
    },
    // 跳转 sendPost页面
    pushSendPost() {
      // console.log(this.$route.path);
      if (this.$route.path !== "/sendPost/1") {
        this.$router.push({ path: "/sendPost/1" });
      } else {
        this.$message.info("你已经在发帖页面了");
      }
      this.$bus.$emit('resetFormFromHeader',1)
    },
    // 跳转到帖子详情页面
    toPostDetail(id) {
      // console.log(window.location.href.split('/').reverse()[0] === id)

      console.log(window.location.href.split('/').reverse()[0]);
      if (window.location.href.split('/').reverse()[0] != id) {
        this.$router.push({ path: '/postDetail/'+id }).catch((error) => {
          console.log(error);
          return error;
        })
      } else {
        this.$message.info('你已经在当前页面了!')
      }
    }
  },
};
</script>

<style lang="scss">
/*大型屏幕pc 超大屏*/
@media screen and (min-width: 1200px) {
  .dropdown-card {
    width: 290px;
  }
}
/*1200>=pc>=992 大屏，字体红色，背景黑色*/
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .header {
    width: 100%;

    .header-content {
      width: 1100px !important;

      .user-info-panel{
        .input-search{
          display: none;
        }
      }
    }
  }

  .dropdown-card {
    width: 290px;
  }

}
/*768<=pad<992 中屏，字体黄色，背景红色*/
@media screen and (min-width: 768px) and (max-width: 991px) {
  .header .header-content .user-info-panel .input-search{
    display: none !important;
  }

  .dropdown-card {
    width: 200px;
  }

}
/*phone<768  小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 767px) and (min-width: 480px) {
  .header .header-content .menu-panel {
    display: none !important;
  }

  .header .header-content .user-info-panel .input-search{
    display: none !important;
  }

  .dropdown-card {
    width: 110px;
  }

}
/* 超小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 480px) {
  .header .header-content .menu-panel {
    display: none !important;
  }

  .header .header-content .user-info-panel .input-search{
    display: none !important;
  }

  .header .header-content .user-info-panel .op-btn button {
    font-size: 8px;
    width: 55px !important;
    padding: 8px 8px !important;

    span{
      font-size: 8px;
    }
  }

  .dropdown-card {
    width: 290px;

    .dropdown-span {
      font-size: 4px;
    }

    .dropdown-h1 {
      font-size: 8px;
    }

    .dropdown-p {
      font-size: 6px;
    }
  }

  .header .header-content .logo{
    width: 120px !important;
  }

  .header .header-content .logo img {
    width: 120px !important;
    position: absolute;
    top: -10px !important;
    left: -5px;
  }

}

  .header-down {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
  }
  
  .header-up {
    transition: all 400ms;
    // height: 5em;
    height: 60px;
  }


.header {
  width: 100%;
  position: fixed;
  top: 0;
  box-shadow: 0 2px 6px 0 #ddd;
  // background-color: #fff;
  background-color: #F9FBFF;
  z-index: 1;

  .header-content {
    max-width: 1300px;
    margin: 0px auto;
    height: 60px;
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;

    a {
      text-decoration: none;
    }

    .logo {
      display: block;
      margin-right: 15px;
      // padding-right: 20px;
      // logo
      overflow: hidden;
      width: 200px;
      height: 64px;
      position: relative;

      img {
        width: 165px;
        // width: 200px;
        position: absolute;
        top: -28px;
        // right: ;
        left: 18px;
      }

      .logo-title{
        // width: 150px;
        height: 64px;
        line-height: 64px;
        font-weight: bold;
        color: #000;
      }

      // span {
      //   font-size: 35px;
      // }
    }

    // 导航信息
    .menu-panel {
      flex: 1;
      display: flex;

      .nav-item {
        // padding: 0 20px 0 0;
        margin: 0 10px 0 10px;
        line-height: 60px;
        color: #909399;
        display: inline-block;
        cursor: pointer;
        position: relative;
      }

      // 导航下划线动画效果
      .nav-item:hover {
        color: #409eff;
      }

      .nav-item:before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -2px;
        width: 0;
        height: 2px;
        background: #409eff;
        transition: all 0.3s;
      }

      .nav-item:hover:before {
        width: 100%;
        left: 0;
        right: 0;
      }
    }

    // 登录注册信息
    .user-info-panel {
      // width: 310px;
      display: flex;
      align-items: center;

      // 右侧搜索框
      .input-search {
        position: relative;
        display: inline-block;
        margin-right: 50px;

        // .input-text {
        // }
        input {
          padding: 0 40px 0 20px;
          width: 140px;
          height: 38px;
          font-size: 12px;
          border: 1px solid #eee;
          border-radius: 40px;
          background: #eee;
          transition: width 0.5s;
          transition-delay: 0.1s;
        }

        .input-text:focus {
          width: 240px;
          outline: none;
          box-shadow: none;
        }

        .input-text:focus + .search-icon {
          background-color: #66b1ff;
          color: #000;
        }

        .search-icon {
          position: absolute;
          top: 4px;
          right: 5px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          padding: 0;
          color: #fff;
          text-align: center;
          background: #409eff;
          border-radius: 50%;
          font-size: 15px;
          cursor: pointer;
        }
      }

      // 右侧按钮
      .op-btn {
        font-size: 14px;
        // line-height: 50px;

        button {
          width: 100px;
          padding: 8px 15px 8px 15px;
        }

        .iconfont {
          margin-left: 5px;
        }
      }

      .el-button-group {
        button {
          padding: 8px 15px 8px 15px;
        }
      }

      .op-btn + .op-btn {
        margin-left: 5px;
      }

      /* 登录注册 头像相关 */
      .userInfo-avatar {
        display: flex;
        align-items: center;

        .el-dropdown {
          .dropdown-avatar{
            cursor: pointer;
          }
        }

        // 弹出框
        // .el-dropdown {

        //   .el-dropdown-menu {
        //     top: 60px;
        //     width: 120px;
        //   }
        // }

        .dropdown-comment-badge{
          // 消息icon
          .comment-badge {
            // margin-left: 10px;
  
            // 消息提示组件
            .el-badge {
              .el-button {
                // padding: 12px 10px 12px 10px;
                // padding: 0;
                border: none;
              }
  
              /* button动画效果 */
              .el-button:hover {
                -webkit-animation: shake-top 0.8s
                  cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
                animation: shake-top 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
                  both;
                background-color: #fff;
              }
  
              @-webkit-keyframes shake-top {
                0%,
                100% {
                  -webkit-transform: rotate(0deg);
                  transform: rotate(0deg);
                  -webkit-transform-origin: 50% 0;
                  transform-origin: 50% 0;
                }
  
                10% {
                  -webkit-transform: rotate(2deg);
                  transform: rotate(2deg);
                }
  
                20%,
                40%,
                60% {
                  -webkit-transform: rotate(-4deg);
                  transform: rotate(-4deg);
                }
  
                30%,
                50%,
                70% {
                  -webkit-transform: rotate(4deg);
                  transform: rotate(4deg);
                }
  
                80% {
                  -webkit-transform: rotate(-2deg);
                  transform: rotate(-2deg);
                }
  
                90% {
                  -webkit-transform: rotate(2deg);
                  transform: rotate(2deg);
                }
              }
  
              @keyframes shake-top {
                0%,
                100% {
                  -webkit-transform: rotate(0deg);
                  transform: rotate(0deg);
                  -webkit-transform-origin: 50% 0;
                  transform-origin: 50% 0;
                }
  
                10% {
                  -webkit-transform: rotate(2deg);
                  transform: rotate(2deg);
                }
  
                20%,
                40%,
                60% {
                  -webkit-transform: rotate(-4deg);
                  transform: rotate(-4deg);
                }
  
                30%,
                50%,
                70% {
                  -webkit-transform: rotate(4deg);
                  transform: rotate(4deg);
                }
  
                80% {
                  -webkit-transform: rotate(-2deg);
                  transform: rotate(-2deg);
                }
  
                90% {
                  -webkit-transform: rotate(2deg);
                  transform: rotate(2deg);
                }
              }
  
              // 右上角 消息提示
              .is-fixed {
                top: 15px;
                right: 20px;
              }
  
              .el-icon-message-solid {
                display: inline-block;
                font-size: 20px;
              }
            }
          }
        }


      }
    }
  }
}

// 评论
// .comment-dropdown{
  // comment-dropdown
  .dropdown-card {
    // width: 290px;
    background: #F9FBFF;
    // background: #353535;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
    backdrop-filter: blur(10px);
    transition: 0.5s ease-in-out;
    margin-bottom: 10px;

    .dropdown-avatar {
      width: 50px;
      height: 50px;
      margin-left: 10px;
      border-radius: 10px;
      background: linear-gradient(#d7cfcf, #9198e5);
    }

    .dropdown-textBox {
      width: calc(100% - 90px);
      margin-left: 10px;
      color: #909399;
      // color: white;
      font-family: "Poppins" sans-serif;
    }

    .dropdown-textContent {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .dropdown-span {
      font-size: 10px;
    }

    .dropdown-h1 {
      color: #1D2129;
      font-size: 16px;
      font-weight: bold;
    }

    .dropdown-p {
      font-size: 12px;
      font-weight: lighter;
    }
  }

  .dropdown-card:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  .dropdown-card:hover > .dropdown-avatar {
    transition: 0.5s ease-in-out;
    background: linear-gradient(#9198e5, #712020);
  }
            
          // }

</style>
