import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
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

      //系统监控
      {
        path: '/swagger',
        name: 'swagger',
        component: resolve => require(['../views/monitor/Swagger.vue'], resolve),
        meta: {
          title: 'swagger文档',
          requireAuth: true
        }
      },
      {
        path: '/druid',
        name: 'druid',
        component: resolve => require(['../views/monitor/Druid.vue'], resolve),
        meta: {
          title: 'druid监控',
          requireAuth: true
        }
      },
      //开发者工具
      {
        path: '/formDesign',
        name: 'formDesign',
        component: resolve => require(['../views/developerTools/FormDesign.vue'], resolve),
        meta: {
          title: '页面表格设计',
          requireAuth: true
        }
      },
      {
        path: '/generator',
        name: 'generator',
        component: resolve => require(['../views/developerTools/Generator.vue'], resolve),
        meta: {
          title: '代码生成工具',
          requireAuth: true
        }
      },
      {
        path: '/paramsConfig',
        name: 'paramsConfig',
        component: resolve => require(['../views/developerTools/ParamsConfig.vue'], resolve),
        meta: {
          title: '参数配置',
          requireAuth: true
        }
      },
      // 模块功能
      {
        path: '/superMap',
        name: 'superMap',
        component: resolve => require(['../views/module/map/SuperMap.vue'], resolve),
        meta: {
          title: '超图',
          requireAuth: true
        }
      },
      {
        path: '/gooleMap',
        name: 'gooleMap',
        component: resolve => require(['../views/module/map/GooleMap.vue'], resolve),
        meta: {
          title: '谷歌地图',
          requireAuth: true
        }
      },
      {
        path: '/aMap',
        name: 'aMap',
        component: resolve => require(['../views/module/map/AMap.vue'], resolve),
        meta: {
          title: '高德地图',
          requireAuth: true
        }
      },
      {
        path: '/baiduMap',
        name: 'baiduMap',
        component: resolve => require(['../views/module/map/BaiduMap.vue'], resolve),
        meta: {
          title: '百度地图',
          requireAuth: true
        }
      },
      {
        path: '/areaChar',
        name: 'areaChar',
        component: resolve => require(['../views/module/charts/AreaChar.vue'], resolve),
        meta: {
          title: '面积图',
          requireAuth: true
        }
      },
      {
        path: '/cakeChar',
        name: 'cakeChar',
        component: resolve => require(['../views/module/charts/CakeChar.vue'], resolve),
        meta: {
          title: '饼状图',
          requireAuth: true
        }
      },
      {
        path: '/lineChar',
        name: 'lineChar',
        component: resolve => require(['../views/module/charts/LineChar.vue'], resolve),
        meta: {
          title: '线图',
          requireAuth: true
        }
      },
      {
        path: '/columnChar',
        name: 'columnChar',
        component: resolve => require(['../views/module/charts/ColumnChar.vue'], resolve),
        meta: {
          title: '柱状图',
          requireAuth: true
        }
      },
      {
        path: '/scatter',
        name: 'scatter',
        component: resolve => require(['../views/module/charts/Scatter.vue'], resolve),
        meta: {
          title: '散点图',
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