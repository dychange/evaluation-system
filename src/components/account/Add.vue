<template>
  <el-dialog
    title="新增管理员"
    :visible.sync="addDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    top='8vh'
    width="40%"
  >
    <el-form
      label-position="top"
      status-icon
      :model="newAdminInfo"
      :rules="rules"
      ref="newAdminInfo"
    >
      <el-form-item label="帐号" prop="userName">
        <el-input v-model="newAdminInfo.userName" @focus="clear('userName')"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="telephone">
        <el-input type="text" v-model="newAdminInfo.telephone" @focus="clear('telephone')"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="newAdminInfo.password" @focus="clear('password')" placeholder="密码在6-18位之间"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input type="password" v-model="newAdminInfo.checkpass" @focus="clear('checkpass')"></el-input>
      </el-form-item>
      <el-form-item label="账号类型" required>
        <el-select v-model="newAdminInfo.memberAccountTypeId" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createAdmin('newAdminInfo')">创建</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addAdmin, checkName } from "../../api/adminList";
export default {
  name: "Add",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["newAdminInfo"].resetFields();
        this.newAdminInfo.memberAccountTypeId = "";
      });
      this.$emit("update:addDialog", false);
    },
    // 创建新的管理员
    createAdmin(formName) {
      // 表单提交验证
      this.$refs[formName].validate(valid => {
        if (valid && this.newAdminInfo.memberAccountTypeId != undefined) {
          let AdminInfo = this.newAdminInfo;
          addAdmin(AdminInfo).then(result => {
            if (result.data.status === 200) {
              this.$message.success("创建成功");
              this.$emit("getAllAdminList");
              this.closeDialog()
            }
          });
        } else {
          this.$message.error("请填写正确信息");
        }
      });
    },
    clear(prop){
      this.$refs["newAdminInfo"].clearValidate(prop)
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.newAdminInfo.password) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  };
    const checkUser = (rule, value, callback) => {
      let userName = value;
      checkName({ userName }).then(result => {
        if (result.data.status === 412) {
          callback(new Error(result.data.msg));
        }
        callback();
      });
    };
    return {
      newAdminInfo: {
        userName: "",
        password: "",
        telephone: null,
        memberAccountTypeId: this.value,
        checkpass: ""
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: "^[a-zA-Z0-9]",
            message: "只能由英文,数字组成",
            trigger: "blur"
          },
          {
            validator: checkUser,
            trigger: "blur"
          },
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            max: 18,
            message: "最大只能18位",
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
            pattern:"^1(3|4|5|7|8)\\d{9}$",
            message: "请填写正确电话号码",
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
            min:6,
            max: 18,
            message: "请设置6-18位数的密码",
            trigger: "blur"
          }
        ],
        checkpass: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ]
      },
      value: "",
      types: [
        {
          value: 2,
          label: "管理员"
        },
        {
          value: 3,
          label: "客服"
        }
      ]
    };
  }
};
</script>
