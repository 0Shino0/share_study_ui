<template>
  <div>
    <el-dialog
      width="30%"
      :title="title"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :visible.sync="show"
      :before-close="handleClose"
      :show-close="showClose"
      custom-class="cust-dialog"
      :width="width"
      :top="top"
    >
      <div class="dialog-body">
        <slot></slot>
      </div>
      <template v-if="(buttons && buttons.length > 0) || showCancel">
        <div class="dialog-footer">
          <el-button @click="close" v-if="showCancel">取消</el-button>
          <el-button
            v-for="btn in buttons"
            :key="btn.text"
            :type="btn.type"
            @click="btn.click"
          >
            {{ btn.text }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    // 是否显示对话框
    show: {
      type: Boolean,
      default: true,
    },
    // 标题
    title: {
      type: String,
      default: "标题",
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "30%",
    },
    // 距离顶部的距离
    top: {
      type: String,
      default: "50px",
    },
    // 按钮样式
    buttons: {
      type: Array,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    //
    handleClose() {
      return 0;
    },
    // 关闭
    close() {
      return 0;
    },
  },
};
</script>

<style lang="scss">
.cust-dialog {
  .el-dialog_body {
    padding: 0px;
  }
  .dialog-body {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 15px;
    min-height: 100px;
  }
  .dialog-footer {
    text-align: right;
    padding: 10px 20px;
  }
}
</style>
