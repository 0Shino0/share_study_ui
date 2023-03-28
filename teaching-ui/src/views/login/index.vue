<script lang="ts">
// 这是一个基于 TypeScript 的 Vue 组件
import { defineComponent, onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
// import { storeToRefs } from "pinia";
import { useUserStore } from "@/store"; // 导入Store
import { LoginMember, UserInfoMember } from "@/store/user"; // 获取类型
import type { FormInstance, FormRules } from "element-plus";
import $bus from "@libs/eventBus";

import { login } from "@/api/login";

export default defineComponent({
  setup(props, context) {
    // 在这里声明数据，或者编写函数并在这里执行它
    // 在使用 setup 的情况下，请牢记一点：不能再用 this 来获取 Vue 实例
    // pinia $ router
    const userStore = useUserStore();
    const router = useRouter();
    // 全局信息
    const $message: any = inject("$message");

    // 表单信息
    const loginFormLabelWidth = ref<string>("");
    const loginFormRef = ref<FormInstance>(); // ref
    const loginForm = ref<LoginMember>({
      account: "",
      password: "",
    });
    const loginFormRules = ref<FormRules>({
      account: [{ required: true, trigger: "blur" }],
      password: [{ required: true, trigger: "blur" }],
    });

    // 生命周期钩子
    onMounted(() => {});

    // 方法 methods
    // 登录
    const loginSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid) => {
        if (valid) {
          // 登录
          // console.log(this.loginForm);
          userStore
            .login(loginForm.value)
            .then((response) => {
              // console.log(response);
              const userInfo: UserInfoMember = response as UserInfoMember;
              resetLogin(formEl);
              $message({
                type: "info",
                message: "登录成功",
              });
              // 如果当前不是首页则跳转
              console.log(window.location.href.split("#")[1]);
              if (window.location.href.split("#")[1] !== "/") {
                router.push({ path: "/" });
              }
              // 获取信息
              $bus.emit("getPostPageInfo", "1");
              $bus.emit("updateUserInfo", userInfo);
            })
            .catch((error) => {
              console.log(error);
              // userInfo = undefined;
              resetLogin(formEl);
              // console.log('退出登录');
            });
        }
      });
    };

    const toRegister = () => {
      router.push({ path: "/register" });
    };

    // 登录表单重置
    const resetLogin = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      loginForm.value = {
        account: "",
        password: "",
      };
      formEl.resetFields();
    };

    // 计算方法 computed

    // 监听 watch

    return {
      // 需要给 `<template />` 用的数据或函数，在这里 `return` 出去
      loginFormLabelWidth,
      loginFormRef,
      loginForm,
      loginFormRules,

      // 方法
      loginSubmit,
      toRegister,
    };
  },
});
</script>

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
          ref="loginFormRef"
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
          <el-button type="primary" @click="loginSubmit(loginFormRef)"
            >登 录</el-button
          >
          <el-button @click="toRegister()">去 注 册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

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

        .el-form-item__label,
        .el-form-item__content {
          height: 40px;
        }

        // label
        .el-form-item__label {
          color: #787ac1;
        }

        .el-form-item__content {
          .el-input {
            .el-input__wrapper {
              padding: 0;
              input {
                height: 40px;
                padding-left: 15px;
                padding-right: 15px;
                border-radius: 8px;
                border: none;
                background-color: #e9e9f7;
              }
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
        height: 46.5px;
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
