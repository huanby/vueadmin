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
      menuItems: [],
      items: [
        {
          icon: "el-icon-house",
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
              index: "",
              title: "图片",
              subs: [
                {
                  index: "showimg",
                  title: "头像"
                }
              ]
            },
            {
              index: "appuser",
              title: "app用户"
            }
          ]
        }
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
</style>
