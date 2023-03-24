import { createApp } from 'vue'
// import './style.css'
import App from '@/App.vue'

import router from './router'
import { createPinia } from 'pinia'

/* element-plus */
import ElementPlus from 'element-plus'
import 'element-plus/es/components/message/style/css'
import '@/assets/icon/iconfont.css' // 图标字体相关
import { ElMessage } from 'element-plus'

import eventBus from '@libs/eventBus' // Vue3事件解决方案
/* 网页国际化 */
// import i18n from './language/i18n'


const app = createApp(App)
// 全局组件
app.provide('$message', ElMessage) // element-plus消息组件
app.provide('$bus', eventBus) // element-plus消息组件
// app.config.globalProperties.$message = ElMessage

// 全局变量

// 全局方法

// app.use(i18n);// 网页国际化
app.use(router)
app.use(createPinia()) // 启用 Pinia
app.use(ElementPlus)
app.mount('#app')
