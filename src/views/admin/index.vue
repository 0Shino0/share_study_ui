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
              placeholder="输入管理员名称搜索"
            />
          </template>
          <template slot-scope="scope" v-if="scope.row.role === '管理员'">
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
        <el-form :model="dialogForm" :rules="dialogFormRules">
          <!-- <el-form-item label="用户ID" :label-width="formLabelWidth">
            <el-input
              v-model="dialogForm.id"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="管理员名" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属高校" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.belong" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="贡献度" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.score" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色状态" :label-width="formLabelWidth">
            <!-- <el-input v-model="dialogForm.role" autocomplete="off"></el-input> -->
            <el-select v-model="dialogForm.role" placeholder="请选择">
              <el-option label="普通用户" value="普通用户"></el-option>
              <el-option label="管理员" value="管理员"></el-option>
              <!-- <el-option label="超级管理员" value="2"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="dialogForm.status" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="禁用" value="禁用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="录入时间" :label-width="formLabelWidth">
            <el-input
              v-model="dialogForm.createTime"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="修改时间" :label-width="formLabelWidth">
            <el-input
              v-model="dialogForm.update_time"
              autocomplete="off"
            ></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer">
          <el-button @click="dialogCancel()">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAdminPageInfo, getAdminExcel, getInfoAdminId } from "@/api/user";
// import { getCollegeName } from "@/api/college";

export default {
  name: "Admin",
  data() {
    return {
      /* mock数据 */
      tableAdminCol: [
        // {
        //   prop: "id",
        //   label: "用户ID",
        // },
        {
          prop: "name",
          label: "管理员名",
        },
        {
          prop: "belong",
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
          prop: "createTime",
          label: "录入时间",
        },
        // {
        //   prop: "update_time",
        //   label: "修改时间",
        // },
      ],
      /*       tableAdminData: [
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
      ], */
      tableAdminData: [],
      testData: [],
      // 表格相关
      search: "",
      dialogShow: false,
      // 表单相关
      dialogForm: {
        // id: undefined,
        name: undefined,
        belong: undefined,
        score: undefined,
        role: undefined,
        status: undefined,
        create_time: undefined,
        // update_time: undefined,
      },
      dialogFormRules: {
        // id: [{ required: true, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
        belong: [{ required: true, trigger: "blur" }],
        score: [{ required: true, trigger: "blur" }],
        role: [{ required: true, trigger: "blur" }],
        status: [{ required: true, trigger: "blur" }],
        create_time: [{ required: true, trigger: "blur" }],
      },
      formLabelWidth: "120px", // 输入框宽度
      // 对话框dialog相关
      dialogWidth: "600px", // 对话框宽度
      dialogTop: "30px", // 对话框距离顶部距离
      isAdd: true, // 标识新增操作 | true表示新增 - false表示编辑
    };
  },
  mounted() {
    this.getAdminPage(1, 10);
  },
  methods: {
    /* 请求数据 */
    // 管理员分页查询
    async getAdminPage(current, pageSize) {
      try {
        const { data } = await getAdminPageInfo(current, pageSize);
        // console.log(data);
        /* 加工数组
          所属高校 => 字符串
          角色状态 0-普通用户 1-管理员 2-超级管理员
          状态 0-未禁用 1-禁用
          时间 数组-字符串
        */
        data.records.forEach((current, index, arr) => {
          // 所属高校 (会有延迟问题)待定
          // let belong = await getCollegeName(current.belong);
          // current.belong = belong.data.name;
          // 角色状态 - 管理员 超级管理员
          current.role = current.role === 1 ? "管理员" : "超级管理员";
          // 状态
          current.status = current.status === 0 ? "正常" : "禁用";
          // 时间

          current.createTime = current.createTime
            .splice(0, 3)
            .toString()
            .replace(/,/g, "-");
        });
        this.tableAdminData = data.records;
      } catch (error) {
        console.log(error);
      }
    },

    /* 表格相关 */
    // 编辑操作
    handleEdit(index, row) {
      // 标识编辑操作
      this.isAdd = false;
      const id = row.id;
      // 展示信息
      console.log(index, row);
      const data = getInfoAdminId(id);
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
    // 取消按钮
    dialogCancel() {
      this.dialogShow = false;
    },
    // 表单重置
    reset() {
      this.dialogForm = {
        // id: undefined,
        name: undefined,
        belong: undefined,
        score: undefined,
        role: undefined,
        status: undefined,
        create_time: undefined,
        // update_time: undefined,
      };
      this.resetForm("form");
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
