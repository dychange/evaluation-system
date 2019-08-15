<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html ,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
.moduleTitle {
  font-size: 13px;
  line-height: 25px;
  border-bottom: 1px solid #c0c4cc;
  margin-bottom: 10px;
}
.add-btn{
  float: right;
  margin-bottom: 10px !important;
}
.el-pagination__total,
.header th {
  color: #000 !important;
}
.el-textarea .el-input__count {
  bottom: -40px !important;
}
.pagination {
  text-align: center;
}
.el-button--primary {
  background-color: #99CCFF !important;
  border-color: #99CCFF !important;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #66CCFF !important;
  border-color: #66CCFF !important;
}
.el-table thead {
  font-weight: bolder !important;
}
.el-table td,
.el-table th {
  padding: 6px 0 !important;
}
.el-form--label-top .el-form-item__label {
  height: 30px;
  line-height: 30px;
  padding: 0 !important;
}
.el-form-item {
  margin-bottom: 16px !important;
}
.el-input__inner {
  height: 36px !important;
  line-height: 36px !important;
}
.el-dialog__body,
.el-dialog__header {
  padding: 10px 15px !important;
}
.header th {
  background-color: #dcdcdc !important;
}
.el-tooltip__popper {
  max-width: 20%;
}
</style>
