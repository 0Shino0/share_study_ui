<template>
  <div class="login-container">
    <!-- 待登录页面 -->

    <div class="no-login">
      <div class="no-login-container">
        <div class="login-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
            ></path>
          </svg>
          <h1 class="form_heading">登 录</h1>
        </div>
        <el-form
          class="login-form"
          ref="loginForm"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <el-form-item label="账号" :label-width="loginFormLabelWidth">
            <el-input
              v-model="loginForm.account"
              autocomplete="off"
              placeholder="Account"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="loginFormLabelWidth">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
              placeholder="Password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="none-login-footer">
          <el-button type="primary" @click="dialogSubmit()">登 录</el-button>
          <el-button @click="toRegister()">去 注 册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login";

export default {
  name: "Login",
  data() {
    return {
      loginFormLabelWidth: "",
      loginForm: {
        account: undefined,
        password: undefined,
      },
      loginFormRules: {
        account: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 登录
    dialogSubmit() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.loginload = true;
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
              this.$bus.$emit("updateUserInfo", this.userInfo);
            })
            .catch((error) => {
              console.log(error);
              this.userInfo = undefined;
              this.loginload = false;
              this.showDialog = false;
              this.resetLogin();
              // console.log('退出登录');
            });
        }
      });
    },
    // 登录
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    // 登录表单重置
    resetLogin() {
      this.loginForm = {
        account: undefined,
        password: undefined,
      };
      this.resetForm("loginForm");
    },
  },
};
</script>

<style lang="scss">
/*大型屏幕pc 超大屏*/
@media screen and (min-width: 1200px) {
  .no-login {
    width: 496px;
  }
}
/*1200>=pc>=992 大屏，字体红色，背景黑色*/
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .no-login {
    width: 496px;
  }
}
/*768<=pad<992 中屏，字体黄色，背景红色*/
@media screen and (min-width: 768px) and (max-width: 991px) {
  .no-login {
    width: 496px;
  }
}
/*phone<768  小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 767px) and (min-width: 480px) {
}
/* 超小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 480px) {
}

.no-login {
  // max-width: 496px;
  // min-width: 460px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px auto;
  margin-top: 90px;
  border-radius: 8px; // 圆角
  background: #f9fbff;
  box-shadow: 20px 20px 60px #d4d5d9, -20px -20px 60px #ffffff;

  .no-login-container {
    padding: 50px 0;
    padding-bottom: 0px;

    .login-header {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #7878bd;
      margin: 0 auto;

      .form_heading {
      }
    }

    .login-form {
      width: 298px;
      height: 150px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      // align-items: center;

      .el-form-item {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin-bottom: 0px;

        // label
        .el-form-item__label {
          color: #787ac1;
        }

        .el-form-item__content {
          .el-input {
            input {
              border-radius: 8px;
              border: none;
              background-color: #e9e9f7;
            }
          }
        }
      }
    }

    // 登录按钮
    .none-login-footer {
      width: 298px;
      height: 80px;
      // height: 166px;
      text-align: center;
      margin: 0 auto;
      margin-top: 40px;
      font-size: 17px;

      button {
        --button_radius: 0.75em;
        // --button_color: #e8e8e8;
        // --button_outline_color: #000000;
        --button_color: #fff;
        --button_outline_color: #787ac1;
        font-size: 17px;
        font-weight: bold;
        border: none;
        border-radius: var(--button_radius);
        background: var(--button_outline_color);
        padding: 0;
      }
      span {
        display: block;
        box-sizing: border-box;
        border: 2px solid var(--button_outline_color);
        border-radius: var(--button_radius);
        padding: 0.75em 1.5em;
        background: var(--button_color);
        color: var(--button_outline_color);
        transform: translateY(-0.2em);
        transition: transform 0.1s ease;
      }

      /* hover样式 */
      button:hover span {
        /* Pull the button upwards when hovered */
        transform: translateY(-0.33em);
      }

      button:active span {
        /* Push the button downwards when pressed */
        transform: translateY(0);
      }
    }
  }

  // 登录表单

  // h1 {
  //   text-align: center;
  // }
}
</style>
