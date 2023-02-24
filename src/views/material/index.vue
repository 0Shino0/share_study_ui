<template>
  <div class="material-container">
    <div class="material-text">资料管理</div>
    <Table :tableColumn="tableAdminCol" :tableData="tableAdminData"></Table>
  </div>
</template>

<script>
export default {
  name: "Material",
  data() {
    return {
      tableAdminCol: [
        {
          prop: "id",
          label: "资料ID",
        },
        {
          prop: "name",
          label: "资料名",
        },
        {
          prop: "belong_id",
          label: "所属老师id",
        },
        {
          prop: "status",
          label: "资料状态",
        },
        {
          prop: "create_time",
          label: "录入时间",
        },
        {
          prop: "update_time",
          label: "修改时间",
        },
      ],
      tableAdminData: [
        {
          id: "test",
          name: "test",
          belong_id: "test",
          status: "test",
          create_time: "test",
          update_time: "test",
        },
        {
          id: "0",
          name: "0",
          belong_id: "0",
          status: "0",
          create_time: "0",
          update_time: "0",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.material {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>