<template>
  <div id="map" style="width:100%;height:99%"></div>
</template>

<script>
import "@supermap/iclient-leaflet";
export default {
  name: "superMap",
  data: function() {
    return {
      map: null
    };
  },
  methods: {
    initMap() {
      let url =
        "https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China";
      let map = L.map("map", {
        center: [43.88,125.35], // 中心点
        minZoom: 3,
        maxZoom: 14,
        zoom: 6,
        zoomControl : false
      });
      this.map = map; //data上需要挂载
      //   window.map = map;
      L.supermap.tiledMapLayer(url).addTo(map);
      // var myIcon = L.icon({
      //   iconUrl: require("@/assets/imgs/dsm.png"),
      //   iconSize: [90, 95],
      //   iconAnchor: [22, 94],
      //   popupAnchor: [-3, -76],
      //   shadowUrl: "",
      //   shadowSize: [90, 95],
      //   shadowAnchor: [22, 94]
      // });
      // L.marker([43.05, 124.18], { icon: myIcon })
      //   .addTo(map)
      //   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      //   .openPopup();
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>
<style>
</style>


