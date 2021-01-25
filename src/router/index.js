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
        path: '/appuser',
        name: 'appuser',
        component: resolve => require(['../views/test/AppUser.vue'], resolve),
        meta: {
          title: 'app用户',
          requireAuth: true
        }
      },

      // 系统管理
      {
        path: '/userManage',
        name: 'userManage',
        component: resolve => require(['../views/system/UserManage.vue'], resolve),
        meta: {
          title: '用户管理',
          requireAuth: true
        }
      },
      {
        path: '/roleManage',
        name: 'roleManage',
        component: resolve => require(['../views/system/RoleManage.vue'], resolve),
        meta: {
          title: '角色管理',
          requireAuth: true
        }
      },
      {
        path: '/systemManage',
        name: 'systemManage',
        component: resolve => require(['../views/system/SystemManage.vue'], resolve),
        meta: {
          title: '系统管理',
          requireAuth: true
        }
      },
      {
        path: '/deptManage',
        name: 'deptManage',
        component: resolve => require(['../views/system/DeptManage.vue'], resolve),
        meta: {
          title: '部门管理',
          requireAuth: true
        }
      },

      //任务调度
      {
        path: '/timedTask',
        name: 'timedTask',
        component: resolve => require(['../views/job/TimedTask.vue'], resolve),
        meta: {
          title: '定时任务',
          requireAuth: true
        }
      },
      {
        path: '/taskLog',
        name: 'taskLog',
        component: resolve => require(['../views/job/TaskLog.vue'], resolve),
        meta: {
          title: '调度日志',
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