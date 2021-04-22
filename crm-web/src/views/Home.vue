<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div>
          <!-- <img src="../assets/logo.png" alt="" /> -->
          <span class="crm">客户管理系统</span>
        </div>

        <div>
          <span class="headSpan"
            >您好，{{ this.$store.state.userData.username }}</span
          >
          <span class="headSpan"
            >您的职位是，{{ this.$store.state.userData.jobName }}</span
          >
          <el-button type="primary" @click="changePasswordVisible = true" round
            >修改密码</el-button
          >
          <el-button type="primary" @click="loginOut" round>登出</el-button>
        </div>

        <!-- header里面点击修改密码弹出对话框 -->
        <el-dialog
          title="修改密码"
          :visible.sync="changePasswordVisible"
          @close="closeChangePassword"
        >
          <el-form :model="userFrom" ref="userFromRef">
            <el-form-item label="旧密码">
              <el-input
                v-model="userFrom.oldPassword"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="userFrom.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="userFrom.surePassword" type="password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changePasswordVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePassword('userFrom')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 左边菜单导航 -->
          <!-- 打开路由 router:true-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="rgb(51, 55, 68"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            keep-alive
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>系统功能</span>
              </template>
              <el-submenu index="1-1" v-if="isCustomer">
                <template slot="title">员工管理</template>
                <el-menu-item index="/user">员工信息</el-menu-item>
              </el-submenu>
              <el-submenu index="1-2" v-if="isService">
                <template slot="title">客户管理</template>
                <el-menu-item index="/customer">客户信息</el-menu-item>
                <el-menu-item index="/lossCustomer">流失客户信息</el-menu-item>
              </el-submenu>
              <el-submenu index="1-3" v-if="isShow">
                <template slot="title">数据分析</template>
                <el-menu-item index="/customerData">每月新增客户</el-menu-item>
                <el-menu-item index="/customerData2">每月流失客户</el-menu-item>
              </el-submenu>
              <el-submenu index="1-4" v-if="isAdmin">
                <template slot="title">数据库备份</template>
                <el-menu-item @click="barkupsql">备份</el-menu-item>
                <el-menu-item @click="restoresql">还原</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <div class="main_box">
          <el-main>
            <router-view></router-view>
          </el-main>
        </div>
      </el-container>
    </el-container>
    <!-- <button >退出</button> -->

    <!-- 数据库备份dialog -->
    <el-dialog title="选择要还原的数据库" :visible.sync="backupVisible">
      <el-form :model="backupform">
        <el-form-item label="活动区域">
          <el-select
            v-model="backupform.filename.filename"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="item in filenames"
              :key="item.value"
              :value="item.value"
            >
              <span>{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backupVisible = false">取 消</el-button>
        <el-button type="primary" @click="restoresqlForSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 还原数据库对话框
      backupVisible: false,
      backupform: {
        filename: {
          filename: "",
        },
      },
      filenames: [],
      isShow:
        this.$store.state.userData.power == "customerall" ||
        this.$store.state.userData.power == "systemall"
          ? true
          : false,
      isCustomer:
        this.$store.state.userData.power == "customermy" ? false : true,
      isAdmin: this.$store.state.userData.power == "systemall" ? true : false,
      isService:
        this.$store.state.userData.power == "userall" ||
        this.$store.state.userData.power == "usermy"
          ? false
          : true,
      changePasswordVisible: false,
      userFrom: {
        username:this.$store.state.userData.username,
        surePassword:"",
        password: "",
        oldPassword: "",
      },
    };
  },

  components: {},

  computed: {},

  methods: {
    loginOut() {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
    },
    changePassword(userFrom) {
      this.$refs.userFromRef.validate((valid) => {
        console.log(
          this.userFrom.oldPassword,
          this.$store.state.userData.password
        );
        if (
          this.$md5(this.userFrom.oldPassword) !==
          this.$store.state.userData.password
        ) {
          this.$message.error("请输入正确的旧密码！");
          return;
        } else if (this.userFrom.password == "") {
          this.$message.error("新密码不能为空！");
          return;
        }else if (this.userFrom.password!==this.userFrom.surePassword){
          this.$message.error("两次输入的密码不一致！")
          return 
        } 
        this.$axios 
          .patch("/users/updatePassword", this.userFrom)
          .then((res) => {
            if (res.data.status == 200) {
              this.$router.push("/login");
              this.$message.success(res.data.message);
            }
          });
        console.log(this.userFrom);
        this.changePasswordVisible = !this.changePasswordVisible;
      });
    },
    closeChangePassword() {
      this.$refs.userFrom.resetFields();
    },
    barkupsql() {
      let time =
        "" +
        new Date().getFullYear() +
        `${new Date().getMonth() + 1}` +
        new Date().getDate() +
        new Date().getHours() +
        new Date().getMinutes();
      let filename = {
        filename: `backup${time}.sql`,
      };
      this.$confirm(
        `将会为您生成一个${filename.filename}文件, 是否继续?`,
        `备份当前数据库`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$axios.get("/users/backup", { params: filename }).then((res) => {
            this.$message.success(res.data);
          });
        })
        .catch(() => {
          this.$message.error("备份失败!");
        });
    },
    restoresql() {
      this.backupVisible = !this.backupVisible;
      this.$axios.get("/users/getFilename").then((res) => {
        console.log(res.data.result);
        this.filenames = res.data.result;
      });
      // let time =
      //   "" +
      //   new Date().getFullYear() +
      //   `${new Date().getMonth() + 1}` +
      //   new Date().getDate();
      // console.log(time);
    },
    restoresqlForSure() {
      this.$axios
        .get("/users/restore", { params: this.backupform.filename })
        .then((res) => {
          this.$message.success(res.data);
          this.backupVisible = false;
        });
    },
  },
  created() {
    // console.log(this.$store.state.userData);
  },
};
</script>
<style lang='less' scoped>
.home {
  height: 100vh;
}
.headSpan {
  margin-right: 50px;
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
  .crm {
    margin-left: 15px;
  }
}
.el-aside {
  background: rgb(51, 55, 68);
}
.el-main {
  background: rgb(234, 237, 241);
  height: 100%;
}
.main_box {
  height: 100%;
  width: 100%;
}
</style>
