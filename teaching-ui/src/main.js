import Vue from "vue";
import App from "./App.vue";

import Cookies from 'js-cookie'

import router from "./router";
import store from "./store";

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icon/iconfont.css' // 图标字体相关
import {Message} from 'element-ui'

import { resetForm } from "@/utils/index"

// import Dialog from "@/components/Dialog.vue";

// 全局变量
Vue.prototype.globalInfo = {
  bodyWidth: 1300,
}
Vue.prototype.$message = Message; // 全局element

// 全局方法
Vue.prototype.resetForm = resetForm

// 全局组件 Vue.component('DictTag', DictTag)
// Vue.component('Dialog', Dialog)


// Vue.use(Element, {
//   size: Cookies.get('size') || 'small' // set element-ui default size
// });
Vue.use(Element);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
