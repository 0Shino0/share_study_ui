<template>
  <div class="add-post-container">
    <Loading v-show="submitLoading"></Loading>
    <h2>发帖</h2>
    <el-form
      class="form"
      ref="form"
      :model="form"
      :rules="formRules"
      label-width="40px"
    >
      <el-form-item label="标题" class="add-post-form-item">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" class="add-post-form-item">
        <el-input
          type="textarea"
          maxlength="2000"
          show-word-limit
          v-model="form.info"
        ></el-input>
      </el-form-item>

      <!--
        <el-upload
          class="upload-demo"
          action  //必要属性，上传文件的地址，可以不给，但必须要有，不给就i调接口上传
          :http-request="uploadFile"//这个是就上传文件的方法，把上传的接口写在这个方法里
          ref="upload"
          :limit="fileLimit"//上传文件个数的限制
          :on-remove="handleRemove"//上传之后，移除的事件
          :file-list="fileList"//上传了那些文件的列表
          :on-exceed="handleExceed"//超出上传文件个数的错误回调
          :before-upload="beforeUpload"//文件通过接口上传之前，一般用来判断规则，
          //比如文件大小，文件类型
          :show-file-list="false"//是否用默认文件列表显示
          :headers="headers"//上传文件的请求头
          >
       -->
      <el-upload
        class="upload-file"
        :action="action"
        :http-request="uploadFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeUpload"
        multiple
        :limit="fileLimit"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary"
          ><span class="iconfont icon-fujian"></span> 附件上传</el-button
        >
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>

      <el-form-item class="add-post-form-item add-post-form-btn">
        <el-button type="primary" @click="onSubmit" v-if="postId === '1'"
          >发布</el-button
        >
        <el-button type="primary" @click="updateSubmit" v-else>修改</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { delOssFile, ossFileUpload } from "@/api/oss";
import { addPost, getPostInfo, updatePost } from "@/api/post";
import { getToken } from "@/utils/auth";
import Loading from "@/components/Loading";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      // 修改帖子相关
      postId: undefined,
      postDetail: {}, // 帖子详情
      userInfo: {}, // 用户信息
      // 发帖表单
      form: {
        name: "",
        info: "",
        belong: "",
        url: "",
      },
      formRules: {
        name: [{ required: true, trigger: "blur" }],
        info: [{ required: true, trigger: "blur" }],
        belong: [{ required: true, trigger: "blur" }],
        url: [{ required: false, trigger: "blur" }],
      },
      updateForm: {
        name: "",
        url: "",
        id: "",
        info: "",
      },
      submitLoading: false, // 提交按钮 控制
      // 上传文件相关
      action: "/api/file/oss_file_upload", // 上传的地址
      fileList: [], // 上传文件列表
      fileType: [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "pdf",
        "xlsx",
        "xls",
        "doc",
        "docx",
        "ppt",
        "pptx",
        "mp3",
        "mp4",
        "mpeg",
        "zip",
        "rar",
        "7z",
        "py",
        "java",
        "c",
        "cpp",
        "go",
        "html",
        "js",
        "ts",
        "sql",
        "css",
      ], // 允许的文件类型
      fileLimit: 1, // 限制上传数
      headers: { "Content-Type": "multipart/form-data" }, // 上传请求头
      fileUrl: undefined,
    };
  },
  mounted() {
    this.userInfo = this.getTokenData();
    this.getParams(); // 获取路由中的参数
    this.updatePost(this.postId);
    this.noToken(); // 未登录

    this.$bus.$on("resetFormFromHeader", (val) => {
      this.resetAddPost();
    });
  },
  methods: {
    noToken() {
      // console.log("getTokenData=>", this.getTokenData());
      const token = this.getTokenData();

      if (token === null || token === undefined) {
        this.$router.push(`/login`);
      }
    },
    // 获取路由中的参数
    getParams() {
      this.postId = this.$route.params.id;
      // console.log(this.postId);
    },
    // 更新当前信息
    async updatePost(id) {
      if (id === "1") {
        // 发帖
        // console.log(id);

        return id;
      } else {
        // 修改
        const { data } = await getPostInfo(id);
        // this.postDetail = data;

        // 转换
        this.form.name = data.name;
        this.form.info = data.info;
        this.form.belong = data.id;
        this.form.url = data.url;

        // updateForm
        this.updateForm.id = data.id;
      }
    },
    getTokenData() {
      let token = getToken();
      let data = JSON.parse(token);
      return data;
    },
    // 发布帖子
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          this.$message.info("正在发布中，请稍后");
          // 上传接口
          // 判断是否存在需要上传文件
          if (this.fileList[0]) {
            let FormDatas = new window.FormData();
            FormDatas.append("file", this.fileList[0]);
            // console.log("FormDatas=>", FormDatas);

            // this.$axios({
            //   // url: `http://localhost:8080/api/file/oss_file_upload`,
            //   url: `/api/file/oss_file_upload`,
            //   method: "post",
            //   data: FormDatas,
            //   timeout: 3 * 60 * 1000, // 上传设置180秒
            //   headers: {
            //     "Conten-Type": "multipart/form-data",
            //     // 'Content-Type': 'application/x-www-form-urlencoded'
            //   },
            // })
            ossFileUpload(FormDatas)
              .then((res) => {
                const { data } = res;
                // console.log(data);
                this.$message.success("附件上传成功");
                this.fileUrl = data;
                this.form.url = data; // form的url
                this.submitLoading = false; //

                // 调用发布接口
                this.form.belong = this.userInfo.id; // 配置id

                addPost(this.form)
                  .then((res) => {
                    this.$message.success("发布成功,正在跳转首页");
                    this.submitLoading = false;
                    this.resetAddPost();
                    this.$router.push({ path: "/" });
                  })
                  .catch((error) => {
                    this.resetAddPost();
                    this.$message.info("帖子发布失败，请重试");
                    // 上传成功，但发布失败情况
                    if (this.fileUrl) {
                      // 删除oss文件
                      delOssFile(this.fileUrl);
                      this.fileList = [];
                      this.fileUrl = undefined;
                    }

                    this.submitLoading = false;
                  });
              })
              .catch((error) => {
                // console.log(error);
                this.$message.info("附件上传失败");
                this.submitLoading = false; //
              });
          } else {
            // 无文件
            // 调用发布接口
            this.form.belong = this.userInfo.id; // 配置id

            addPost(this.form)
              .then((res) => {
                this.$message.success("发布成功,正在跳转首页");
                this.submitLoading = false;
                this.resetAddPost();
                this.$router.push({ path: "/" });
              })
              .catch((error) => {
                this.resetAddPost();
                this.$message.info("帖子发布失败，请重试");
                // 上传成功，但发布失败情况
                if (this.fileUrl) {
                  // 删除oss文件
                  delOssFile(this.fileUrl);
                }

                this.submitLoading = false;
              });
          }
        }
      });
    },
    // 修改帖子
    updateSubmit() {
      // let updateInfo
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          this.$message.info("正在修改中，请稍后");
          // 上传接口
          // 如果上传文件
          if (this.fileList[0]) {
            let FormDatas = new window.FormData();
            FormDatas.append("file", this.fileList[0]);
            // console.log("FormDatas=>", FormDatas);

            //
            // this.$axios({
            //   url: `/ossapi/file/oss_file_upload`,
            //   method: "post",
            //   data: FormDatas,
            //   timeout: 3 * 60 * 1000, // 上传设置180秒
            //   headers: {
            //     "Conten-Type": "multipart/form-data",
            //     // 'Content-Type': 'application/x-www-form-urlencoded'
            //   },
            // })
            ossFileUpload(FormDatas)
              .then((res) => {
                const { data } = res;
                // console.log(data);
                this.$message.success("附件上传成功");
                this.fileUrl = data;
                this.submitLoading = false; //

                this.updateForm.url = data; // updateForm的url
                this.updateForm.name = this.form.name; // 标题
                this.updateForm.info = this.form.info; // 描述
                // 调用修改接口
                this.updateForm.id = this.postId; // 配置id

                updatePost(this.updateForm)
                  .then((res) => {
                    this.$message.success("修改成功,正在跳转中");
                    this.submitLoading = false;
                    this.resetAddPost();
                    this.$router.push({ path: "/" });
                  })
                  .catch((error) => {
                    this.resetAddPost();
                    this.$message.info("帖子发布失败，请重试");
                    // 上传成功，但发布失败情况
                    if (this.fileUrl) {
                      // 删除oss文件
                      delOssFile(this.fileUrl);
                      this.fileList = [];
                      this.fileUrl = undefined;
                    }

                    this.submitLoading = false;
                  });
              })
              .catch((error) => {
                // console.log(error);
                this.$message.info("附件上传失败");
                this.submitLoading = false; //
              });
          } else {
            // 如果不上传文件
            // 调用发布接口
            this.updateForm.id = this.postId; // 配置id
            this.updateForm.name = this.form.name; // 标题
            this.updateForm.info = this.form.info; // 描述

            updatePost(this.form)
              .then((res) => {
                this.$message.success("修改成功,正在跳转");
                this.submitLoading = false;
                this.resetAddPost();
                this.$router.push({ path: "/" });
              })
              .catch((error) => {
                this.resetAddPost();
                this.$message.info("帖子发布失败，请重试");
                // 上传成功，但发布失败情况
                if (this.fileUrl) {
                  // 删除oss文件
                  delOssFile(this.fileUrl);
                }

                this.submitLoading = false;
              });
          }
        }
      });
    },
    // 登录表单重置
    resetAddPost() {
      this.form = {
        name: "",
        info: "",
        belong: "",
        url: "",
      };
      this.resetForm("form");
    },
    handleCancel() {
      console.log("取消");
      if (this.fileUrl) {
        // 删除oss连接接口
        delOssFile(this.fileUrl);
      }
      // 跳转到首页
      this.$router.push({ path: "/" });
    },
    // 上传图片相关
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.fileLimit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传之前的回调
    beforeUpload(file) {
      if (file.type != "" || file.type != null || file.type != undefined) {
        //截取文件的后缀，判断文件类型
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        //计算文件的大小
        const isLt5M = file.size / 1024 / 1024 < 200; //这里做文件大小限制
        //如果大于50M
        if (!isLt5M) {
          this.$message.error("上传文件大小不能超过 200MB!");
          return false;
        }
        //如果文件类型不在允许上传的范围内
        if (this.fileType.includes(FileExt)) {
          return true;
        } else {
          this.$message.error("上传文件格式不正确!");
          return false;
        }
      }
    },
    //上传文件的事件
    uploadFile(item) {
      this.$message.info("文件已上传至浏览器，点击发布上传至服务器");
      //上传文件的需要formdata类型;所以要转
      // console.log(item.file);
      this.fileList.push(item.file);
      // console.log(this.fileList);
      // let FormDatas = new window.FormData();
      // FormDatas.append("file", item.file);
      // console.log("FormDatas=>", FormDatas);

      // console.log("FormDatas=>", FormDatas);
      // console.log(data);

      // 调用接口
      // ossFileUpload(FormDatas).then((res) => {
      //   const data = res.data;
      //   this.fileUrl = data;
      // });
    },
  },
};
</script>

<style lang="scss">
/*大型屏幕pc 超大屏*/
@media screen and (min-width: 1200px) {
  .form {
    .add-post-form-item,
    .upload-file {
      width: 600px;
    }
  }
}
/*1200>=pc>=992 大屏，字体红色，背景黑色*/
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .form {
    .add-post-form-item,
    .upload-file {
      width: 600px;
    }
  }
}
/*768<=pad<992 中屏，字体黄色，背景红色*/
@media screen and (min-width: 768px) and (max-width: 991px) {
  .form {
    .add-post-form-item,
    .upload-file {
      width: 600px;
    }
  }
}
/*phone<768  小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 767px) and (min-width: 480px) {
  .form {
    .add-post-form-item,
    .upload-file {
      width: 480px;
    }
  }
}
/* 超小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 480px) {
}

.add-post-container {
  padding-top: 62px;
  text-align: center;
  margin: 0 auto;

  h2 {
    margin: 20px 0;
  }

  .form {
    .add-post-form-item,
    .upload-file {
      // width: 600px;
      margin: 0 auto;
      margin-bottom: 20px;
    }

    .add-post-form-item {
      textarea {
        height: 200px;
      }
    }
  }
}
</style>
