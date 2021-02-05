<template>
  <div id="map" style="width:100%;height:99%"></div>
</template>

<script>
export default {
  name: "gooleMap",
  data: function() {
    return {
      map: null
    };
  },
  methods: {
    initMap() {
      let map = L.map("map", {
        minZoom: 3,
        maxZoom: 14,
        center: [43.88,125.35],
        zoom: 6,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857
      });
      this.map = map; //data上需要挂载
      window.map = map;
      L.tileLayer(
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
      ).addTo(map);
    },
  },
  mounted() {
    this.initMap();
  }
};
</script>
<style>
</style>


