<template>
  <el-dialog
    title="管理员更新"
    :visible.sync="editDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    top='8vh'
    width="40%"
  >
    <el-form label-position="top" :rules="rules" status-icon :model="editAdmin" ref="editAdmin">
      <el-form-item label="联系方式" prop="telephone">
        <el-input type="text" v-model="editAdmin.telephone" @focus="clear('telephone')"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="editAdmin.password" @focus="clear('password')" placeholder="密码在6-18位之间"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input type="password" v-model="editAdmin.checkpass" @focus="clear('checkpass')"></el-input>
      </el-form-item>
      <el-form-item label="账号类型">
        <el-select v-model="editAdmin.memberAccountTypeId" filterable placeholder="请选择">
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
      <el-button type="primary" @click="saveInfo('editAdmin')">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateInfo } from "../../api/adminList";
export default {
  name: "AdminEdit",
  methods: {
    saveInfo(formName) {
      this.$confirm("确认保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let Info = this.editAdmin;
          if (Info.password === "") {
            Info.password = null;
          }
          this.$refs[formName].validate(valid => {
            if (valid) {
              updateInfo(Info).then(result => {
                if (result.data.status === 200) {
                  this.$message.success(result.data.msg);
                  this.$emit("currentChange", this.curpage);
                  this.closeDialog()
                }
              });
            } else {
              this.$message.error("请填写正确信息");
            }
          });
        })
        .catch(() => {});
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["editAdmin"].resetFields();
      });
      this.$emit("update:editDialog", false);
      this.$emit("update:editAdmin", {});
    },
    clear(prop) {
      this.$refs["editAdmin"].clearValidate(prop);
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editAdmin.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
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
        checkpass: [{ validator: validatePass, trigger: "blur" }],
      },
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
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    },
    editAdmin: {
      type: Object
    },
    curpage: {
      type: Number
    }
  }
};
</script>

