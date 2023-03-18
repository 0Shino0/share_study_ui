<template>
  <div class="register-container">
    <!-- 待注册页面 -->

    <div class="register">
      <div class="register-container-item">
        <div class="register-header">
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
          <h1 class="form_heading">注 册</h1>
        </div>
        <el-form
          class="register-form"
          ref="registerForm"
          :model="registerForm"
          :rules="registerFormRules"
        >
          <el-form-item
            class="form-item"
            label="账号"
            :label-width="registerFormLabelWidth"
          >
            <el-input
              v-model="registerForm.account"
              autocomplete="off"
              placeholder="Account"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="registerFormLabelWidth">
            <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
              placeholder="Password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="80px">
            <el-input
              type="password"
              v-model="registerForm.checkPassword"
              autocomplete="off"
              placeholder="Checkout Password"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="registerFormLabelWidth">
            <el-input
              v-model="registerForm.name"
              autocomplete="off"
              placeholder="Name"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="registerFormLabelWidth">
            <el-input
              v-model="registerForm.email"
              autocomplete="off"
              placeholder="Email"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="registerFormLabelWidth">
            <el-select v-model="registerForm.gender" placeholder="Gender">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="院校" :label-width="registerFormLabelWidth">
            <el-select v-model="registerForm.code" placeholder="College">
              <el-option label="哈尔滨商业大学" value="10240"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="none-register-footer">
          <el-button type="primary" @click="registerSubmit()">注 册</el-button>
          <el-button @click="toLogin()">去 登 录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/login";

export default {
  name: "Register",
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
      /* 表单相关 */
      registerFormLabelWidth: "80px", // label宽度
      // 表单表格
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
    };
  },
  methods: {
    // 注册
    registerSubmit() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
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
              this.toLogin();
            })
            .catch((error) => {
              this.loginload = false;
            });
        }
      });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
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
  },
};
</script>

<style lang="scss">
.register {
  max-width: 496px;
  min-width: 460px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // flex-wrap: no-wrap;
  margin: 40px auto;
  margin-top: 90px;
  // padding-top: 90px;
  border-radius: 8px; // 圆角
  background: #f9fbff;
  box-shadow: 20px 20px 60px #d4d5d9, -20px -20px 60px #ffffff;

  .register-container-item {
    padding: 50px 0;
    padding-bottom: 0px;

    .register-header {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #7878bd;
      margin: 0 auto;
      margin-bottom: 15px;

      .form_heading {
      }
    }

    .register-form {
      width: 298px;
      // height: 150px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      // align-items: center;

      .el-form-item {
        width: 100%;
        display: flex;
        text-align: center;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 10px;

        // label
        .el-form-item__label {
          color: #787ac1;
        }

        .el-form-item__content {
          margin-left: 0px !important;
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

    // 注册按钮
    .none-register-footer {
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

  // 注册表单

  // h1 {
  //   text-align: center;
  // }
}
</style>
