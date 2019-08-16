<template>
  <el-dialog
    title="评估"
    :visible.sync="editDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    top="1vh"
    width="40%"
  >
    <el-form label-position="top" status-icon :model="editItem" :rules="rules" ref="editItem">
      <el-form-item label="绘画心理分析" prop="analysis">
        <el-input
          type="textarea"
          v-model="editItem.analysis"
          maxlength="1000"
          :autosize="{minRows: 5,maxRows:5}"
          resize="none"
          @focus="clear('analysis')"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="remakeStatus">
        <el-switch
          v-model="editItem.remakeStatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          active-text="开"
          inactive-text="关"
        ></el-switch>
        <div v-show="editItem.remakeStatus">
          <el-input v-model="editItem.painterType" placeholder="请输入画家类型"></el-input>
          <el-input v-model="editItem.period" placeholder="请输入画家时期"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="维度分析" prop="dimensionStatus">
        <el-switch
          v-model="editItem.dimensionStatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          active-text="开"
          inactive-text="关"
        ></el-switch>
        <div v-show="editItem.dimensionStatus">
          <el-input v-model="editItem.color" placeholder="请输入色彩分析"></el-input>
          <el-input v-model="editItem.composition" placeholder="请输入构图分析"></el-input>
          <el-input v-model="editItem.brushStrokes" placeholder="请输入笔触分析"></el-input>
          <el-input v-model="editItem.modelling" placeholder="请输入造型分析"></el-input>
          <el-input v-model="editItem.space" placeholder="请输入空间分析"></el-input>
          <el-input v-model="editItem.originality" placeholder="请输入创意分析"></el-input>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveInfo('editItem')">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateItem } from "../../api/item";
import {getUserInfoMessage} from '../../utils/localStorage'
export default {
  name: "ItemEdit",
  methods: {
    saveInfo(formName) {
      this.$confirm("确认保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.editItem.commentStatus=2
              this.editItem.commentId=getUserInfoMessage('userInfo').id
              let editItem = this.editItem;
              updateItem(editItem).then(result => {
                if (result.data.status === 200) {
                  this.$message.success(result.data.msg);
                  this.closeDialog();
                  this.$emit("currentChange", this.curpage);
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
        this.$refs["editItem"].resetFields();
      });
      this.$emit("update:editDialog", false);
    },
    clear(prop) {
      this.$refs["editItem"].clearValidate(prop);
    }
  },
  data() {
    return {
      rules: {
        analysis: [
          {
            required: true,
            message: "请输入绘画心理分析",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    },
    editItem: {
      type: Object
    },
    curpage: {
      type: Number
    }
  }
};
</script>


