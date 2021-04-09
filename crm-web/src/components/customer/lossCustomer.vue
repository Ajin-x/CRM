<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>流失客户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card align="left">
      <!-- 搜索头部 input框 -->
      <!-- 一行表示 el-row -->
      <!-- gutter 间隔 -->
      <el-row :gutter="15">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="name.name"
            class="input-with-select"
            clearable
            @clear="getLossCustomerList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCustomer"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 渲染数据表格 -->
      <el-table
        :data="lossCustomerList"
        border
        style="width: 100%"
        align="center"
      >
        <el-table-column type="index" width="50" prop="id"> </el-table-column>
        <el-table-column prop="name" label="客户名" width="150">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="type" label="客户类别" width="100">
        </el-table-column>
        <el-table-column prop="giveUpRea" label="流失原因" width="450 ">
        </el-table-column>
        <el-table-column prop="username" label="客户负责人" width="100">
        </el-table-column>
        <el-table-column prop="" label="操作" width="80">
          <!-- el-table-column里面要加组件 外面得加一层template  -->
          <!-- slot-scope有什么用？ -->
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除用户"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-star-off"
                size="mini"
                @click="removeUserItem(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="SizeChange"
        @current-change="CurrentChange"
        :page-sizes="[5, 10]"
        :page-size="queryInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //检测输入的用户类别
    var checkType = (rule, value, cb) => {
      console.log(rule, value, cb);
      if (value === "一般" || value === "普通" || value === "重要") {
        console.log("????");
        cb();
      } else {
        cb(new Error("请输入 一般/普通/重要 三个类别之一"));
      }
    };
    //验证邮箱
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        return cb();
      }
      //返回一个错误提示
      cb(new Error("请输入合法的邮箱"));
    };
    //验证手机号码
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[345789]\d{9}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      //返回一个错误提示
      cb(new Error("请输入合法的手机号码"));
    };
    return {
      input3: "",
      //请求用户列表的参数
      queryInfo: {
        offset: 0,
        size: 5,
      },
      name: {
        name: "",
      },
      //用户列表数据
      lossCustomerList: [],
      //当前数据总数
      total: 0,
    };
  },

  components: {},

  computed: {},

  methods: {
    //input事件
    searchVal() {},
    //根据用户名获取单个用户
    getCustomer(name) {
      this.$axios
        .get("/customer/customer", { params: this.name })
        .then((res) => {
          if (res.data.status === 200) this.lossCustomerList = res.data.result;
          this.total == 0 ? (this.total = res.data.result.length) : this.total;
        });
    },
    //请求用户列表数据
    getLossCustomerList() {
      this.$axios
        .get("/customer/getLossCustomerList", { params: this.queryInfo })
        .then((res) => {
          console.log(res);

          if (res.data.status === 200) this.lossCustomerList = res.data.result;
          // this.total == 0 ? (this.total = res.data.result.length) : this.total;
        });
    },
    //获得所有用户数据
    getLossCustomers() {
      this.$axios.get("/customer/getLossCustomers").then((res) => {
        if (res.data.status === 200) this.lossCustomerList = res.data.result;
        this.total == 0 ? (this.total = res.data.result.length) : this.total;
      });
    },
    //当每页数据发生改变时触发
    SizeChange(newValue) {
      this.queryInfo.size = newValue;
      this.getLossCustomerList();
    },
    //当前页码发生改变时触发
    CurrentChange(newValue) {
      //偏移量
      this.queryInfo.offset =
        newValue == 1 ? 0 : this.queryInfo.size * (newValue - 1);
      this.getLossCustomerList();
    },

    //删除客户
    removeUserItem(row) {
      const { power } = this.$store.state.userData;
      console.log(power);
      if (power == "customermy") {
        this.$message.error("您没有相关权限！");
        return;
      }
      this.$confirm("此操作将永久删除该客户, 是否继续?", "删除用户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定发送后台请求，删除该用户
          console.log(row.id);
          this.$axios.delete(`/customer/${row.id}`).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.total = 0;
            this.getLossCustomers();
            this.getLossCustomerList();
          });
        })
        .catch(() => {
          //点击取消，取消该操作
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getLossCustomers();
    this.getLossCustomerList();
  },
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