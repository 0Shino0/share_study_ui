<template>
  <div class="admin-container">
    <div class="admin-text">管理员管理</div>
    <div class="op-btn">
      <el-button class="add-btn" type="success" size="mini" @click="handleAdd()"
        >新增</el-button
      >
      <el-button
        class="export-btn"
        type="success"
        size="mini"
        @click="handleExportExcel()"
        >导出Excel</el-button
      >
    </div>
    <div class="table-container">
      <el-table
        :data="
          tableAdminData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        stripe
        style="width: 100%"
      >
        <el-table-column
          v-for="item in tableAdminCol"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          width="120"
        >
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入资料名搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="标题"
        :visible.sync="dialogShow"
        :width="dialogWidth"
        :top="dialogTop"
      >
        <el-form :model="dialogForm">
          <el-form-item label="用户ID" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="老师姓名" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属高校" :label-width="formLabelWidth">
            <el-input
              v-model="dialogForm.belong_id"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="贡献度" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.score" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色状态" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.role" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.status" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="录入时间" :label-width="formLabelWidth">
            <el-input
              v-model="dialogForm.create_time"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="修改时间" :label-width="formLabelWidth">
            <el-input
              v-model="dialogForm.update_time"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogShow = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      tableAdminCol: [
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
      tableAdminData: [
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
      // 表格相关
      search: "",
      dialogShow: false,
      // 表单相关
      dialogForm: {
        id: "",
        name: "",
        belong_id: "",
        score: "",
        role: "",
        status: "",
        create_time: "",
        update_time: "",
      },
      formLabelWidth: "120px", // 输入框宽度
      // 对话框dialog相关
      dialogWidth: "600px", // 对话框宽度
      dialogTop: "30px", // 对话框距离顶部距离
      isAdd: true, // 标识新增操作 | true表示新增 - false表示编辑
    };
  },
  methods: {
    /* 表格相关 */
    // 编辑操作
    handleEdit(index, row) {
      // 标识编辑操作
      this.isAdd = false;
      // 展示信息
      console.log(index, row);
      this.dialogForm = row;
      this.dialogShow = true;
      // 修改信息

      // 调用编辑接口
    },
    // 新增操作
    handleAdd() {
      // 标识新增操作
      this.isAdd = true;
      // 显示对话框
      this.dialogShow = true;
      // 获取数据
      // 调用新增接口
    },
    // 删除操作
    handleDelete(index, row) {
      // 获取id
      console.log(index, row);
      // 调用删除接口
    },
    // dialog对话框相关
    // 提交按钮
    dialogSubmit() {
      // 关闭对话框
      this.dialogShow = false;
      // 判断操作
      if (this.isAdd) {
        // 新增操作
        console.log("新增");
        // 调用相关接口
      } else {
        // 编辑操作
        console.log("编辑");
        // 调用相关接口
      }
    },
    // 导出excel
    handleExportExcel() {
      // 调用接口
      /* 参数相关
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: 'excel-list', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx' //非必填
      */
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  &-container {
    margin: 30px;

    .op-btn {
      margin: 10px 0 0 5px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
