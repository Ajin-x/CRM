<template>
  <div class="echart_box">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <chart2></chart2>
  </div>
</template>

<script>
import chart2 from "./chart2";
export default {
  data() {
    return {};
  },

  components: {
    chart2
  },

  computed: {},

  methods: {},
};
</script>
<style lang='less' scoped>
.echart_box {
  width: 100%;
  height: 100%;
}
</style>