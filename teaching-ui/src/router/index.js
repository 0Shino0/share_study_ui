import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { // 登录
    path: "/login",
    name: "Login",
    component: () => import('@/views/login'),
    meta: { title: '登录'},
    hidden: true
  },
  
  { // 注册
    path: "/register",
    name: "Register",
    component: () => import('@/views/register'),
    meta: { title: '注册'},
    hidden: true
  },

  { // 404
    path: '/404',
    component: () => import('@/views/404'),
    meta: { title: '404 Not Found' },
    hidden: true,
  },


  {
    path: "/",
    name: "Home",
    component: () => import('@/views/home'),
    meta: { title: '首页'},
  },
  {
    path: "/addPost/:id",
    name: "addPost",
    component: () => import('@/views/addPost'),
    meta: { title: '发布帖子'},
  },
  {
    path: "/postDetail/:id",
    name: "postDetail",
    component: () => import('@/views/postDetail'),
    meta: { title: '帖子详情'},
  },
  {
    path: "/about",
    name: "about",
    component: () => import('@/views/about'),
    meta: { title: '关于自己'},
  },
  // 测试
  {
    path: "/test",
    name: "test",
    component: () => import('@/views/test'),
    meta: { title: '测试'},
  },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
];

const router = new VueRouter({
  routes,
});

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;
