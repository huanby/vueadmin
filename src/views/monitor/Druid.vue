<template>
  <el-container>
    <el-main style="padding: 10px;overflow-y:hidden;">
      <iframe :src="src" scrolling="auto" frameborder="0" class="trend-container2" id="iframe"></iframe>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "swagger",
  data() {
    return {
      src: this.$api+"druid/sql.html"
    };
  }
};
</script>

<style scoped>
.trend-container2 {
  position: relative;
  width: 100%;
  min-height: 650px;
  padding-bottom: 16px;
}
</style>
