<template>
  <div class="header" v-show="showHeader">
    <div class="header-content" :style="{ width: globalInfo.bodyWidth + 'px' }">
      <!-- logo -->
      <router-link class="logo" to="/">
        <span>T</span>
        <span>e</span>
        <span>s</span>
        <span>t</span>
      </router-link>

      <!-- 导航 -->
      <div class="menu-panel">
        <router-link class="nav-item" to="/">首页</router-link>
        <router-link class="nav-item" to="/">关于</router-link>
        <router-link class="nav-item" to="/">相关高校</router-link>
        <router-link class="nav-item" to="/">教学资料</router-link>
      </div>

      <!-- 登录注册 用户信息 -->
      <div class="user-info-panel">
        <div class="op-btn">
          <el-button type="primary" class="op-btn"
            >发帖<span class="iconfont icon-add"></span
          ></el-button>
          <el-button type="primary" class="op-btn"
            >搜索<span class="iconfont icon-fenxiang"></span
          ></el-button>
        </div>
        <!-- 头像 退出登录 -->
        <div
          class="userInfo-avatar"
          v-if="userInfo && userInfo.isLogin"
          :style="{ 'margin-left': '20px' }"
        >
          <el-dropdown placement="bottom-start">
            <el-avatar size="large" :src="userInfo.avatar"></el-avatar>

            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item> 首页 </el-dropdown-item>
              </router-link>
              <router-link to="/about">
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
        </div>
        <!-- 登录注册 -->
        <el-button-group v-else :style="{ 'margin-left': '10px' }">
          <el-button type="primary" class="btn-group" plain @click="login"
            >登录</el-button
          >
          <el-button type="primary" class="btn-group" plain @click="register"
            >注册</el-button
          >
        </el-button-group>
      </div>
    </div>
    <el-dialog
      title="标题"
      :visible.sync="showDialog"
      :width="dialogWidth"
      :top="dialogTop"
      :before-close="dialogCancel"
      append-to-body
      show-close
    >
      <el-form
        v-if="loginOrRegister"
        ref="loginForm"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        v-else
        ref="registerForm"
        :model="registerForm"
        :rules="registerFormRules"
      >
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input
            v-model="registerForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="registerForm.checkPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="registerForm.gender" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院校" :label-width="formLabelWidth">
          <el-input v-model="registerForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户头像" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="dialogSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { login, register } from "@/api/login";
import { getToken } from "@/utils/auth";

export default {
  name: "Header",
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
      // isLogin: false , // 标识是否登录
      // dialog 相关属性
      userInfo: undefined,
      dialogWidth: "620px",
      dialogTop: "30px",
      formLabelWidth: "80px",
      // 信息
      logoInfo: {},
      showHeader: true, // 标记顶部导航是否显示
      showDialog: false,
    };
  },
  mounted() {
    this.initScroll();
    // 获取数据
    this.userInfo = this.getTokenData();
  },
  computed: {
    // ...mapGetters(['userInfo']),
    Form: function () {
      return this.loginOrRegister ? "loginForm" : "registerForm";
    },
    dataToken: () => {
      let token = getToken();
      let data = JSON.parse(token);
      return data;
    },
  },
  methods: {
    //
    getTokenData() {
      let token = getToken();
      let data = JSON.parse(token);
      return data;
    },
    // 登录
    login() {
      this.loginOrRegister = true;
      this.showDialog = true;
    },
    // 注册
    register() {
      this.loginOrRegister = false;
      this.showDialog = true;
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$message({
        type: "info",
        message: "退出成功",
      });
      this.userInfo = null; // 修改登录状态
    },
    dialogCancel() {
      this.showDialog = false;
      this.resetRegister();
      this.resetLogin();
    },
    dialogSubmit() {
      this.$refs[this.Form].validate((valid) => {
        if (valid) {
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
              })
              .catch(() => {
                this.showDialog = false;
                this.resetLogin();
              });
          } else {
            // 注册
            // 默认头像
            this.registerForm.avatar =
              "https://sharestudy-1306588126.cos.ap-chengdu.myqcloud.com/super_avatar.jpg";
            register(this.registerForm).then((response) => {
              this.$message({
                type: "info",
                message: "注册成功",
              });
              this.showDialog = false;
              this.resetRegister();
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
  },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 6px 0 #ddd;
  background-color: #fff;
  .header-content {
    margin: 0px auto;
    height: 60px;
    align-items: center;
    display: flex;
    a {
      text-decoration: none;
    }
    .logo {
      display: block;
      margin-right: 5px;
      span {
        font-size: 35px;
      }
    }
    // 导航信息
    .menu-panel {
      flex: 1;

      .nav-item {
        padding: 20px;
        color: #909399;
      }

      .nav-item:hover {
        border-bottom: 3px solid #6b64f9;
        color: #409eff;
      }

      /* 登录注册 头像相关 */
      .userInfo-avatar {
      }
    }
    // 登录注册信息
    .user-info-panel {
      width: 300px;
      display: flex;
      .op-btn {
        .iconfont {
          margin-left: 5px;
        }
      }
      .op-btn + .op-btn {
        margin-left: 5px;
      }
    }
  }
}
</style>
