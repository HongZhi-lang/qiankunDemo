import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageVue from '../components/Page.vue'
Vue.use(Router)

export default new Router({
  base: window.__POWERED_BY_QIANKUN__ ? "/app-vue" : "/",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
    },
    {
      path: "/page",
      name: "Page",
      component: PageVue,
    },
  ],
})
