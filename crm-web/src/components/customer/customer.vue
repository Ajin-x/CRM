<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
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
            @clear="getCustomerList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCustomer"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="addCustomerVisible = !addCustomerVisible"
          >
            添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 渲染数据表格 -->
      <el-table :data="customerList" border style="width: 100%">
        <el-table-column type="index" width="50" prop="id"> </el-table-column>
        <el-table-column prop="name" label="客户名" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="type" label="客户类别" width="100">
        </el-table-column>
        <el-table-column prop="desc" label="客户描述" width="380">
        </el-table-column>
        <el-table-column prop="userId" label="客户负责人" width="100">
        </el-table-column>
        <el-table-column prop="" label="操作" width="180">
          <!-- el-table-column里面要加组件 外面得加一层template  -->
          <!-- slot-scope有什么用？ -->
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editUser(scope.row)"
              ></el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="删除该客户"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserItem(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="修改指派员工"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
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

    <!-- 添加用户dialog -->
    <el-dialog
      title="添加客户"
      :visible.sync="addCustomerVisible"
      width="50%"
      align="left"
      @close="closeAddCustomerVisible"
    >
      <!-- 主题内容区 -->
      <el-form
        :model="addCustomerFrom"
        :rules="addCustomerFromRul"
        ref="addCustomerFromRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- prop是验证规则 -->
        <el-form-item label="客户名" prop="name">
          <el-input v-model="addCustomerFrom.name"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input v-model="addCustomerFrom.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addCustomerFrom.email"></el-input>
        </el-form-item>

        <el-form-item label="用户类别" prop="type">
          <el-input v-model="addCustomerFrom.type"></el-input>
        </el-form-item>

        <el-form-item label="用户描述" prop="desc">
          <el-input v-model="addCustomerFrom.desc"></el-input>
        </el-form-item>

        <el-form-item label="用户负责人" prop="userId">
          <el-input v-model="addCustomerFrom.userId"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCustomerVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomer">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户的对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editUserVisible"
      width="50%"
      align="left"
    >
      <!-- 主题内容区 -->
      <el-form
        :model="editUserParams"
        :rules="editUserParamsRul"
        ref="editUserParamsRel"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- prop是验证规则 -->
        <el-form-item label="用户名">
          <el-input v-model="editUserParams.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input v-model="editUserParams.phone"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
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
      customerList: [],
      //当前数据总数
      total: 0,
      //添加用户dialog显示或者隐藏
      addCustomerVisible: false,
      //添加用户参数
      addCustomerFrom: {
        name: "",
        phone: "",
        email: "",
        type: "",
        desc: "",
        userId: "",
      },
      //添加用户验证规则
      addCustomerFromRul: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          ,
          { validator: checkMobile, trigger: "blur" },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          { validator: checkEmail, trigger: "blur" },
        ],
        type: [{ required: true, message: "请输入客户类别", trigger: "blur" }],
        desc: [{ required: true, message: "请输入用户描述", trigger: "blur" }],
        userId: [
          { required: true, message: "请输入用户负责人", trigger: "blur" },
        ],
      },
      //存储获取到当前要编辑的用户信息
      editUserParams: {
        username: "",
        phone: "",
      },
      //修改用户信息dialog的规则
      editUserParamsRul: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          ,
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      //控制修改用户的显示隐藏
      editUserVisible: false,
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
          if (res.data.status === 200) this.customerList = res.data.result;
          this.total == 0 ? (this.total = res.data.result.length) : this.total;
        });
    },
    //请求用户列表数据
    getCustomerList() {
      this.$axios.get("/customer", { params: this.queryInfo }).then((res) => {
        console.log(res);

        if (res.data.status === 200) this.customerList = res.data.result;
        // this.total == 0 ? (this.total = res.data.result.length) : this.total;
      });
    },
    //获得所有用户数据
    getAllCustomers() {
      this.$axios.get("/customer/customers").then((res) => {
        if (res.data.status === 200) this.customerList = res.data.result;
        this.total == 0 ? (this.total = res.data.result.length) : this.total;
      });
    },
    //当每页数据发生改变时触发
    SizeChange(newValue) {
      this.queryInfo.size = newValue;
      this.getCustomerList();
    },
    //当前页码发生改变时触发
    CurrentChange(newValue) {
      //偏移量
      this.queryInfo.offset =
        newValue == 1 ? 0 : this.queryInfo.size * (newValue - 1);
      this.getCustomerList();
    },
    //添加客户
    addCustomer() {
      //校验规则
      this.$refs.addCustomerFromRef.validate((valid) => {
        if (!valid) return alert("请输入正确信息");
        this.$axios.post("/customer", this.addCustomerFrom).then((res) => {
          console.log(res);
        });
        //关闭对话框
        this.addCustomerVisible = !this.addCustomerVisible;
        //刷新列表
        this.getCustomerList();
      });
    },
    //关闭对话框时清空数据
    closeAddCustomerVisible() {
      //重置表单
      this.$refs.addCustomerFromRef.resetFields();
    },
    //点击编辑按钮 编辑用户信息
    editUser(row) {
      const username = { username: row.username };
      console.log(username);
      this.$axios.get("/users/user", { params: username }).then((res) => {
        console.log(res);
        this.editUserParams.username = res.data.result[0].username;
        this.editUserParams.phone = res.data.result[0].phone;
        this.editUserVisible = !this.editUserVisible;
      });
    },
    //点击确定编辑用户按钮 发送后台请求
    editUserList() {
      this.$axios.patch("/users", this.editUserParams).then((res) => {
        this.$message.success(res.data.message);
        this.editUserVisible = !this.editUserVisible;
        this.getCustomerList();
      });
    },
    //删除用户
    removeUserItem(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "删除用户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定发送后台请求，删除该用户
          console.log(row.id);
          this.$axios.delete(`/users/${row.id}`).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCustomerList();
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
    this.getAllCustomers();
    this.getCustomerList();
  },
};
</script>
<style lang='less' scoped>
.el-row {
  display: flex;
}
</style>