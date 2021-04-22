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
              @click="getUser(username)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="addUserVisible = !addUserVisible"
            v-if="isCustomerAll"
          >
            添加用户</el-button
          >
        </el-col>
        <!-- 员工职务选框 -->
        <el-select
          v-model="changeClientForm.username"
          placeholder="员工职务"
          @change="fliterUser"
          clearable
          v-if="isCustomerAll"
        >
          <el-option
            v-for="item in jobs"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
            <span style="float: left">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.label
            }}</span>
          </el-option>
        </el-select>
        <!-- 经理选框 -->
        <el-select
          v-model="changeSuperiorFrom.username"
          placeholder="上级名"
          @change="filterSuperior"
          class="superiorName"
          clearable
          v-if="isCustomerAll"
        >
          <el-option
            v-for="item in managerInfo"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
            <span style="float: left">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.label
            }}</span>
          </el-option>
        </el-select>
      </el-row>

      <!-- 渲染数据表格 -->
      <el-table
        :data="userList"
        border
        style="width: 100%"
        :key="userList.index"
      >
        <el-table-column type="index" width="100" prop="id"> </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="jobName" label="职务" width="180">
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
            <!-- <el-tooltip
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
              </el-tooltip> -->
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
                @click="changeSuperior(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="重置密码"
              placement="top"
            >
              <el-button
                type="success"
                icon="el-icon-check"
                size="mini"
                @click="resetPassword(scope.row)"
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
        v-if="isShow"
      >
      </el-pagination>
      <el-pagination :total="total" v-else layout="total"> </el-pagination>
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
          <el-select v-model="addUserFrom.job_id" placeholder="请选择">
            <el-option
              v-for="item in jobs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value == 1"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门号" prop="department_id">
          <el-select v-model="addUserFrom.department_id" placeholder="请选择">
            <el-option
              v-for="item in departments"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value == 1"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上级名" prop="superior_name">
          <el-select v-model="addUserFrom.superior_name" placeholder="请选择">
            <el-option
              v-for="item in managerInfo"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
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
      top="200px"
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

    <!-- 修改直属上级对话框 -->
    <el-dialog
      title="修改上级"
      :visible.sync="changeSuperiorVisible"
      width="50%"
      align="left"
      top="200px"
    >
      <!-- 主题内容区 -->
      <el-form
        :model="changeSuperiorParams"
        :rules="changeSuperiorParamsRul"
        ref="editUserParamsRel"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h3 class="rowUsernameinfo">{{ rowUsernameinfo }}</h3>
        <!-- prop是验证规则 -->
        <el-form-item label="上级名" prop="superior_name">
          <el-select
            v-model="changeSuperiorParams.superior_name"
            placeholder="请选择"
          >
            <el-option
              v-for="item in changeSuperiorInfo"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.label
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeSuperiorVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeSuperiorForSure"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 如果是销售经理弹出会话框 -->
    <el-dialog
      title="请先将其员工转移"
      :visible.sync="changeClientSuperiorVisible"
      width="50%"
      align="left"
      top="200px"
    >
      <!-- 主题内容区 -->
      <el-form
        :model="changeClientSuperiorForm"
        :rules="changeClientSuperiorRul"
        label-width="150px"
        class="demo-ruleForm"
      >
        <!-- prop是验证规则 -->
        <el-form-item label="将其员工转移至" prop="superior_name">
          <el-select
            v-model="changeClientSuperiorForm.superior_name"
            placeholder="请选择"
          >
            <el-option
              v-for="item in clientMangerInfo"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.label
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeClientSuperiorVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="changeClientSuperiorForSure"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 如果是后勤经理弹出对话框 -->
    <el-dialog
      title="请先将其下属转移"
      :visible.sync="changeStaffSuperiorVisible"
      width="50%"
      align="left"
      top="200px"
    >
      <!-- 主题内容区 -->
      <el-form
        :model="changeClientSuperiorForm"
        :rules="changeClientSuperiorRul"
        label-width="150px"
        class="demo-ruleForm"
      >
        <!-- prop是验证规则 -->
        <el-form-item label="将其员工转移至" prop="superior_name">
          <el-select
            v-model="changeClientSuperiorForm.superior_name"
            placeholder="请选择"
          >
            <el-option
              v-for="item in staffMangerInfo"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.label
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeStaffSuperiorVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeClientSuperiorForSure"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 删除员工-销售部员工 -->
    <el-dialog
      title="请先将其员工转移"
      :visible.sync="changeClientVisible"
      width="50%"
      align="left"
      top="200px"
    >
      <!-- 主题内容区 -->
      <el-form
        :model="changeClientForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <!-- prop是验证规则 -->
        <el-form-item label="将其客户转移至" prop="superior_name">
          <el-select v-model="changeClientForm.username" placeholder="请选择">
            <el-option
              v-for="item in clientStaffInfo"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.label
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeStaffSuperiorVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeClientFormForSure"
          >确 定</el-button
        >
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
      //添加员工上级名出BUG，另写一个数组
      jobs_add: [],

      //判断是否是admin
      isAdmin: this.$store.state.userData.power === "systemall" ? true : false,
      //判断是否是客户经理
      isCustomerAll:
        this.$store.state.userData.power === "customerall" ? false : true,
      input3: "",
      //请求用户列表的参数
      queryInfo: {
        id: this.$store.state.userData.id,
        offset: 0,
        size: 5,
      },
      //弹出修改上级时对话框的左上角
      rowUsernameinfo: "",
      //删除客户的信息
      delUserInfo: {},
      // 经理信息
      managerInfo: {},
      // 客户经理信息
      clientMangerInfo: [],
      // 员工经理信息,
      staffMangerInfo: [],
      //销售部员工信息
      clientStaffInfo: [],
      //传递给后台的userName
      userName: {
        userName: "",
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
        superior_name: [{ required: true, message: "请选择你的上级！" }],
        job_id: [{ required: true, message: "请选择该用户的角色！" }],
        department_id: [{ required: true, message: "请选择该用户的部门！" }],
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
      //控制修改上级的显示隐藏
      changeSuperiorVisible: false,
      changeSuperiorInfo: [],
      //修改上级的参数
      changeSuperiorParams: {
        id: 0,
        superior_name: "",
      },
      changeSuperiorParamsRul: {
        superior_name: [
          {
            required: true,
            message: "请输入上级名称",
            trigger: "blur",
          },
        ],
      },
      //角色列表的下拉框
      jobs: [
        {
          value: 1,
          label: "总管理员",
        },
        {
          value: 2,
          label: "销售部经理",
        },
        {
          value: 3,
          label: "销售部员工",
        },
        {
          value: 4,
          label: "后勤部经理",
        },
        {
          value: 5,
          label: "后勤部员工",
        },
      ],
      //添加员工在中部门的下拉框
      departments: [
        {
          value: 1,
          label: "总管理部",
        },
        {
          value: 2,
          label: "销售部",
        },
        {
          value: 3,
          label: "后勤部",
        },
      ],
      //添加一个allUser作为筛选
      alluser: [],
      // 如果删除的是销售经理 弹出的对话框
      changeClientSuperiorVisible: false,
      // 如果删除的是后勤经理 弹出对话框
      changeStaffSuperiorVisible: false,
      // 删除的是销售部员工 弹出对话框
      changeClientVisible: false,
      // 删除经理弹框表单
      changeClientSuperiorForm: {
        username: "",
        superior_name: "",
      },
      //控制页数显示隐藏
      isShow: true,
      //删除销售员工时表单
      changeClientForm: {
        username: "",
        changeUsername: "",
      },
      changeSuperiorFrom: {
        username: "",
        changeUsername: "",
      },
      changeClientSuperiorRul: {
        superior_name: [
          {
            required: true,
            message: "请输入上级名称",
            trigger: "blur",
          },
        ],
      },
    };
  },

  components: {},

  computed: {},

  methods: {
    //input事件
    searchVal() {},
    //根据用户名获取单个用户
    getUser(username) {
      username == "" ? this.username : username;
      // console.log(username, this.$store.state.userData.power);
      if (
        username.username === "admin" &&
        this.$store.state.userData.power !== "systemall"
      ) {
        this.$message.error("无权查询该用户信息！");
        username = "";
        return;
      }
      this.$axios.get("/users/user", { params: username }).then((res) => {
        console.log(res.data.result);
        if (res.data.status === 200) {
          let result = res.data.result.map((item, index) => {
            return Object.assign(
              res.data.result[index].user,
              res.data.result[index].job
            );
          });
          this.isShow = false;
          this.userList = result;
          this.total = 1;
        }
      });
      username = "";
    },
    //请求用户列表数据
    getUserList() {
      this.$axios.get(`/users/`, { params: this.queryInfo }).then((res) => {
        if (res.data.status === 200) {
          const result = res.data.result.map((item, index) => {
            return Object.assign(
              res.data.result[index].user,
              res.data.result[index].job
            );
          });
          this.userList = result;
          // console.log(this.userList);
          this.total == 0 ? (this.total = res.data.result.length) : this.total;
        }
      });
    },
    //获得所有用户数据
    getAllUser() {
      this.userName.userName = this.$store.state.userData.username;
      // console.log(this.userName)
      this.$axios
        .get(`/users/users/${this.$store.state.userData.id}`)
        .then((res) => {
          if (res.data.status === 200) {
            const result = res.data.result.map((item, index) => {
              return Object.assign(
                res.data.result[index].user,
                res.data.result[index].job
              );
            });
            this.userList = result;
            this.alluser = result;
            // console.log(this.userList);
            this.total == 0
              ? (this.total = res.data.result.length)
              : this.total;
          }
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
      // 疑问 为什么拿到的adduserFrom 只有departmentid跟jobId 不是空？ 那我传的adduserFrom为什么不是空？
      //校验规则
      this.$refs.addUserFromRef.validate((valid) => {
        if (!valid) return alert("请输入正确信息");
        this.$axios.post("/users", this.addUserFrom).then((res) => {
          //刷新列表
          let username = {
            username: res.data.username,
          };
          // console.log(username);
          // this.getUser(username);
          location.reload();
          this.$message.success(res.data.message);
        });
        //关闭对话框
        this.addUserVisible = !this.addUserVisible;
      });
    },
    //关闭对话框时清空数据
    closeAddUserVisible() {
      //重置表单
      // this.$refs.addUserFromRef.resetFields();
    },
    //点击编辑按钮 编辑用户信息
    editUser(row) {
      const { power } = this.$store.state.userData;
      if (row.username == "系统管理员" && power !== "systemall") {
        this.$message.error("您没有相关权限！");
        return;
      }
      if (power == "customerall") {
        this.$message.error("销售部经理无权修改！");
        return;
      }
      const username = { username: row.username };
      // console.log(username);
      this.$axios.get("/users/user", { params: username }).then((res) => {
        // console.log(res);
        this.editUserParams.username = res.data.result[0].user.username;
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
    // todo 删除前先check信息
    checkRemoveItem(row) {
      // console.log(row);
      // todo 如果是经理，弹出将其下属转移的弹框
      const jobName = row.jobName;
      // 这里报错了 不管先实现 不行再用username查一遍再做判断
      if (jobName == "销售部经理") {
        this.changeClientSuperiorVisible = !this.changeClientSuperiorVisible;
        this.changeClientSuperiorForm.username = row.username;
        return;
      } else if (jobName == "后勤部经理") {
        this.changeStaffSuperiorVisible = !this.changeStaffSuperiorVisible;
        this.changeClientSuperiorForm.username = row.username;
        return;
      } else if (jobName == "销售部员工") {
        //todo 如果是销售员工，弹出将其客户转移的弹框
        this.changeClientVisible = !this.changeClientVisible;
        this.changeClientForm.changeUsername = row.username;
      }
    },
    // 确认转移经理的员工
    changeClientSuperiorForSure() {
      // console.log(this.changeClientSuperiorForm);
      this.$axios
        .patch(
          "/users/changeClientSuperiorForSure",
          this.changeClientSuperiorForm
        )
        .then((res) => {
          // console.log(res);
          // console.log(this.changeClientSuperiorForm);
          if (res.data.status === 200) {
            console.log(this.changeStaffSuperiorVisible);
            if (this.changeClientSuperiorVisible) {
              this.changeClientSuperiorVisible = !this
                .changeClientSuperiorVisible;
            }
            if (this.changeStaffSuperiorVisible) {
              this.changeStaffSuperiorVisible = !this
                .changeStaffSuperiorVisible;
            }
            this.$message.success(res.data.message);
            location.reload();
          }
        });
    },
    //确认转移员工的客户
    changeClientFormForSure() {
      // console.log(this.changeClientForm);
      this.$axios
        .patch("/customer/changeClientUser", this.changeClientForm)
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success(res.data.message);
            this.changeClientVisible = !this.changeClientVisible;
            location.reload();
          }
        });
    },
    //确认删除用户
    removeUserItem(row) {
      // 如果是普通员工 没有删除权限
      const { power } = this.$store.state.userData;
      const name = {
        name: row.username,
      };
      // console.log(power);
      if (
        power === "usermy" ||
        power === "customerall" ||
        power == "customermy"
      ) {
        this.$message.error("您没有删除员工的权限！");
        return;
      }
      // console.log(row.username);
      if (row.username === "系统管理员") {
        this.$message.error("您没有删除该员工的权限！");
        return;
      }
      this.$confirm(
        `此操作将永久删除用户${row.username}, 是否继续?`,
        `删除用户${row.username}`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          if (row.jobName === "销售部经理") {
            console.log(row.username);
            this.clientMangerInfo = this.clientMangerInfo.filter(
              (item, index) => {
                console.log(item.label);
                return item.label !== row.username;
              }
            );
            this.managerInfo = this.managerInfo.filter((item, index) => {
              return item.label !== row.username;
            });
            console.log(this.managerInfo, this.clientMangerInfo);
          }
          if (row.jobName === "后勤部经理") {
            this.staffMangerInfo = this.staffMangerInfo.filter(
              (item, index) => {
                return item.label !== row.username;
              }
            );
            this.managerInfo = this.managerInfo.filter((item, index) => {
              return item.label !== row.username;
            });
            console.log(this.managerInfo, this.staffMangerInfo);
          }
          if (row.jobName === "销售部员工") {
            this.clientStaffInfo = this.clientStaffInfo.filter(
              (item, index) => {
                return (
                  item.label !== row.username && item.tag === row.superior_name
                );
              }
            );
            this.managerInfo = this.managerInfo.filter((item, index) => {
              return item.label !== row.username;
            });
            console.log(this.managerInfo, this.staffMangerInfo);
          }
          // 点击确定发送后台请求，删除该用户
          this.$axios.delete(`/users/${row.id}`).then((res) => {
            this.$message({
              type: "success",
              message: `删除用户${row.username}成功，请转移其管理的员工/客户`,
            });
            console.log(this.clientMangerInfo);
            console.log(this.managerInfo);
            this.checkRemoveItem(row);
            this.getAllUser();
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
    //点击弹出修改上级的对话框
    changeSuperior(row) {
      const { power } = this.$store.state.userData;
      const jobName = row.jobName;
      this.rowUsernameinfo = `您正在修改的是修改${row.username}的上级`;
      // console.log(this.rowUsernameinfo);
      // console.log(power);
      // console.log(jobName);
      if (power !== "systemall" && power !== "userall") {
        this.$message.error("您没有修改员工上级的权限！");
        return;
      }
      if (
        row.jobName == "销售部经理" ||
        row.jobName == "后勤部经理" ||
        row.jobName == "总管理员"
      ) {
        this.$message.warning("多余的操作，其上级无需修改！");
        return;
      }
      this.changeSuperiorParams.id = row.id;
      if (jobName == "销售部员工") {
        this.changeSuperiorInfo = this.clientMangerInfo;
      } else if (jobName == "后勤部员工") {
        this.changeSuperiorInfo = this.staffMangerInfo;
      }
      this.changeSuperiorVisible = !this.changeSuperiorVisible;
    },
    changeSuperiorForSure() {
      this.$axios
        .patch(
          `/users/changeSuperior/${this.changeSuperiorParams.id}`,
          this.changeSuperiorParams
        )
        .then((res) => {
          this.$message.success(res.data.message);
          this.getAllUser();
          this.getUserList();
          this.changeSuperiorVisible = !this.changeSuperiorVisible;
        });
    },
    getManager() {
      this.$axios.get("/users/manager").then((res) => {
        this.managerInfo = res.data.result;
        this.managerInfo.forEach((item, index) => {
          if (item.value == "后勤部经理") {
            this.staffMangerInfo.push(item);
          } else if (item.value == "销售部经理") {
            this.clientMangerInfo.push(item);
          }
        });
        // console.log(this.clientMangerInfo, this.staffMangerInfo);
      });
    },
    getClientStaff() {
      this.$axios.get("/users/getClientStaff").then((res) => {
        this.clientStaffInfo = res.data.result;
        console.log(this.clientStaffInfo);
      });
    },
    // 点击单选框选出对应的角色
    fliterUser(value) {
      console.log(value);
      // console.log(this.alluser);
      this.userList = this.alluser.filter((item, index) => {
        // console.log(item);
        return item.jobName === value;
      });
      this.isShow = false;
      this.total = this.userList.length;
    },
    filterSuperior(value) {
      // console.log(value);
      // console.log(this.alluser);
      this.userList = this.alluser.filter((item, index) => {
        console.log(item.superior_name);
        return item.superior_name == value;
      });
      this.isShow = false;
      this.total = this.userList.length;
    },
    resetPassword(row) {
      const id = row.id;
      if (row.username === "系统管理员") {
        this.$message.error("请勿重置管理员密码！！");
        return;
      }
      if (
        this.$store.state.userData.power !== "systemall" &&
        this.$store.state.userData.power !== "userall"
      ) {
        this.$message.error("您无权操作！");
        return;
      }
      this.$confirm(
        `此操作将重置用户${row.username}的密码为123456, 是否继续?`,
        `重置用户${row.username}密码`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.$axios.get(`/users/resetPassword/${id}`).then((res) => {
          this.$message.success(res.data.message);
        });
      });
    },
  },
  created() {
    if (this.$store.state.userData.power === "customerall") {
      this.isShow = false;
      this.userName.userName = this.$store.state.userData.username;
      // console.log(this.userName)
      this.$axios
        .get(`/users/users/${this.$store.state.userData.id}`)
        .then((res) => {
          if (res.data.status === 200) {
            const result = res.data.result.map((item, index) => {
              return Object.assign(
                res.data.result[index].user,
                res.data.result[index].job
              );
            });
            this.userList = result.filter((item, index) => {
              return item.superior_name === this.$store.state.userData.username;
            });
            this.total = this.userList.length;
          }
        });
    } else {
      this.getClientStaff();
      this.getManager();
      this.getAllUser();
      this.getUserList();
    }
  },
};
</script>
<style lang='less' scoped>
.el-row {
  display: flex;
}
.superiorName {
  margin-left: 30px;
}
.rowUsernameinfo {
  padding-left: 38px;
}
</style>