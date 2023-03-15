<template>
  <div class="material-container">
    <!-- <div class="material-text">资料管理</div> -->
    <div class="op-btn">
      <el-button
        v-if="0"
        class="add-btn"
        type="success"
        size="mini"
        @click="handleAdd()"
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
          tableMaterialData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          v-for="item in tableMaterialCol"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="tableColumnWidth"
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
      <!-- 分页 -->
      <Pagination :total="total" :emitName="$options.name"></Pagination>

      <el-dialog
        title="标题"
        :visible.sync="dialogShow"
        :width="dialogWidth"
        :top="dialogTop"
        :before-close="dialogCancel"
      >
        <el-form :model="dialogForm" ref="queryForm" :rules="dialogFormRules">
          <!-- <el-form-item label="资料ID" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.id" autocomplete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="资料状态" :label-width="formLabelWidth">
            <el-select v-model="dialogForm.status" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="禁用" value="禁用"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="所属老师id" :label-width="formLabelWidth">
            <el-input
              v-model="dialogForm.belong_id"
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
import {
  getMaterialPageInfo,
  getMaterial,
  updateMaterial,
  delMaterial,
} from "@/api/material";

export default {
  name: "Material",
  data() {
    return {
      // 后台数据
      tableMaterialCol: [
        {
          prop: "id",
          label: "资料ID",
        },
        {
          prop: "name",
          label: "资料名",
        },
        {
          prop: "score",
          label: "收藏数",
        },
        {
          prop: "belongName",
          label: "所属老师",
        },
        {
          prop: "status",
          label: "资料状态",
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
      /*       tableMaterialData: [
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
          name: "1",
          belong_id: "2",
          status: "3",
          create_time: "4",
          update_time: "5",
        },
      ], */
      tableMaterialData: [],
      // 表格相关
      search: "",
      dialogShow: false,
      // 表单相关
      dialogForm: {
        id: undefined,
        status: undefined,
      },
      dialogFormRules: {
        id: [{ required: true, trigger: "blur" }],
        status: [{ required: true, trigger: "blur" }],
      },
      formLabelWidth: "120px",
      // 对话框dialog相关
      dialogWidth: "600px",
      dialogTop: "30px",
      isAdd: true, // 标识新增操作 | true表示新增 - false表示编辑
      loading: true,
      // 分页相关
      currentPage: 1,
      pageSize: 10,
      total: 10,
    };
  },
  mounted() {
    if (this.tableMaterialData) {
      this.getMaterialPage(1, 10);
    }
    this.$bus.$on(`pagination${this.$options.name}`, ({ page, limit }) => {
      // console.log(page, limit);
      this.getMaterialPage(page, limit);
    });
  },
  methods: {
    /* 请求数据 */
    // 管理员分页查询
    async getMaterialPage(current, pageSize) {
      this.loading = true;
      try {
        const { data } = await getMaterialPageInfo(current, pageSize);
        // console.log(data.records);
        data.records.forEach((current) => {
          current.status = current.status === 0 ? "正常" : "禁用";
        });
        this.total = data.total;
        this.tableMaterialData = data.records;
        this.resetLoading(300);
      } catch (error) {
        console.log(error);
      }
    },
    /* 表格相关 */
    // 编辑操作
    async handleEdit(index, row) {
      // 标识编辑操作
      this.isAdd = false;
      // 展示信息
      // console.log(index, row);
      const id = row.id;
      const result = await getMaterial(id);
      // console.log(result.data);
      result.data.status = result.data.status === 0 ? "正常" : "禁用";
      this.dialogForm = result.data;
      this.dialogShow = true;
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
      const id = row.id;
      this.$confirm("此操作将删除教学资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用删除接口
          delMaterial(id);

          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getMaterialPage(1, 10);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // dialog对话框相关
    // 提交按钮
    dialogSubmit() {
      this.$refs["queryForm"].validate((valid) => {
        if (valid) {
          if (this.dialogForm.id != null) {
            /* 对字符文字转义 */
            // 状态
            this.dialogForm.status = this.dialogForm.status === "正常" ? 0 : 1;

            // 编辑操作
            updateMaterial(this.dialogForm).then((response) => {
              this.$message({
                type: "info",
                message: "编辑成功",
              });
              // console.log(response);
              this.dialogShow = false;
              this.getMaterialPage(1, 10);
              this.reset();
            });
          } else {
            // 新增操作
            // addCollegeName(this.dialogForm).then((response) => {
            // });
            this.$message({
              type: "info",
              message: "新增成功",
            });
            this.dialogShow = false;
            this.getMaterialPage(1, 10);
            this.reset();
          }
        }
      });
    },

    // 取消按钮
    dialogCancel() {
      this.dialogShow = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.dialogForm = {
        id: undefined,
        status: undefined,
        // name: undefined,
        // belong: undefined,
        // score: undefined,
        // role: undefined,
        // create_time: undefined,
        // update_time: undefined,
      };
      this.resetForm("queryForm");
    },
    // 导出excel
    handleExportExcel() {
      // 调用接口
      try {
        /* 逃课写法 */
        let link = document.createElement("a");
        // 高校url
        link.href = "http://116.63.165.100:8080/api/resource/download";
        console.log(link);
        link.click(); //模拟点击
        document.body.removeChild(link);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.material {
  &-container {
    margin: 30px;

    .op-btn {
      margin: 10px 0 30px 5px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
