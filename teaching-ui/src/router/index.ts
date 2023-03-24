

import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue'),
    meta: {
      title: '测试页',
      keepAlive: false
    }
  },
]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// })
const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router;