import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui';
import utils from './assets/js/utils.js'
import 'element-ui/lib/theme-chalk/index.css';
//import './assets/css/theme-green/index.css';       // 浅绿色主题
import "./assets/icon/iconfont.css"; //引入阿里巴巴矢量图标库

import 'leaflet/dist/leaflet.css'
import L from "leaflet";
import baseUrl from'@/assets/js/baseUrl.js'
import './assets/js/shiro-login.js'
Vue.use(L);
Vue.use(ElementUI, {
  size: 'small'
});
 axios.defaults.withCredentials = true
 axios.defaults.crossDomain = true
//设置请求头
axios.defaults.headers.post["Content-type"] = "application/json;charset=UTF-8"
// 全局属性
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$utils = utils
Vue.prototype.$api = baseUrl.BASEDEV

//路由守卫(判断是否登录)
router.beforeEach((to, from, next) => {
  console.log("router--from", from, "router--to", to);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    let login = JSON.parse(localStorage.getItem('islogin'));
    if (login) { //判断本地是否存在access_token
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/login") {
    if (JSON.parse(localStorage.getItem('islogin'))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')