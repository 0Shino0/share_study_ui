<!--
  富文本相关

  npm依赖
    "@wangeditor/editor": "^5.1.23",
    "@wangeditor/editor-for-vue": "^1.0.2",
-->

<template>
  <div class="wang-editor-container" style="border: 1px solid #ccc">
    <div class="editor-post">
      <input
        class="post-title"
        type="text"
        placeholder="请输入标题"
        v-model="postTitle"
      />
      <el-button type="primary" @click="handleSubmit" v-if="postId === '1'"
        >发布</el-button
      >
      <el-button type="primary" @click="updateSubmit" v-else>修改</el-button>
    </div>
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
      @onChange="onChange"
      @onDestroyed="onDestroyed"
      @onMaxLength="onMaxLength"
      @onFocus="onFocus"
      @onBlur="onBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  name: "WangEditor",
  props: {
    postId: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    info: {
      type: String,
      default: "",
    },
  },
  components: {
    Editor,
    Toolbar,
  },
  data() {
    return {
      postTitle: "", //
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    // 提交
    handleSubmit() {
      console.log("html=>", this.html);
      this.$bus.$emit("tranHtmlFromEditor", this.html, this.postTitle);
    },
    // 修改
    updateSubmit() {
      this.$bus.$emit("updateHtmlFromEditor", this.html, this.postTitle);
    },
    // 编辑器创建完毕时的回调函数。
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错

      console.log(editor.getAllMenuKeys());
      // console.log(editor.config.menus);

      this.toolbarConfig = {
        excludeKeys: [
          "insertVideo",
          "uploadVideo",
          "group-video",

          "uploadImage",
          "insertImage",
          "deleteImage",
          "group-image",

          "fullScreen",
        ],
      };
    },
    // 编辑器内容、选区变化时的回调函数。
    onChange(editor) {
      console.log("onChange", editor.children);
    },
    // 编辑器销毁时的回调函数。调用 editor.destroy() 即可销毁编辑器
    onDestroyed(editor) {
      console.log("onDestroyed", editor);
    },
    onMaxLength(editor) {
      console.log("onMaxLength", editor);
    },
    // 编辑器 focus 时的回调函数。
    onFocus(editor) {
      console.log("onFocus", editor);
    },
    // 编辑器 blur 时的回调函数。
    onBlur(editor) {
      console.log("onBlur", editor);
    },
    // 自定义编辑器 alert 。如想用 antd 的 message 功能。
    customAlert(info, type) {
      window.alert(`customAlert in Vue demo\n${type}:\n${info}`);
    },
    // 自定义粘贴。可阻止编辑器的默认粘贴，实现自己的粘贴逻辑。
    customPaste(editor, event, callback) {
      console.log("ClipboardEvent 粘贴事件对象", event);
      const html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
      const text = event.clipboardData.getData("text/plain"); // 获取粘贴的纯文本
      const rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）
      // console.log('html=>',html);
      console.log("text=>", text);
      // console.log('rtf=>',rtf);

      // 自定义插入内容
      editor.insertText(text);

      // 返回 false ，阻止默认粘贴行为
      event.preventDefault();
      callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

      // 返回 true ，继续默认的粘贴行为
      // callback(true)
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    // }, 1500);
    this.$nextTick(() => {
      console.log("id=>", this.postId);
      console.log("title=>", this.title);
      console.log("info=>", this.info);
      this.postTitle = this.title;
      this.html = this.info;
    });
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">
.wang-editor-container {
  z-index: 10;

  .editor-post {
    width: 100%;
    display: flex;
    flex: 1;

    .post-title {
      flex: 90%;
      height: 40px;
      padding: 8px 12px;
      outline: none;
      border: none;
      font-size: 20px;
      font-weight: bold;
    }
    .el-button {
      flex: 20%;
    }

    .w-e-text-container {
      text-align: start;

      .w-e-scroll {
        text-align: start;

        #w-e-textarea-1 {
          text-align: start;
          #w-e-element-0 {
            text-align: start;
          }
        }
      }
    }
  }
}
</style>
