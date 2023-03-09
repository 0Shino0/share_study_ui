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
    path: "/login",
    name: "Login",
    component: () => import('@/views/login'),
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
