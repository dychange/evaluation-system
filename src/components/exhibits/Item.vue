<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-search"></i>
      查询条件
    </div>
    <div>
      <el-select
        v-model="itemType"
        filterable
        clearable
        placeholder="请选择展区"
        style="margin-right:10px;"
      >
        <el-option v-for="item in types" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
      </el-select>
      <el-autocomplete
        v-model="itemName"
        :fetch-suggestions="querySearch"
        placeholder="请输入展品名称"
        :trigger-on-focus="false"
      ></el-autocomplete>
      <el-button style="margin-left:10px;" type="primary" size="small " @click="searchItem">查询</el-button>
      <el-button style="margin-left:10px;" type="primary" size="small " @click="resetItem">重置</el-button>
      <el-button class="add-btn" type="primary" @click="addDialog=true" size="small ">新增展品</el-button>
    </div>
    <div class="moduleTitle">
      <i class="el-icon-s-operation"></i>
      展品管理
    </div>
    <el-table
      :data="itemList"
      style="width: 100%"
      header-row-class-name="header"
    >
      <el-table-column label="编号" prop="number" min-width="5%" align="center"></el-table-column>
      <el-table-column label="标题" prop="title" min-width="15%" align="center"></el-table-column>
      <el-table-column label="上传信息" prop="info" min-width="12%" align="center"></el-table-column>
      <el-table-column
        label="导师评论"
        prop="comment"
        show-overflow-tooltip
        min-width="20%"
        align="center"
      ></el-table-column>
      <el-table-column label="添加时间" prop="addTime" min-width="18%" align="center"></el-table-column>
      <el-table-column label="图像展示" prop="url" min-width="10%" align="center">
        <template slot-scope="props">
              <el-popover placement="bottom" width="500" trigger="click">
                <el-button type="text" slot="reference">查看图片</el-button>
                <img :src="props.row.url" style="width:100%;height:100%;" />
              </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="是否发布" width="170" align="center">
        <template slot-scope="release">
          <el-switch
            v-model="release.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            active-text="已发布"
            inactive-text="未发布"
            @change="openNotice(release.row.status,release.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="编辑" fixed="right" width="210" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type='primary' @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type='primary' @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @current-change="currentChange"
            :current-page.sync="paginations.currentPage"
            :page-size="paginations.pageSize"
            layout="total, prev, pager, next"
            :total="paginations.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <item-edit
      :editDialog.sync="editDialog"
      :editItem.sync="editItem"
      :types="types"
      @currentChange="currentChange"
      :curpage="paginations.currentPage"
    ></item-edit>
  </div>
</template>

<script>
import {
  getItemList,
  delItem
} from "../../api/item";
import { handleAddTime } from "../../lib/handleData";
import ItemEdit from "./ItemEdit";
export default {
  name: "Item",
  methods: {
    searchItem() {
      this.paginations.currentPage = 1;
      this.getAllItem();
    },
    resetItem() {
      this.itemType = this.itemName = null;
      this.paginations.currentPage = 1;
      this.getAllItem();
    },
    querySearch(queryString, cb) {
      let nameList = this.nameList;
      let results = queryString
        ? nameList.filter(this.createFilter(queryString))
        : nameList;
      cb(results);
    },
    createFilter(queryString) {
      return itemName => {
        return (
          itemName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleEdit(index, row) {
      this.editDialog = true;
      this.editItem = {
        id: row.id,
        name: row.name,
        info: row.info,
        imgName: row.imgName,
        audioName: row.audioName,
        typeName: row.typeName,
        typeId: row.typeId,
        oldImg: "",
        oldAudio: ""
      };
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          let imgName = row.imgName;
          delItem({ id, imgName }).then(result => {
            if (result.data.status === 200) {
              this.$message.success("删除成功");
              this.currentChange(this.paginations.currentPage);
            }
          });
        })
        .catch(() => {});
    },
     openNotice(val, row) {
      let status = val;
      let id = row.id;
      Release({ id, status }).then(result => {
        if (result.data.status === 200) {
          this.$message.success(result.data.msg);
        }
      });
    },
    getAllItem() {
      getItemList({
        page: 1,
        rows: this.paginations.pageSize,
        itemName: this.itemName,
        itemType: this.itemType
      }).then(result => {
        if (result.data.status === 200) {
          this.itemList = handleAddTime(result);
          this.paginations.total = result.data.info.total;
        }
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getItemList({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize,
        itemName: this.itemName,
        itemType: this.itemType
      }).then(result => {
        if (result.data.status === 200) {
          this.itemList = handleAddTime(result);
        }
      });
    }
  },
  data() {
    return {
      itemList: [],
      types: [],
      itemName: null,
      nameList: [],
      itemType: null,
      editItem: {},
      detailInfo: {},
      paginations: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      addDialog: false,
      editDialog: false,
    };
  },
  created() {
    // this.getAllItem();
  },
  components: {
    ItemEdit
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0 !important;
  width: 50%;
  padding-left: 12px;
}
</style>

