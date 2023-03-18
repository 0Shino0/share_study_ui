<template>
  <!-- 帖子+评论 -->
  <div class="post-container">
    <!-- 帖子详细 -->
    <div class="post-detail">
      <!-- 帖子标题 -->
      <div class="post-title">
        <h2>{{ postDetail.resourceName }}</h2>
      </div>
      <!-- 作者信息 -->
      <div class="post-author">
        <!-- 头像 -->
        <div class="post-avater">
          <default-avater
            v-if="postDetail.userAvatarUrl === ''"
            width="40px"
            height="40px"
            :avaterName="postDetail.userName.split('')[0]"
          ></default-avater>
          <img
            class="avater"
            :src="postDetail.userAvatarUrl"
            alt="作者"
            v-else
          />
        </div>
        <div class="avater-description">
          <!-- 姓名 -->
          <div class="post-name">
            {{ postDetail.userName }}
          </div>
          <!-- 所属高校 -->
          <div class="post-college">
            {{ postDetail.collegeName }}
          </div>
        </div>
      </div>
      <!-- 帖子信息 -->
      <div class="post-info">
        {{ postDetail.resourceInfo }}
      </div>

      <!-- 附件信息 -->
      <div class="post-download">
        <a
          class="download"
          target="blank"
          :href="postDetail.resourceUrl"
          download="下载"
          ><span class="iconfont icon-fujian"></span>附件查看</a
        >
      </div>

      <!-- 收藏按钮 -->
      <div class="button-container">
        <el-button
          class="btn-collect"
          type="primary"
          size="mini"
          @click="handleCollect"
          ><span
            class="iconfont icon-star"
            :class="isCollect ? 'icon-star-fill' : 'icon-star'"
          ></span
          >{{ isCollect ? "已收藏" : "收藏" }}</el-button
        >
      </div>
    </div>

    <!-- 发布评论 -->
    <div class="add-comment" @focus="isFocus = true" tabindex="0">
      <div class="add-comment-header">
        <div class="current-avater">
          <default-avater
            v-if="userInfo.avatar === ''"
            width="40px"
            height="40px"
            :avaterName="userInfo.name.split('')[0]"
          ></default-avater>
          <img :src="userInfo.avatar" alt="当前用户" v-else />
        </div>
        <el-form class="form" ref="form" :model="form" label-width="0">
          <el-form-item label="">
            <el-input
              type="textarea"
              v-model="form.content"
              @focus="isFocus = true"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div
        slot="footer"
        class="add-comment-footer"
        :class="isFocus ? 'comment-footer-flex' : 'comment-footer-none'"
      >
        <el-upload
          class="add-comment-upload"
          action="action"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="limit"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :http-request="uploadFile"
        >
          <el-link :underline="false"
            ><span class="iconfont icon-fujian"></span> 附件上传</el-link
          >
        </el-upload>
        <el-button
          class="btn-comment"
          type="primary"
          size="mini"
          @click="commentSubmit"
          ><span class="iconfont icon-message"></span> 评论</el-button
        >
      </div>
    </div>

    <!-- 评论分页 -->
    <div class="comment-container" v-if="isCommentsList">
      <h3 class="comment-title">全部评论</h3>
      <div
        class="comment-item"
        v-for="(commentItem, index) in commentsList"
        :key="commentItem.commentId"
      >
        <!-- 作者信息 -->
        <div class="comment-author">
          <!-- 头像 -->
          <div class="comment-avater">
            <default-avater
              v-if="commentItem.belongAvatarUrl === ''"
              width="40px"
              height="40px"
              :avaterName="commentItem.belongName.split('')[0]"
            ></default-avater>
            <img
              class="avater"
              :src="commentItem.belongAvatarUrl"
              alt="评论人"
              v-else
            />
          </div>
        </div>
        <!-- 评论详细 -->
        <div class="comment-detail">
          <!-- 用户描述 -->
          <div class="avater-description">
            <!-- 姓名 -->
            <div class="comment-name">
              <h5>{{ commentItem.belongName }}</h5>
            </div>
            <!-- 所属高校 -->
            <div class="comment-college">
              {{ commentItem.belongCollege }}
            </div>
          </div>
          <!-- 帖子信息 -->
          <div class="comment-info">
            <span>{{ commentItem.commentContent }}</span>
          </div>

          <div class="comment-action">
            <!-- 附件信息 -->
            <div class="comment-download" v-if="commentItem.commentOssUrl">
              <a
                class="download"
                target="blank"
                :href="commentItem.commentOssUrl"
                download="下载"
                ><span class="iconfont icon-fujian"></span>附件下载</a
              >
            </div>
            <!-- 评论 -->
            <div class="add-comment-item">
              <span class="iconfont icon-message"></span>
              <span class="add-action">回复</span>
            </div>
          </div>

          <!-- 回复 -->
          <div class="comment-send-name">
            <span>回复于{{ commentItem.sendName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPostDetail,
  addPostComment,
  getPostCommentPage,
  addCollect,
  // delCollect
} from "@/api/post";
import { ossFileUpload, delOssFile } from "@/api/oss";
import DefaultAvater from "@/components/DefaultAvater";

export default {
  name: "postDetail",
  components: {
    DefaultAvater,
  },
  data() {
    return {
      postDetail: {}, // 帖子详细消息
      postId: undefined,
      isCollect: false, // 是否收藏
      isComment: false,
      isFocus: false, //是否聚集
      // 评论
      commentsList: [], // 帖子评论
      form: {
        send: undefined, // 接收评论的id
        content: undefined, // 内容
        url: "", // 附件url
        resource: undefined, // 评论所属资料ID
      },
      fileList: [], // 评论附件列表
      fileUrl: undefined,
      action: "/api/file/oss_file_upload", // 上传的地址
      limit: 1,
      // 收藏
      collectForm: {
        belong: undefined, // 当前用户id
        resource: undefined, // 资料id
      },
      collectId: undefined, // 收藏id
      // 用户信息
      userInfo: {},
    };
  },

  mounted() {
    this.$bus.$on("cancelFocus", (val) => {
      this.isFocus = false;
    });
    this.getParamsId();
    this.getPostDetailInfo();
    this.getPostCommentPageInfo(this.postId, 1, 100);
    this.userInfo = this.getTokenData();
  },
  methods: {
    // 获取帖子详细消息
    async getPostDetailInfo() {
      const { data } = await getPostDetail(this.postId);
      this.postDetail = data;
      console.log(this.postDetail);
    },
    // 获取路由中的id
    getParamsId() {
      this.postId = this.$route.params.id;
      console.log(this.postId);
    },
    // 点击收藏
    handleCollect() {
      this.collectForm.resource = this.postId;
      this.collectForm.belong = this.userInfo.id;
      addCollect(this.collectForm).then((res) => {
        this.isCollect = !this.isCollect;
        this.$message.success(res.message);
      });
    },
    // 获取收藏状态
    getCollectStatus() {
      return 0;
    },
    /* 评论相关方法 */
    // 获取评论分页
    async getPostCommentPageInfo(id, current, pageSize) {
      const { data } = await getPostCommentPage(id, current, pageSize);
      this.commentsList = data.records;
    },
    // 点击评论
    commentSubmit() {
      this.isComment = !this.isComment;
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          // this.submitLoading = true;
          // 上传接口
          // 判断是否存在需要上传文件
          if (this.fileList[0]) {
            let FormDatas = new window.FormData();
            FormDatas.append("file", this.fileList[0]);
            console.log("FormDatas=>", FormDatas);
            const { data } = await ossFileUpload(FormDatas);
            this.fileUrl = data;
            this.form.url = data; // form的url
          }
          // 调用发布接口
          this.form.resource = this.postDetail.resourceId; // 接收评论的用户id
          this.form.send = this.postDetail.userId; // 接收评论的资料id

          addPostComment(this.form)
            .then((res) => {
              this.$message.info("评论成功");
              // this.submitLoading = false;
              // this.$router.push({ path: '/' });
              this.resetComment(); // 清除表单
              this.fileList = [];
              this.getPostCommentPageInfo(this.postId, 1, 100);
            })
            .catch((error) => {
              console.log(error);
              // 上传成功，但发布失败情况
              if (this.fileUrl) {
                // 删除oss文件
                delOssFile(this.fileUrl);
              }
              // this.submitLoading = false;
            });
        }
      });
    },
    // 登录表单重置
    resetComment() {
      (this.form = {
        send: undefined, // 接收评论的id
        content: undefined, // 内容
        url: "", // 附件url
        resource: undefined, // 评论所属资料ID
      }),
        this.resetForm("form");
    },
    /* 评论资料上传相关方法 */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadFile(item) {
      // this.$message.info("文件已上传至浏览器，点击发布上传至服务器");
      //上传文件的需要formdata类型;所以要转
      // console.log(item.file);
      this.fileList.push(item.file);
    },
  },
  computed: {
    isCommentsList: function () {
      return this.commentsList === [] ? false : true;
    },
  },
};
</script>

<style lang="scss">
.post-container {
  width: 960px;
  padding-top: 80px;
  margin: 0 auto;

  // 帖子详情
  .post-detail {
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    // border: 1px solid red;

    // 帖子标题
    .post-title {
      border-bottom: 1px solid #909399;
      padding-bottom: 10px;
    }

    // 帖子作者
    .post-author {
      margin: 10px 0 0 0px;
      position: relative;
      display: flex;
      border-bottom: 1px solid #909399;
      padding-bottom: 10px;
      padding-left: 10px;

      .post-avater {
        .avater {
          width: 42px;
          border-radius: 50%;
        }
      }

      .avater-description {
        margin-left: 10px;
        padding-right: 10px;
        border-right: 1px solid #909399;

        // 姓名
        .post-name {
          font-size: 16px;
          font-weight: bold;
        }

        // 高校
        .post-college {
          font-size: 8px;
          margin-top: 2px;
        }
      }
    }

    // 帖子信息
    .post-info {
      margin-top: 30px;
    }

    // 附件下载
    .post-download {
      margin: 50px 20px 0px 0px;

      .download {
        color: #909399;
      }

      .download:hover {
        color: #029dff;
      }
    }

    // 按钮
    .button-container {
      margin-top: 30px;

      .btn-collect {
        .icon-star-fill {
          color: #ffd700;
        }
      }
    }
  }

  // 发布评论
  .add-comment {
    width: 900px;
    background-color: #fff;
    border-radius: 10px;
    margin-right: 0px;
    padding: 30px;
    margin-top: 20px;

    .add-comment-header {
      width: 900px;
      border-radius: 10px;
      display: flex;

      .current-avater {
        margin-right: 20px;

        img {
          width: 42px;
          border-radius: 50%;
        }
      }

      .el-form {
        max-width: 838px;

        .el-form-item {
          margin-bottom: 0px;
          width: 838px;

          .el-textarea {
            textarea {
              max-width: 838px;
              height: 66px;
              padding: 8px 12px 8px 12px;
              background-color: #e9ecef;
              width: 100%;
            }

            textarea:focus {
              background-color: #fff;
            }
          }
        }
      }
    }

    .add-comment-footer {
      margin-top: 10px;
      padding-left: 62px;
      display: none;
      justify-content: space-between;
      position: relative;

      // 上传
      .add-comment-upload {
        .el-upload-list {
          position: absolute;
        }

        .el-link {
          .span {
            // margin-right: 7px;
          }
        }
      }

      //
      .btn-comment {
      }
    }

    .comment-footer-flex {
      display: flex;
    }

    .comment-footer-none {
      display: none;
    }
  }

  // 分页评论
  .comment-container {
    margin-top: 20px;
    border-radius: 10px;
    background-color: #fff;

    .comment-title {
      padding: 10px 30px;
    }

    .comment-item {
      padding: 10px 30px;
      display: flex;
      position: relative;
      // border: 1px solid red;

      // 帖子作者
      .comment-author {
        position: relative;
        display: flex;
        padding-left: 10px;
        // margin: 10px 0 0 0px;
        // border-bottom: 1px solid #909399;
        // padding-bottom: 10px;

        .comment-avater {
          .avater {
            width: 40px;
            border-radius: 50%;
          }
        }
      }

      // 评论详细
      .comment-detail {
        .avater-description {
          margin-left: 10px;
          padding-right: 10px;
          // border-right: 1px solid #909399;
          display: flex;

          // 姓名
          .comment-name {
            border-right: 1px solid #909399;
            padding-right: 10px;
            font-size: 14px;
          }

          // 高校
          .comment-college {
            padding-left: 5px;
            font-size: 8px;
            margin-top: 2px;
          }
        }

        // 评论信息
        .comment-info {
          margin-top: 20px;
          margin-left: 20px;

          span {
            font-size: 12px;
          }
        }

        .comment-action {
          display: flex;

          // 附件下载
          .comment-download {
            margin: 20px 0px 0px 10px;
            font-size: 12px;

            .download {
              color: #909399;
            }

            .download:hover {
              color: #029dff;
            }
          }

          // 回复
          .add-comment-item {
            margin: 20px 0px 0px 10px;
            font-size: 12px;
            cursor: pointer;
            color: #909399;

            // .icon-message {}

            .add-action {
              font-size: 10px;
            }
          }

          .add-comment-item:hover {
            color: #029dff;
          }
        }
      }

      .comment-send-name {
        position: absolute;
        top: 10px;
        right: 30px;

        span {
          font-size: 12px;
        }
      }
    }

    .comment-item:nth-child(odd) {
      background-color: #fafafa;
    }
  }
}
</style>
