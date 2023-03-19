<template>
  <div class="header" v-show="showHeader">
    <div class="header-content" :style="{ width: globalInfo.bodyWidth + 'px' }">
      <!-- logo -->
      <router-link class="logo" to="/">
        <!-- <span>T</span>
        <span>e</span>
        <span>s</span>
        <span>t</span> -->
        <img src="@/assets/logo.svg" alt="logo">
      </router-link>

      <!-- 导航 -->
      <div class="menu-panel">
        <router-link class="nav-item" to="/">首页</router-link>
        <router-link class="nav-item" :to="aboutPath">关于</router-link>
        <!-- <router-link class="nav-item" to="/">相关高校</router-link>
        <router-link class="nav-item" to="/">教学资料</router-link> -->
      </div>

      <!-- 登录注册 用户信息 -->
      <div class="user-info-panel">
        <div class="input-search">
          <input class="input-text" placeholder="搜索" v-model="searchInfo"></input>
          <span class="iconfont icon-fenxiang search-icon"></span>
        </div>
        <div class="op-btn">
          <!-- <el-button
            type="primary"
            v-if="currentPath === '/addPost'"
            class="op-btn"
            @click="pushAddPost"
            >返回<span class="iconfont icon-left-open"></span
          ></el-button> -->
          <el-button type="primary" class="op-btn" @click="pushAddPost">发帖<span
              class="iconfont icon-add"></span></el-button>
          <!-- <el-button type="primary" class="op-btn"
            >搜索<span class="iconfont icon-fenxiang"></span
          ></el-button> -->
        </div>
        <!-- 头像 退出登录 -->
        <div class="userInfo-avatar" v-if="userInfo && userInfo.isLogin" :style="{ 'margin-left': '20px' }">
          <!-- 有头像时 -->
          <el-dropdown placement="bottom" v-if="userInfo.avatar">
            <el-avatar v-if="userInfo.avatar" size="large" :src="userInfo.avatar"></el-avatar>

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
          <el-dropdown placement="bottom" v-else>
          <default-avater width="40px" height="40px" :avaterName="userInfo.name.split('')[0]"></default-avater>
            <!-- <div class="default-avater">
              <span class="avater-name">{{ userInfo.name.split('')[0] }}</span>
            </div> -->

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
          <!-- badge提示 -->
          <el-dropdown placement="bottom">
            <div class="comment-badge" style="width: 50px;height:50px;">
              <el-badge :max="10" :hidden="userInfo.messageNumber === 0 ? true : false" :value="userInfo.messageNumber"
                class="item">
                <el-button size="large" icon="el-icon-message-solid"></el-button>
              </el-badge>
            </div>

            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link :to="aboutPath">
                <el-dropdown-item> 消息列表 </el-dropdown-item>
              </router-link>
              <el-dropdown-item @click="commentReadAll()"> 全部已读 </el-dropdown-item>
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
    <el-dialog class="dialog" :title="textLogin" :visible.sync="showDialog" :width="dialogWidth" :top="dialogTop"
      :close-on-click-modal="false" :close-on-press-escape="false" :before-close="dialogCancel" append-to-body show-close>
      <el-form class="dialog-login-form" v-if="loginOrRegister" ref="loginForm" :model="loginForm"
        :rules="loginFormRules">
        <el-form-item label="账号" :label-width="loginFormLabelWidth">
          <el-input v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="loginFormLabelWidth">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form class="dialog-register-form" v-else ref="registerForm" :model="registerForm" :rules="registerFormRules">
        <el-form-item class="dialog-form-item" label="账号" :label-width="registerFormLabelWidth">
          <el-input v-model="registerForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="registerFormLabelWidth">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px">
          <el-input type="password" v-model="registerForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="registerFormLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="registerFormLabelWidth">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="registerFormLabelWidth">
          <el-select v-model="registerForm.gender" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院校" :label-width="registerFormLabelWidth">
          <el-input v-model="registerForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户头像" :label-width="registerFormLabelWidth">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              v-model="registerForm.avatar"
              >
              <img v-if="registerForm.avatar" :src="registerForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button @click="dialogCancel()">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit()" :disabled="loginload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { login, register, readCommentAll } from "@/api/login";
import { getToken } from "@/utils/auth";
import DefaultAvater from '@/components/DefaultAvater'

export default {
  name: "Header",
  components: {
    DefaultAvater
  },
  data() {
    /* 表单校验 */
    // 密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单
      loginForm: {
        account: undefined,
        password: undefined,
      },
      registerForm: {
        account: undefined, // 账号
        password: undefined, // 密码
        checkPassword: undefined, // 确认密码
        name: undefined, // 姓名
        email: undefined, // 邮箱
        gender: undefined, // 性别
        code: undefined, // 院校代码
        avatar: undefined, // 头像
      },
      loginFormRules: {
        account: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
      },
      registerFormRules: {
        account: [{ required: true, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
        email: [{ required: true, trigger: "blur" }],
        gender: [{ required: true, trigger: "blur" }],
        avatar: [{ required: false, trigger: "blur" }],
        code: [{ required: true, trigger: "blur" }],
      },
      loginOrRegister: true, // 默认 登录
      loginload: false,
      // isLogin: false , // 标识是否登录
      // dialog 相关属性
      userInfo: undefined,
      dialogWidth: "620px",
      dialogTop: "30px",
      loginFormLabelWidth: "40px",
      registerFormLabelWidth: "80px",
      // 信息
      logoInfo: {},
      showHeader: true, // 标记顶部导航是否显示
      showDialog: false,
      currentPath: null,
      searchInfo: null,
    };
  },
  created() {
    if (!this.userInfo) {
      this.userInfo = this.getTokenData();
    }
    console.log("created");
  },
  async mounted() {
    console.log("mounted");
    this.initScroll();
    // 获取数据
    // this.currentPath = this.$route.path;
    // 登录
    this.$bus.$on("handleLogin", (val) => {
      this.login();
    });
    // 未登录
    this.$bus.$on("noLogin", (val) => {
      this.userInfo = undefined;
      console.log(val);
      this.noLogin();
    });
    // 用户信息变更
    this.$bus.$on("updateUserInfo", (val) => {
      if (val) {
        console.log(val);
        this.userInfo = val;
        console.log(this.userInfo);
      }
    });
  },
  computed: {
    // ...mapGetters(['userInfo']),
    Form: function () {
      return this.loginOrRegister ? "loginForm" : "registerForm";
    },
    textLogin: function () {
      return this.loginOrRegister ? "登录" : "注册";
    },
    aboutPath: function () {
      if (this.userInfo) {
        return "/about?id=" + this.userInfo.id;
      } else {
        return "/about?id=";
      }
    },
  },
  watch: {
    searchInfo(newVal) {
      // console.log(2);
      console.log(newVal);
      this.$bus.$emit("tranSearchInfo", newVal);
    },
  },
  methods: {
    // 消息已读
    commentReadAll() {
      console.log(1);
      readCommentAll(this.userInfo.id);
      // 获取最新消息
      // this.userInfo
      this.$store.dispatch("/user/getInfo", this.userInfo.id).then((res) => {
        console.log(res);
        this.userInfo = res;
      });
    },
    //
    getTokenData() {
      let token = getToken();
      let data = JSON.parse(token);
      return data;
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
      this.userInfo = undefined; // 修改登录状态
      this.$store.dispatch("user/logout"); // 清除user相关token
      this.$message({
        type: "info",
        message: "退出成功",
      });
      this.$bus.$emit("resetUserInfo", undefined);
    },
    // 未登录情况
    noLogin() {
      this.userInfo = undefined; // 修改登录状态
      // console.log('userInfo=>', userInfo);
      this.$store.dispatch("user/logout"); // 清除user相关token
      this.$bus.$emit("resetUserInfo", undefined);
    },
    // 关闭对话框
    dialogCancel() {
      this.showDialog = false;
      this.resetRegister();
      this.resetLogin();
    },
    dialogSubmit() {
      this.$refs[this.Form].validate((valid) => {
        if (valid) {
          this.loginload = true;
          if (this.loginOrRegister) {
            // 登录
            // console.log(this.loginForm);
            console.log(this.$store);
            this.$store
              .dispatch("user/login", this.loginForm)
              .then((response) => {
                // console.log(response);
                this.userInfo = response;
                this.showDialog = false;
                this.resetLogin();
                this.$message({
                  type: "info",
                  message: "登录成功",
                });
                // 如果当前不是首页则跳转
                console.log(window.location.href.split("#")[1]);
                if (window.location.href.split("#")[1] !== "/") {
                  this.$router.push({ path: "/" });
                }

                this.loginload = false;
                // 获取信息
                this.$bus.$emit("getPostPageInfo", "1");
              })
              .catch((error) => {
                console.log(error);
                this.userInfo = undefined;
                this.loginload = false;
                this.showDialog = false;
                this.resetLogin();
                // console.log('退出登录');
              });
          } else {
            // 注册
            // 默认头像
            // this.registerForm.avatar =
            //   "https://sharestudy-1306588126.cos.ap-chengdu.myqcloud.com/super_avatar.jpg";
            register(this.registerForm)
              .then((response) => {
                this.$message({
                  type: "info",
                  message: "注册成功",
                });
                this.showDialog = false;
                this.loginload = false;
                this.resetRegister();
              })
              .catch((error) => {
                this.loginload = false;
              });
          }
        }
      });
    },
    // 登录表单重置
    resetLogin() {
      this.loginForm = {
        account: undefined,
        password: undefined,
      };
      this.resetForm("loginForm");
    },
    // 注册表单重置
    resetRegister() {
      this.registerForm = {
        account: undefined, // 账号
        password: undefined, // 密码
        checkPassword: undefined, // 确认密码
        name: undefined, // 姓名
        email: undefined, // 邮箱
        gender: undefined, // 性别
        avatar: undefined, // 头像
        code: undefined, // 院校代码
      };
      this.resetForm("registerForm");
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
      console.log(this.$route.path);
      if (this.$route.path !== "/addPost") {
        this.$router.push({ path: "/addPost" });
      } else {
        this.$message.info("你已经在发帖页面了");
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 6px 0 #ddd;
  background-color: #fff;
  z-index: 999;

  .header-content {
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
      width: 150px;
      height: 64px;
      position: relative;

      img {
        width: 160px;
        position: absolute;
        top: -28px;
        // right: ;
        left: -5px;
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
          font-size: 14px;
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


        // 弹出框
        // .el-dropdown {

        //   .el-dropdown-menu {
        //     top: 60px;
        //     width: 120px;
        //   }
        // }

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

// dialog对话框

.dialog {
  .el-dialog {
    border-radius: 8px;
    // background-color: #15172b;
    // color: #eee;
    // box-shadow: 20px 20px 60px #6a6b6d, -20px -20px 60px #909193;

    .el-dialog__header {
      text-align: center;
      .el-dialog__title{
        // color: #eee;

      }
    }

    .el-dialog__body {
      width: 50%;
      margin: 0 auto;
      color: #eee;

      .dialog-login-form {
        // .dialog-form-item {
        .el-form-item {
          .el-form-item__label{
            // color: #eee;
          }

          .el-form-item__content {
            .el-input {
              input {
                // color: #eee;
                // color: #7d7e80;
                // background-color: #7d7e80;
                // background-color: #303245;
                // border: none;
              }
            }
          }
        }
      }

      .dialog-register-form {
      }
    }

    .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>
