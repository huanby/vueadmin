<template>
  <el-container>
    <el-main style="padding: 10px;">
      <iframe :src="src" scrolling="auto" frameborder="0" class="trend-container2" id="iframe"></iframe>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "formDesign",
  data() {
    return {
      src: "http://112.125.126.80:9998/"
    };
  },
  methods: {},
  components: {}
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
