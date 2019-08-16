<template>
  <div class="container">
    <div class="info">
      <div class="icon">
        <i class="el-icon-s-custom"></i>
        <span>管理员信息</span>
      </div>
      <el-card class="box-card">
        <div class="nick">昵称：{{adminInfo.nickname}}</div>
        <div class="phone">联系方式：{{adminInfo.phone}}</div>
        <div class="type">账户类型：{{adminInfo.type}}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoMessage } from "../utils/localStorage";
export default {
  name: "AdminInfo",
  data() {
    return {
      adminInfo: {
        nickname: "",
        phone: "无",
        type: ""
      }
    };
  },
  created() {
    let adminInfo = getUserInfoMessage("userInfo");
    let Admintype = adminInfo.memberAccountTypeId;
    this.adminInfo = {
      nickname: adminInfo.nickname,
      phone: adminInfo.telephone,
      type: Admintype === 1 ? "超级管理员" : Admintype === 2 ? "管理员" : "评估师"
    };
  }
};
</script>

<style scoped>
.container {
  position: relative;
  padding: 25px 20px;
  height: 100%;
  box-sizing: border-box;
}
.icon {
  font-size: 30px;
  margin-bottom: 30px;
}

.nick,
.phone,
.type {
  border-bottom: 1px solid #e4e7ed;
  padding: 10px;
}
.info {
  width: 36%;
  margin: 5% auto 0;
}
.box-card {
  width: 300px;
}
.box-card >>> .el-card__body {
  padding: 10px 15px;
}
</style>
