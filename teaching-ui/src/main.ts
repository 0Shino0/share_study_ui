import { createApp } from 'vue'
// import './style.css'
import App from '@/App.vue'

import router from './router'

/* element-plus */
import ElementPlus from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
/* 网页国际化 */
// import i18n from './language/i18n'

const app = createApp(App)
// 全局组件
app.config.globalProperties.$message = ElMessage; // element-plus消息组件

// app.use(i18n);// 网页国际化
app.use(router)
app.use(ElementPlus)
app.mount('#app')
