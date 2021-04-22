<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息维护管理</el-breadcrumb-item>
      <el-breadcrumb-item>维护管理</el-breadcrumb-item>
    </el-breadcrumb>
      <el-button type="primary">主要按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {},
  created() {},
};
</script>
<style lang='less' scoped>
.el-row {
  display: flex;
}
.el-table {
  text-align: center;
}
</style>