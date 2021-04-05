<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card align="left">
      <!-- 搜索头部 input框 -->
      <!-- 一行表示 el-row -->
      <!-- gutter 间隔 -->
      <el-row :gutter="15">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="username.username"
            class="input-with-select"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUser"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserVisible = !addUserVisible">
            添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 渲染数据表格 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" width="180" prop="id"> </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="job_id" label="职务" width="180">
        </el-table-column>
        <el-table-column prop="superior_name" label="上级" width="180">
        </el-table-column>
        <el-table-column prop="" label="操作">
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
              content="删除该用户"
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
              content="修改角色"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="修改所属上级"
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
      title="添加用户"
      :visible.sync="addUserVisible"
      width="50%"
      align="left"
      @close="closeAddUserVisible"
    >
      <!-- 主题内容区 -->
      <el-form
        :model="addUserFrom"
        :rules="addUserFromRul"
        ref="addUserFromRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- prop是验证规则 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserFrom.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserFrom.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input v-model="addUserFrom.phone"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="job_id">
          <el-input v-model="addUserFrom.job_id"></el-input>
        </el-form-item>

        <el-form-item label="部门号" prop="department_id">
          <el-input v-model="addUserFrom.department_id"></el-input>
        </el-form-item>

        <el-form-item label="上级名" prop="superior_name">
          <el-input v-model="addUserFrom.superior_name"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
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
      username: {
        username: "",
      },
      //用户列表数据
      userList: [],
      //当前数据总数
      total: 0,
      //添加用户dialog显示或者隐藏
      addUserVisible: false,
      //添加用户参数
      addUserFrom: {
        username: "",
        password: "",
        phone: "",
        job_id: "",
        department_id: "",
        superior_name: "",
      },
      //添加用户验证规则
      addUserFromRul: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 5, message: "长度不能为空", trigger: "blur" },
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
        job_id: [
          { required: true, message: "请输入该用户角色", trigger: "blur" },
        ],
        department_id: [
          { required: true, message: "请输入该用户所属部门", trigger: "blur" },
        ],
        superior_name: [
          { required: false, message: "请输入该用户上级", trigger: "blur" },
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
    getUser(username) {
      this.$axios.get("/users/user", { params: this.username }).then((res) => {
        if (res.data.status === 200) this.userList = res.data.result;
        this.total == 0 ? (this.total = res.data.result.length) : this.total;
      });
    },
    //请求用户列表数据
    getUserList() {
      this.$axios.get("/users", { params: this.queryInfo }).then((res) => {
        if (res.data.status === 200) this.userList = res.data.result;
        // this.total == 0 ? (this.total = res.data.result.length) : this.total;
      });
    },
    //获得所有用户数据
    getAllUser() {
      this.$axios.get("/users/users").then((res) => {
        if (res.data.status === 200) this.userList = res.data.result;
        this.total == 0 ? (this.total = res.data.result.length) : this.total;
      });
    },
    //当每页数据发生改变时触发
    SizeChange(newValue) {
      this.queryInfo.size = newValue;
      this.getUserList();
    },
    //当前页码发生改变时触发
    CurrentChange(newValue) {
      //偏移量
      this.queryInfo.offset =
        newValue == 1 ? 0 : this.queryInfo.size * (newValue - 1);
      this.getUserList();
    },
    //添加用户
    addUser() {
      //校验规则
      this.$refs.addUserFromRef.validate((valid) => {
        if (!valid) return alert("请输入正确信息");
        this.$axios.post("/users", this.addUserFrom).then((res) => {
          console.log(res);
        });
        //关闭对话框
        this.addUserVisible = !this.addUserVisible;
        //刷新列表
        this.getAllUser();
      });
    },
    //关闭对话框时清空数据
    closeAddUserVisible() {
      //重置表单
      this.$refs.addUserFromRef.resetFields();
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
        this.getUserList();
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
          console.log(row.id)
          this.$axios.delete(`/users/${row.id}`).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          this.getUserList();
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
    this.getAllUser();
    this.getUserList();
  },
};
</script>
<style lang='less' scoped>
.el-row {
  display: flex;
}
</style>