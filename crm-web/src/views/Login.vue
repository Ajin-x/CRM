<template>
  <div class="login">
    <div class="login_context">
      <!-- 头部图片 -->
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- from表单 -->
      <el-form
        :model="loginForm"
        :rules="loginFormRul"
        ref="loginFormRel"
        class="login_box"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="login">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单请求数据
      loginForm: {
        username: "",
        password: "",
      },
      //表单验证规则
      loginFormRul: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          // { min: 10, max: 15, message: "长度在 10 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },

  components: {},

  computed: {},

  methods: {
    //登陆
    login(loginForm){
      //登陆之前进行规则校验
      this.$refs.loginFormRel.validate(valid=>{
        if(!valid) return ;
        console.log(this.loginForm)
        this.$axios.post('login',this.loginForm).then(res=>{
          
          console.log(res)
        })
      })
    }
  },
};
</script>
<style lang='less' >
.login {
  //为什么继承无效？？？
  width: 100%;
  height: 100%;
  background: rgb(43, 75, 107);
}
.login_context {
  .logo {
    width: 150px;
    height: 150px;
    position: absolute;
    top: -75px;
    left: 50%;
    margin-left: -75px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 5px 2px #ddd;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .login_box {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    .btn {
      width: 400px;
      height: 50px;
    }
  }

  width: 500px;
  height: 300px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  box-shadow: 0 0 5px 2px #ddd;
}
</style>

