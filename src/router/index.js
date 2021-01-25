import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/login/Login.vue'], resolve),
    meta: {
      title: '登录页面'
    }
  },
  {
    path: '/',
    component: resolve => require(['../components/home/Index.vue'], resolve),
    meta: {
      title: ''
    },
    children: [{
        path: '/dashboard',
        name: 'dashboard',
        component: resolve => require(['../views/dashboard/Dashboard.vue'], resolve),
        meta: {
          title: '首页',
          requireAuth: true
        }
      },
      {
        path: '/403',
        name: '403',
        component: resolve => require(['../views/error/403.vue'], resolve),
        meta: {
          title: '403',
          requireAuth: true
        }
      },
      {
        path: '/404',
        name: '404',
        component: resolve => require(['../views/error/404.vue'], resolve),
        meta: {
          title: '404',
          requireAuth: true
        }
      },



      {
        path: '/form',
        name: 'form',
        component: resolve => require(['../views/test/BaseForm.vue'], resolve),
        meta: {
          title: '表单',
          requireAuth: true
        }
      },
      {
        path: '/showimg',
        name: 'showimg',
        component: resolve => require(['../views/test/Showimg.vue'], resolve),
        meta: {
          title: '头像',
          requireAuth: true
        }
      },
      {
        path: '/appuser',
        name: 'appuser',
        component: resolve => require(['../views/test/AppUser.vue'], resolve),
        meta: {
          title: 'app用户',
          requireAuth: true
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router