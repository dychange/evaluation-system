<template>
  <el-container >
    <el-header><img class="header-img" src="../assets/imgs/header.png"></el-header>
    <el-container >
      <el-main >
        <el-form
          status-icon
          class="login-ruleForm"
          :rules="rules"
          :model="loginForm"
          ref="loginForm"
        >
          <div class="title">管理员登录</div>
          <el-form-item class="inputuser" prop="username">
            <label class="usericon">
              <i class="el-icon-s-custom"></i>
            </label>
            <el-input
              class="info"
              type="text"
              v-model="loginForm.username"
              placeholder="请输入帐号"
              clearable
              @keyup.enter.native="loginIn('loginForm')"
              @focus="clear('username')"
            ></el-input>
          </el-form-item>
          <el-form-item class="inputpassword" prop="password">
            <label class="usericon">
              <i class="el-icon-lock"></i>
            </label>
            <el-input
              class="info"
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              clearable
              @keyup.enter.native="loginIn('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginIn('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { login } from "../api/user";
import { saveUserInfo, getUserInfoMessage } from "../utils/localStorage";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: "^[a-zA-Z0-9]",
            message: "只能由英文,数字组成",
            trigger: "blur"
          }
        ],
      },
      titleImg:'',
      bgImg:''
    };
  },
  methods: {
    //登录
    loginIn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let username = this.loginForm.username;
          let password = this.loginForm.password;
          let userInfo = `username=${username}&password=${password}`;
          login(userInfo).then(result => {
            let status = result.data.status;
            if (status === 200) {
              saveUserInfo("userInfo", result.data.info);
              this.$message.success("登录成功");
              this.$router.push("/index");
            }
          });
        } else {
          this.$message.error("请填写正确信息");
        }
      });
    },
     clear(prop) {
      this.$refs["loginForm"].clearValidate(prop);
    }
  },
  created() {
    //加载页面时判断是否有用户缓存,如果有则表示已登录,再返回主页
    if (getUserInfoMessage("userInfo")) {
      this.$router.replace("/index");
    }
    
  }
};
</script>


<style scoped>
.el-header{
  height: 90px !important;
  line-height: 90px ;
}
.el-header,
.el-footer {
  background-color: transparent;
  text-align: center;
}
.el-container.is-vertical{
 background: url('../assets/imgs/bglogin.jpg') no-repeat;
  background-size: 100% 100%;
}
.el-container{
  height: 100%;
}

.el-main {
  height: 100%;
  color: #333;
  text-align: center;
}

.login-ruleForm {
  width: 350px;
  height: 250px;
  padding: 25px;
  background-color: #f5f5f5;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -175px;
  margin-top: -125px;
  box-sizing: border-box;
}
.title {
  height: 18px;
  line-height: 18px;
  font-size: 16px;
  color: #3c3c3c;
  margin-top: 9px;
  padding-bottom: 15px;
  font-weight: 700;
}

.inputuser {
  position: relative;
}

.info {
  width: 245px !important;
  padding-left: 5px;
}

.usericon {
  width: 40px;
  height: 40px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: #ddd;
}

.el-icon-s-custom,
.el-icon-lock {
  font-size: 22px;
  margin-top: 8px;
}
.el-button {
  width: 275px;
  margin-left: -25px;
}
.header-img {
  width: 30%;
  height: 100%;
}
</style>
