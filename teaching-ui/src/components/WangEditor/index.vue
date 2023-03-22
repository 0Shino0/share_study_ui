<!--
  富文本相关

  npm依赖
    "@wangeditor/editor": "^5.1.23",
    "@wangeditor/editor-for-vue": "^1.0.2",
-->

<!--
<template>
  <div class="wang-editor-container" style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
    <div class="footer">
      <el-button @click="handleSubmit">发帖</el-button>
    </div>
  </div>
</template>
-->

<!--
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name: "",
  components: {
    Editor,
    Toolbar,
  },
  data() {
    return {
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    handleSubmit() {
      console.log("html=>", this.html);
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
-->

<!--
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">
.wang-editor-container {
  z-index: 10;
}
</style>
-->
