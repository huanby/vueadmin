
<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="rgb(22, 38, 49)"
      text-color="#f5f7fa"
      active-text-color="#009688"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index+''" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index+''" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
      //menuItems的作用
      menuItems: [],
      items: [
        {
          icon: "iconfont emoji_fill",
          index: "dashboard",
          title: "系统首页"
        },
        {
          icon: "el-icon-info",
          index: "error",
          title: "错误页面",
          subs: [
            {
              index: "403",
              title: "403"
            },
            {
              index: "404",
              title: "404"
            }
          ]
        },
        {
          icon: "el-icon-question",
          index: "form",
          title: "测试页面",
          subs: [
            {
              index: "form",
              title: "表单"
            },
            {
              index: "appuser",
              title: "app用户"
            }
          ]
        },
        // 系统监控
        {
          icon: "el-icon-question",
          index: "monitor",
          title: "系统监控",
          subs: [
            {
              index: "swagger",
              title: "swagger文档"
            }         
          ]
        },
        //系统管理
        // {
        //   icon: "el-icon-question",
        //   index: "system",
        //   title: "系统管理",
        //   subs: [
        //     {
        //       index: "userManage",
        //       title: "用户管理"
        //     },
        //     {
        //       index: "roleManage",
        //       title: "角色管理"
        //     },
        //     {
        //       index: "systemManage",
        //       title: "系统菜单"
        //     },
        //     {
        //       index: "deptManage",
        //       title: "部门管理"
        //     }
        //   ]
        // },
        //任务调度
        // {
        //   icon: "el-icon-question",
        //   index: "job",
        //   title: "任务调度",
        //   subs: [
        //     {
        //       index: "timedTask",
        //       title: "定时任务"
        //     },
        //     {
        //       index: "TaskLog",
        //       title: "调度日志"
        //     }
        //   ]
        // }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    this.$EventBus.$on("collapse", msg => {
      this.collapse = msg;
    });
  },
  mounted() {
    // 请求首页展示数据
    this.$axios
      .post("http://127.0.0.1:8089/index")
      .then(res => {
        console.log("success");
        console.log(res.data);
        //菜单赋值为空
        // this.items = []
        // const arr = ["1", "2"];
        // console.log(res.data.menus);
        res.data.menus.forEach(element => {
          // console.log(element);
          var subs = [];
          if (element.children != null) {
            //遍历数组
            for (const item of element.children) {
              // console.log(item);
              // console.log(item.attributes.route);
              subs.push({
                index: item.attributes.route,
                // $route: item.attributes.route,
                // url: item.attributes.route,
                title: item.text
              });
            }
          }
          this.items.push({
            icon: element.attributes.icon,
            index: element.attributes.route,
            title: element.text,
            subs: subs
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
/* .iconfont {
  font-size: 25px;
} */
</style>