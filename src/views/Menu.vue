<template>
     <el-aside>
        <el-menu >
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-user-solid"></i>账号管理
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/admin">
              <el-menu-item index="1-1">管理员</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>展品管理
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/item">
              <el-menu-item index="2-1">展品管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
</template>

<script>
export default {
    name:'Menu', 
}
</script>

<style scoped>

.el-aside {
  width: 205px !important;
  border-right: 1px solid #C0C4CC;
}
.el-menu {
  border: 0;
}
</style>
