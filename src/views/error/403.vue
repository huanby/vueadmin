<template>
  <div class="error-page">
    <div class="error-code">
      4
      <span>0</span>3
    </div>
    <div class="error-desc">啊哦~ 你没有权限访问该页面哦</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">返回首页</el-button>
      </router-link>
      <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "403",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    alert("403 mounted.............");
    //  this.$axios
    //     .get("http://127.0.0.1:8089/admin", {
    //       params: {
    //         name: "dddd",
    //       }
    //     })
    //     .then(res => {
    //       console.log(res.data);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    let data = {
      name: "ddd"
    };
    this.$axios
      .post("http://127.0.0.1:8089/admin", this.$qs.stringify(data))
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
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
}
.error-code {
  line-height: 1;
  font-size: 250px;
  font-weight: bolder;
  color: #f02d2d;
}
.error-code span {
  color: #00a854;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}
.error-btn {
  margin-left: 100px;
}
</style>
