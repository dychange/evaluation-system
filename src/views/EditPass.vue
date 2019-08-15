<template>
  <div class="container">
    <div class="moduleTitle">
      <i class="el-icon-key"></i>
      修改密码</div>
    <el-form
      label-position="right"
      label-width="100px"
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
    >
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model="userInfo.oldPass" @focus="clear('oldPass')"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="userInfo.password" placeholder="密码在6-18位之间" @focus="clear('password')">></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input type="password" v-model="userInfo.checkpass" @focus="clear('checkpass')">></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userInfo')" size="small">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editpass } from "../api/user";
import { clearLocalStorage , getUserInfoMessage} from "../utils/localStorage";
export default {
  name: "EditPass",
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userInfo = this.userInfo;
          editpass(userInfo).then(result => {
            if (result.data.status === 200) {
              this.$message.success("修改成功,请重新登录");
              this.$refs[formName].resetFields();
              clearLocalStorage();
              this.$router.replace("/login");
            }
          });
        }
      });
    },
     clear(prop){
      this.$refs["userInfo"].clearValidate(prop)
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        id: null,
        oldPass: null,
        password: null,
        checkpass: null
      },
      rules: {
        oldPass: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            min: 6,
            max: 18,
            message: "请设置6-18位数的密码",
            trigger: "blur"
          }
        ],
        checkpass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {
      this.userInfo.id=getUserInfoMessage('userInfo').id
  }
};
</script>

<style scoped>
.el-input {
  width: 80% ;
}
.el-form {
  width: 38%;
  height: 100%;
  box-sizing: border-box;
 padding-top: 2%;
  margin: 100px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

</style>
