<template>
  <el-container style="height:99%">
    <el-main style="padding: 10px;">
      <el-card class="box-card" style="height:99%">
        <!-- <H2>项目介绍</H2>
        <el-row>
          <el-col :span="4">
            <H3>后台功能模块</H3>用户管理
            <br>角色管理
            <br>权限管理
            <br>部门管理
            <br>菜单管理
            <br>代码生成
            <br>字典管理
            <br>系统监控
            <br>日志管理
            <br>消息通知
            <br>参数配置
            <br>定时任务
          </el-col>
          <el-col :span="4">
            <H3>前端技术：</H3>vue.js、 Element
            <H3>后端技术：</H3>SpringBoot、
            Shiro、
            Mybatis-plus
            <H3>数据库：</H3>MySQL、redis
          </el-col>
          <el-col :span="4">
             <el-image :src="src"></el-image>
          </el-col>
        </el-row> -->
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "dashboard",
  data: function() {
    return {
      src:require("@/assets/imgs/dsm.png")
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style>
</style>


