<template>
  <div id="container"></div>
</template>
<script>
export default {
  name: "aMap",
  data() {
    return {};
  },
  methods: {
    initMap() {
      var map = new AMap.Map("container", {
        center: [125.35,43.88],
        layers: [
          //只显示默认图层的时候，layers可以缺省
          new AMap.TileLayer() //高德默认标准图层
        ],
        zoom: 12
      });
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>
<style scoped>
#container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>


