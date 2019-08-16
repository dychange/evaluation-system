<template>
  <div>
    <div class="moduleTitle">
    <i class="el-icon-user-solid"></i>
      管理员</div>
    <el-button class="add-btn" type="primary" @click="addAdmin" size="small ">添加管理员</el-button>
    <el-table style="width: 100%" :data="adminList" header-row-class-name='header'>
      <el-table-column label="管理员ID" prop="id" min-width="8%" align="center"></el-table-column>
      <el-table-column label="管理员帐号" prop="userName" min-width="12%" align="center"></el-table-column>
      <el-table-column label="昵称" prop="nickname" min-width="15%" align="center"></el-table-column>
      <el-table-column label="联系方式" prop="telephone" min-width="15%"></el-table-column>
      <el-table-column label="账号类型" prop="memberAccountTypeId" min-width="10%"></el-table-column>
      <el-table-column label="开户日期" prop="openDate" min-width="18%"></el-table-column>
      <el-table-column label="最后登录时间" prop="lastLoginDate" min-width="18%"></el-table-column>
      <el-table-column label="最后登录IP" prop="lastIp" min-width="15%"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-if="scope.row.status==='on'">注销</el-button>
          <el-button size="mini" type="success" @click="handleOpen(scope.row)" v-else>启用</el-button>
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
    <admin-edit
      :editDialog.sync="editDialog"
      :editAdmin.sync="editAdmin"
      :curpage="paginations.currentPage"
      @currentChange="currentChange"
    ></admin-edit>
    <add-admin :addDialog.sync="addDialog" @getAllAdminList="getAllAdminList"></add-admin>
  </div>
</template>

<script>
import AdminEdit from "./Edit";
import AddAdmin from "./Add";
import { getAdminInfo, cancelAdminInfo , openAdminInfo} from "../../api/adminList";
import { handleAdminData } from "../../lib/handleData";
export default {
  name: "Admin",
  methods: {
    handleEdit(row) {
      this.editAdmin = {
        id: row.id,
        password: null,
        checkpass: null,
        memberAccountTypeId: row.memberAccountId,
        telephone: row.telephone
      };
      this.editDialog = true;
    },
    //注销对应的管理员信息
    handleDelete(row) {
          let id = row.id;
          let status=row.status='off'
          cancelAdminInfo({ id,status }).then(result => {
            if (result.data.status === 200) {
              this.$message.success("注销成功"),
                this.currentChange(this.paginations.currentPage);
            }
          });
    },
    handleOpen(row){
      let id = row.id
      let status=row.status='on'
      openAdminInfo({id,status}).then((result) => {
         if (result.data.status === 200) {
              this.$message.success("启用成功"),
                this.currentChange(this.paginations.currentPage);
            }
      })
    },
    addAdmin() {
      this.addDialog = true;
    },
    //获取管理员信息,传入页数和获取数量
    getAllAdminList() {
      getAdminInfo({
        page: 1,
        rows: this.paginations.pageSize
      }).then(result => {
        // handleData将获取的数据进行一些转换
        if (result.data.status === 200) {
          this.adminList = handleAdminData(result);
          this.paginations.total = result.data.info.total;
        }
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getAdminInfo({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize
      }).then(result => {
        if (result.data.status === 200) {
          this.adminList = handleAdminData(result);
        }
      });
    }
  },
  data() {
    return {
      adminList: [],
      editDialog: false,
      addDialog: false,
      editAdmin: {
        id: null,
        password: null,
        checkpass: null,
        memberAccountTypeId: "",
        telephone: null
      },
      paginations: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getAllAdminList();
  },
  components: {
    AdminEdit,
    AddAdmin
  }
};
</script>


