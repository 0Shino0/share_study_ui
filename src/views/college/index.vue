<template>
  <div class="college-container">
    <div class="college-text">高校</div>
    <Table :tableColumn="tableCollegeCol" :tableData="tableCollegeData"></Table>
  </div>
</template>

<script>
export default {
  name: "College",
  data() {
    return {
      tableCollegeCol: [
        {
          prop: "id",
          label: "高校ID",
        },
        {
          prop: "name",
          label: "高校姓名",
        },
        {
          prop: "belong_name",
          label: "所属高校",
        },
        {
          prop: "address",
          label: "所在地址",
        },
        {
          prop: "code",
          label: "院校代码",
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
      tableCollegeData: [
        {
          id: "test",
          name: "test",
          belong_name: "test",
          address: "test",
          code: "test",
          create_time: "test",
          update_time: "test",
        },
        {
          id: "0",
          name: "0",
          belong_name: "0",
          address: "0",
          code: "0",
          create_time: "0",
          update_time: "0",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.college {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
