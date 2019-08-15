<template>
  <div class="container">
    <div class="moduleTitle"> 
      <i class="el-icon-edit"></i>
      修改个人资料</div>
    <el-form
    class="form"
      label-position="right"
      label-width="100px"
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
    >
      <el-form-item label="用户名" prop="userName" >
        <el-input v-model="userInfo.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userInfo.nickname" @focus="clear('nickname')"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="telephone">
        <el-input v-model="userInfo.telephone" @focus="clear('telephone')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userInfo')" size="small">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfoMessage , saveUserInfo} from "../utils/localStorage";
import { editInfo } from "../api/user";
export default {
  name: "EditSelf",
  inject:['reload'],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userInfo = this.userInfo;
          editInfo(userInfo).then(result => {
            if (result.data.status === 200) {
              let oldInfo=getUserInfoMessage('userInfo')
              let newInfo=Object.assign(oldInfo,userInfo)
              saveUserInfo('userInfo',newInfo)
              this.$message.success('修改成功')
              this.$refs[formName].resetFields();
              this.reload()
              this.$router.push("/index");
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
    return {
      userInfo: {
        id: null,
        nickname: "",
        telephone: "",
        userName: ""
      },
      rules: {
        nickname: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        telephone: [
          {
            required: true,
            message: "联系方式不能为空",
            trigger: "blur"
          },
          {
            pattern: "^1(3|4|5|7|8)\\d{9}$",
            message: "请填写正确电话号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.userInfo.nickname = getUserInfoMessage("userInfo").nickname;
    this.userInfo.telephone = getUserInfoMessage("userInfo").telephone;
    this.userInfo.userName = getUserInfoMessage("userInfo").userName;
    this.userInfo.id = getUserInfoMessage("userInfo").id;
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
.el-input.is-disabled >>> .el-input__inner{
  color: #000;
}

</style>

