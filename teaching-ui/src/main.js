import Vue from "vue";
import App from "./App.vue";

import Cookies from 'js-cookie'

import axios from "axios";
import router from "./router";
import store from "./store";

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icon/iconfont.css' // 图标字体相关
import { Message } from 'element-ui'

import Loading from '@/components/Loading';

import { resetForm,getTokenData } from "@/utils/index"

// import Dialog from "@/components/Dialog.vue";

// 全局变量
Vue.prototype.globalInfo = {
  bodyWidth: 1300,
}
Vue.prototype.$message = Message; // 全局element
Vue.prototype.$axios = axios; // axios请求
// Vue.prototype.$userInfo = getTokenData(); // 全局用户信息


// 全局方法
Vue.prototype.resetForm = resetForm;
Vue.prototype.getTokenData = getTokenData;

// 全局组件 Vue.component('DictTag', DictTag)
// Vue.component('Dialog', Dialog)
Vue.component('Loading', Loading)


// Vue.use(Element, {
//   size: Cookies.get('size') || 'small' // set element-ui default size
// });
Vue.use(Element);

Vue.config.productionTip = false;


new Vue({
  beforeCreate() {
    // 1) 创建或指定事件总线对象，保存到Vue的原型上
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
