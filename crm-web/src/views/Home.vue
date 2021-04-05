<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="" />
          <span>CRM客户管理系统</span>
        </div>
        <div>
          <el-button type="primary" @click="loginOut">登出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">

          <!-- 左边菜单导航 -->
          <!-- 打开路由 router:true-->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="rgb(51, 55, 68)"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :router="true"
          >
            <!-- 一级导航 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>员工管理</span>
              </template>

              <!-- 二级导航 -->
              <!-- 路由跳转是在Index中写 -->
              <el-menu-item index="/user">
                <i class="el-icon-menu"></i>
                <span slot="title">管理员工信息</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>

          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="rgb(51, 55, 68)"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :router="true"
            menu-trigger="click"
          >
            <!-- 一级导航 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>

              <!-- 二级导航 -->
              <!-- 路由跳转是在Index中写 -->
              <el-menu-item index="2" class="menuHover" >
                <i class="el-icon-menu"></i>
                <span slot="title" >导航二</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>

          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="rgb(51, 55, 68)"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :router="true"
            menu-trigger="click"
          >
            <!-- 一级导航 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>

              <!-- 二级导航 -->
              <!-- 路由跳转是在Index中写 -->
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>

          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="rgb(51, 55, 68)"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :router="true"
            menu-trigger="click"
          >
            <!-- 一级导航 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>

              <!-- 二级导航 -->
              <!-- 路由跳转是在Index中写 -->
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- <button >退出</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {
    loginOut() {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang='less' scoped>
.home {
  height: 100vh;
}
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    color: #fff;
  }
  img {
    width: 80px;
    height: 60px;
    //设置图片跟字中间对齐
    vertical-align: middle;
  }
  .el-button {
    padding: 10px 40px;
  }
}
.el-header {
  background: rgb(51, 55, 68);
}
.el-aside {
  background: rgb(51, 55, 68);

}
.el-main {
  background: rgb(234, 237, 241);
}

</style>
