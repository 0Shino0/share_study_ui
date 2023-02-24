<template>
  <div class="teacher-container">
    <div class="teacher-text">教师管理</div>
    <Table :tableColumn="tableTeacherCol" :tableData="tableTeacherData"></Table>
  </div>
</template>

<script>
export default {
  name: "Teacher",
  data() {
    return {
      tableTeacherCol: [
        {
          prop: "id",
          label: "用户ID",
        },
        {
          prop: "name",
          label: "老师姓名",
        },
        {
          prop: "belong_id",
          label: "所属高校",
        },
        {
          prop: "score",
          label: "贡献度",
        },
        {
          prop: "role",
          label: "角色状态",
        },
        {
          prop: "status",
          label: "状态",
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
      tableTeacherData: [
        {
          id: "test",
          name: "test",
          belong_id: "test",
          score: "test",
          role: "test",
          status: "test",
          create_time: "test",
          update_time: "test",
        },
        {
          id: "test",
          name: "test",
          belong_id: "test",
          score: "test",
          role: "test",
          status: "test",
          create_time: "test",
          update_time: "test",
        },
        {
          id: "test",
          name: "test",
          belong_id: "test",
          score: "test",
          role: "test",
          status: "test",
          create_time: "test",
          update_time: "test",
        },
        {
          id: "test",
          name: "test",
          belong_id: "test",
          score: "test",
          role: "test",
          status: "test",
          create_time: "test",
          update_time: "test",
        },
        {
          id: "test",
          name: "test",
          belong_id: "test",
          score: "test",
          role: "test",
          status: "test",
          create_time: "test",
          update_time: "test",
        },
        {
          id: "0",
          name: "0",
          belong_id: "0",
          score: "0",
          role: "0",
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
.teacher {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
