import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  {
    path: "/details",
    name: "details",
    component: () =>
      import("../components/Details.vue"),
    meta: {
        keepAlive: true // 需要缓存
    }
  }
];

const router = new VueRouter({
  // mode:'history',
  routes:routes
});

export default router;
