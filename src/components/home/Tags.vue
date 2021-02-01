<template>
  <div class="tags" v-if="showTags">
    <div class="tags-cont">
      <i class="el-icon-d-arrow-left" style="width:20px;line-height: 40px;margin-left: 10px"></i>
      <el-scrollbar
        ref="scrollContainer"
        :vertical="false"
        class="scroll-container"
        style="width:100%;height:100%"
      >
        <ul>
          <li
            class="tags-li"
            v-for="(item,index) in tagsList"
            :class="{'active': isActive(item.path)}"
            :key="index"
          >
            <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
            <span v-show="item.path!= '/dashboard'" class="tags-li-icon" @click="closeTags(index)">
              <i class="el-icon-close"></i>
            </span>
          </li>
        </ul>
      </el-scrollbar>
      <i class="el-icon-d-arrow-right" style="width:20px;line-height: 40px;"></i>
    </div>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button class="mbtn" type="primary" style="background-color: #009688;">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="refresh">刷新</el-dropdown-item>
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tagsList: []
    };
  },
  methods: {
    //是否选中
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/");
      }
    },
    // 关闭全部标签
    closeAll() {
      // this.tagsList = [];
      // this.$router.push("/");
      const curItem = this.tagsList.filter(item => {
        return item.path == "/dashboard";
      });
      this.tagsList = curItem;
      this.$router.push("/");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath || item.path == "/dashboard";
      });
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (this.tagsList.length >= 10) {
          this.tagsList.splice(1, 1);
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          // name: route.matched[1].components.default.name
          name: route.name
        });
      }
      // F5刷新路由 判断是否存在首页
      var tagsList_ = this.tagsList.filter(e => e.name == "dashboard");
      if (tagsList_.length == 0) {
        tagsList_.push({
          path: "/dashboard",
          name: "dashboard",
          title: "首页"
        });
        this.tagsList = tagsList_.concat(this.tagsList);
      }
      this.$EventBus.$emit("tags", this.tagsList);
    },
    handleTags(command) {
      if (command === "other") {
        this.closeOther();
      } else if (command === "all") {
        this.closeAll();
      } else if (command === "refresh") {
        this.refreshTag();
      }
    },
    refreshTag() {
      this.$EventBus.$emit("refreshTag");
    },
    // deltaXleft() {
    //   alert("222");
    //   const $scrollWrapper = this.scrollWrapper;
    //   let leftScoll = $scrollWrapper.scrollWidth;
    //   const timer = setInterval(() => {
    //     leftScoll = parseInt(leftScoll / 10);
    //     if (leftScoll <= 0) {
    //       clearInterval(timer);
    //       $scrollWrapper.scrollLeft = leftScoll;
    //     }
    //   }, 15);
    // },
    // deltaXright(e) {
    //   const $scrollWrapper = this.scrollWrapper;
    //   let left = 1;
    //   const leftScoll = $scrollWrapper.scrollWidth;
    //   const timer = setInterval(() => {
    //     left = left * 10;
    //     if (leftScoll <= left) {
    //       clearInterval(timer);
    //       $scrollWrapper.scrollLeft = left;
    //     }
    //   }, 15);
    // }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created() {
    this.setTags(this.$route);
  }
};
</script>


<style>
.tags {
  position: relative;
  height: 40px;
  /* overflow: hidden; */
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}
.tags ul {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* overflow: hidden; */
  margin-left: 20px;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 30px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  background-color: #009688 !important;
  color: #fff;
}

.tags-li-title {
  float: left;
  line-height: 30px;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}
.mbtn {
  height: 35px;
}
.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 40px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.tags-cont {
  padding: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
}
</style>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
