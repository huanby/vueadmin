<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
export default {
  data() {
    return {
      bindKeys: {},
      tagsList: [],
      collapse: false
    };
  },
  computed: {
    key() {
      return this.bindKeys[this.$route.name];
    }
  },
  methods: {},
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    //监听菜单收缩按钮
    this.$EventBus.$on("collapse", msg => {
      this.collapse = msg;
    });
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    this.$EventBus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
    // 点击强制刷新按钮会触发这里。
    this.$EventBus.$on("refreshTag", msg => {
      //利用router-view key值变化会导致内容刷新来实现页面强制刷新
      this.$set(this.bindKeys, this.$route.name, new Date().getTime());
    });
  },
  mounted() {
    // 请求首页展示数据
    this.$axios
      .post("http://127.0.0.1:8089/index")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}

.content {
  width: auto;
  height: 100%;
  /* padding: 5px; */
  overflow-y: auto;
  box-sizing: border-box;
}

.content-collapse {
  left: 65px;
}
</style>
