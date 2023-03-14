import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/home'),
  },
  {
    path: "/addPost",
    name: "addPost",
    component: () => import('@/views/addPost'),
  },
  {
    path: "/postDetail/:id",
    name: "postDetail",
    component: () => import('@/views/postDetail'),
  },
  {
    path: "/about",
    name: "about",
    component: () => import('@/views/about'),
  },
];

const router = new VueRouter({
  routes,
});

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;
