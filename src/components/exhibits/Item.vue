<template>
  <div>
    <!-- <div class="moduleTitle">
      <i class="el-icon-search"></i>
      查询条件
    </div>
    <div>
      <el-autocomplete
        v-model="itemName"
        :fetch-suggestions="querySearch"
        placeholder="请输入展品名称"
        :trigger-on-focus="false"
      ></el-autocomplete>
      <el-button style="margin-left:10px;" type="primary" size="small " @click="searchItem">查询</el-button>
      <el-button style="margin-left:10px;" type="primary" size="small " @click="resetItem">重置</el-button>
      <el-button class="add-btn" type="primary" @click="addDialog=true" size="small ">新增展品</el-button>
    </div> -->
    <div class="moduleTitle">
      <i class="el-icon-s-operation"></i>
      展品管理
    </div>
    <el-table :data="itemList" style="width: 100%" header-row-class-name="header">
      <el-table-column label="编号" prop="paintingInfo.id" min-width="5%" align="center"></el-table-column>
      <el-table-column label="画家名字" prop="paintingInfo.painterName" min-width="15%" align="center"></el-table-column>
      <el-table-column label="画家类型" prop="paintingInfo.painterType" min-width="12%" align="center"></el-table-column>
      <el-table-column
        label="绘画心理分析"
        prop="paintingInfo.analysis"
        show-overflow-tooltip
        min-width="20%"
        align="center"
      ></el-table-column>
      <el-table-column label="画家时期" prop="paintingInfo.period" min-width="18%" align="center"></el-table-column>
      <el-table-column label="图像展示" prop="paintingInfo.img" min-width="10%" align="center">
        <template slot-scope="props">
          <el-popover placement="bottom" width="500" trigger="click">
            <el-button type="text" slot="reference">查看图片</el-button>
            <img :src="props.row.paintingInfo.img" style="width:100%;height:100%;" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="是否评估" width="100" align="center">
         <template slot-scope="types">
          <el-tag effect="dark" v-if="types.row.paintingInfo.commentStatus===0?true:false" type='info'>未评估</el-tag>
          <el-tag effect="dark" v-else-if="types.row.paintingInfo.commentStatus===2?true:false" type="success">已经评估</el-tag>
          <el-tag effect="dark" v-else type="danger">正在评估</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="编辑" fixed="right" width="170" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">评估</el-button>
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
      @currentChange="currentChange"
      :curpage="paginations.currentPage"
    ></item-edit>
  </div>
</template>

<script>
import { getItemList, delItem } from "../../api/item";
import ItemEdit from "./ItemEdit";
export default {
  name: "Item",
  methods: {
    searchItem() {
      this.paginations.currentPage = 1;
      this.getAllItem();
    },
    resetItem() {
      this.itemName = null;
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
      this.editItem = row.paintingInfo;
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
          let img = row.img;
          delItem({ id, imgName }).then(result => {
            if (result.data.status === 200) {
              this.$message.success("删除成功");
              this.currentChange(this.paginations.currentPage);
            }
          });
        })
        .catch(() => {});
    },
 
    getAllItem() {
      getItemList({
        page: 1,
        rows: this.paginations.pageSize,
      }).then(result => {
        console.log(result)
        if (result.data.status === 200) {
          this.itemList =result.data.info.rows
          this.paginations.total = result.data.info.total;
        }
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getItemList({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize
      }).then(result => {
        if (result.data.status === 200) {
          this.itemList =result.data.info.rows
        }
      });
    }
  },
  data() {
    return {
      itemList: [],
      itemName: null,
      nameList: [],
      editItem: {},
      detailInfo: {},
      paginations: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      editDialog: false
    };
  },
  created() {
    this.getAllItem();
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

