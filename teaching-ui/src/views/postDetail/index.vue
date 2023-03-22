<template>
  <!-- 帖子+评论 -->
  <div class="post-detail-container">
    <!-- 骨架屏 -->
    <el-skeleton animated :loading="skeletonLoading">
      <template #template>
        <el-row>
          <!-- 帖子详细 -->
          <div class="post-detail">
            <el-row>
              <el-col :span="8">
                <el-skeleton-item></el-skeleton-item>
              </el-col>
            </el-row>
            <!-- 帖子标题 -->
            <el-row>
              <div class="post-title">
                <el-col :span="24">
                  <!-- <el-skeleton-item></el-skeleton-item> -->
                </el-col>
              </div>
            </el-row>
            <!-- 作者信息 -->
            <div class="post-author">
              <!-- 头像 -->
              <div class="post-avater">
                <el-row>
                  <div class="avater">
                    <el-col>
                      <el-skeleton-item
                        variant="image"
                        style="height: 40px; border-radius: 50%"
                      ></el-skeleton-item>
                    </el-col>
                  </div>
                </el-row>
              </div>

              <div class="avater-description" style="width: 9%">
                <el-row>
                  <!-- 姓名 -->
                  <el-col :span="12">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                </el-row>
                <el-row>
                  <!-- 所属高校 -->
                  <el-col :span="24">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- 帖子信息 -->
            <el-row>
              <div class="post-info">
                <el-col :span="15">
                  <el-skeleton-item></el-skeleton-item>
                </el-col>
              </div>
            </el-row>

            <!-- 附件信息 -->
            <div class="post-download">
              <el-row>
                <el-col :span="3">
                  <el-skeleton-item></el-skeleton-item>
                </el-col>
              </el-row>
            </div>

            <!-- 收藏按钮 -->
            <div class="button-container">
              <el-row :gutter="10">
                <div class="post-info">
                  <el-col :span="2">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                  <el-col :span="2">
                    <el-skeleton-item></el-skeleton-item>
                  </el-col>
                </div>
              </el-row>
            </div>
          </div>

          <!-- 发布评论 -->
          <div class="add-comment">
            <div class="add-comment-header">
              <el-row>
                <div class="current-avater">
                  <el-col>
                    <el-skeleton-item
                      variant="image"
                      style="height: 40px; width: 40px; border-radius: 50%"
                    ></el-skeleton-item>
                  </el-col>
                </div>
              </el-row>
              <div class="form" style="width: 100%">
                <el-row style="width: 100%">
                  <!-- 姓名 -->
                  <el-col :span="24">
                    <el-skeleton-item
                      variant="image"
                      style="height: 66px"
                    ></el-skeleton-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <!-- 评论分页 -->
          <div class="comment-container">
            <h3 class="comment-title">
              <el-row>
                <!-- 姓名 -->
                <el-col :span="6">
                  <el-skeleton-item></el-skeleton-item>
                </el-col>
              </el-row>
            </h3>
            <!-- 单个评论 -->
            <div class="comment-item">
              <!-- 作者信息 -->
              <div class="comment-author">
                <!-- 头像 -->
                <div class="comment-avater">
                  <el-row>
                    <!-- 姓名 -->
                    <el-col :span="6">
                      <el-skeleton-item
                        variant="image"
                        style="height: 40px; width: 40px; border-radius: 50%"
                      ></el-skeleton-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- 评论详细 -->
              <div class="comment-detail">
                <!-- 用户描述 -->
                <div class="avater-description">
                  <!-- 姓名 -->
                  <div class="comment-name" style="width: 10%">
                    <el-row>
                      <!-- 姓名 -->
                      <el-col :span="24">
                        <el-skeleton-item></el-skeleton-item>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 所属高校 -->
                  <div class="comment-college" style="width: 16%">
                    <el-row>
                      <el-col :span="24">
                        <el-skeleton-item></el-skeleton-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <!-- 帖子信息 -->
                <div class="comment-info" style="width: 600px">
                  <el-row>
                    <el-col :span="24">
                      <el-skeleton-item></el-skeleton-item>
                    </el-col>
                  </el-row>
                </div>

                <div class="comment-action">
                  <!-- 附件信息 -->
                  <div class="comment-download" style="width: 10%">
                    <el-row>
                      <el-col :span="24">
                        <el-skeleton-item></el-skeleton-item>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 评论 -->
                  <div class="add-comment-item" style="width: 10%">
                    <el-row>
                      <el-col :span="24">
                        <el-skeleton-item></el-skeleton-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>

                <!-- 回复 -->
                <div class="comment-send-name" style="width: 10%">
                  <el-row>
                    <el-col :span="24">
                      <el-skeleton-item></el-skeleton-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </el-row>
      </template>
    </el-skeleton>

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
            :avatarName="postDetail.userName.split('')[0]"
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
        <span>{{ postDetail.resourceInfo }}</span>

        <!-- 如果附件是以 图片 / 视频的形式 则显示在帖子中 -->
        <div class="img-container" v-if="fileIsImg">
          <img :src="postDetail.resourceUrl" alt="图片" style="width: 600px" />
        </div>

        <div class="movies-container" v-else-if="fileIsVideo">
          <video-player
            :src="postDetail.resourceUrl"
            :volume="volume"
          ></video-player>
          <!-- <audio :src="" alt="视频"></audio> -->
        </div>

        <div
          class="doc-container"
          style="width: 100%; margin-top: 30px"
          v-else-if="docPreviewUrl"
        >
          <iframe
            :src="docPreviewUrl"
            frameborder="0"
            width="100%"
            height="600"
          ></iframe>
        </div>
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
            :class="collectStatus === '1' ? 'icon-star-fill' : 'icon-star'"
          ></span
          >{{ collectStatus === 1 ? "已收藏" : "收藏" }}</el-button
        >
        <el-button
          class="btn-collect"
          type="primary"
          size="mini"
          @click="commentOther(postDetail.userId, postDetail.userName)"
          ><span class="iconfont icon-message"></span>回复</el-button
        >
        <el-button
          class="btn-collect"
          type="primary"
          size="mini"
          @click="toUpdatePost(postId)"
          ><span class="iconfont icon-message"></span>修改</el-button
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
            :avatarName="userInfo.name.split('')[0]"
          ></default-avater>
          <img :src="userInfo.avatar" alt="当前用户" v-else />
        </div>
        <el-form class="form" ref="form" :model="form" label-width="0">
          <el-form-item label="">
            <el-input
              type="textarea"
              v-model="form.content"
              @focus="inputFocus"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div
        slot="footer"
        class="add-comment-footer"
        :class="isFocus ? 'comment-footer-flex' : 'comment-footer-none'"
      >
        <div class="add-left">
          <div class="add-smile" @click="isEmojis = !isEmojis">
            <span class="iconfont icon-smile"></span>
            <vue-emojis class="vue-emojis" v-show="isEmojis"></vue-emojis>
          </div>
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
        </div>
        <el-button
          class="btn-comment"
          type="primary"
          size="mini"
          @click="commentSubmit"
          ><span class="iconfont icon-message"></span>回复{{
            sendName
          }}</el-button
        >
      </div>
    </div>

    <!-- 评论分页 -->
    <div class="comment-container" v-if="isCommentsList">
      <div class="comment-container-title">
        <h3 class="comment-title">全部评论</h3>
        <!-- <div class="btn-group">
          <button @click="handleComment">评论最多</button>
          <button @click="handleComment">最新</button>
        </div> -->
      </div>
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
              :avatarName="commentItem.belongName.split('')[0]"
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
            <div
              class="add-comment-item"
              @click="commentOther(commentItem.belong, commentItem.belongName)"
            >
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
import VideoPlayer from "@/components/VideoPlayer";
import VueEmojis from "@/components/VueEmojis";

export default {
  name: "postDetail",
  components: {
    DefaultAvater,
    VideoPlayer,
    VueEmojis,
  },
  data() {
    return {
      // loading
      skeletonLoading: true,
      // 帖子信息相关
      postDetail: {}, // 帖子详细消息
      postId: undefined, // 帖子ID
      collectStatus: undefined, // 收藏状态
      // 帖子 显示图片/视频 文档
      fileSuffix: undefined,
      imgType: "png jpg jpeg", // 图片类型
      vidioType: "mp4 mpeg", // 视频类型
      docType: "pdf xlsx xls doc docx ppt pptx", // 视频类型
      volume: 0.5, // 视频声音
      fileIsImg: undefined, // 是否 图片
      fileIsVideo: undefined, // 是否是视频
      fileIsDoc: undefined, // 是否是视频
      docPreviewUrl: undefined, // doc预览地址
      isFocus: false, // 是否聚集
      // 评论
      commentsList: [], // 帖子评论
      sendId: undefined, // 默认 帖子作者
      isEmojis: false, // emoji-container 是否打开
      sendName: undefined, // 要回复给谁 的姓名 | 默认 帖子作者
      form: {
        send: undefined, // 接收评论的id
        content: "", // 内容
        url: "", // 附件url
        resource: undefined, // 评论所属资料ID
      },
      fileList: [], // 评论附件列表
      fileUrl: undefined,
      fileType: [
        "png",
        "jpg",
        "jpeg",
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
        "gif",
        "py",
      ], // 允许的文件类型
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
    this.getParams(); // 获取路由中的参数
    this.getPostDetailInfo();
    this.getPostCommentPageInfo(this.postId, 1, 100);
    this.userInfo = this.getTokenData();
    // 点击 emoji 时添加到输入框
    this.$bus.$on("addEmoji", (item) => {
      console.log(item.text);
      this.form.content += item.text;
    });
  },
  methods: {
    // 获取帖子详细消息
    async getPostDetailInfo() {
      const { data } = await getPostDetail(this.postId);
      this.postDetail = data;
      console.log(this.postDetail);
      // 获取 要回复的人
      this.sendId = data.userId;
      this.sendName = data.userName;

      // 设置后缀信息
      if (data.resourceUrl != "") {
        // 没有上传资源
        this.fileSuffix = data.resourceUrl
          .split(".")
          .reverse()[0]
          .toLowerCase();
        console.log(this.fileSuffix);
        this.isFileType(this.fileSuffix);
      }
      this.skeletonLoading = false;
    },
    // 修改帖子信息
    toUpdatePost(id) {
      this.$router.push({ path: "/addPost/" + id });
    },
    isFileType(suffix) {
      // 判断文件是什么类型
      console.log("fileIsImg=>", this.imgType.includes(suffix));
      this.fileIsImg = this.imgType.includes(suffix);
      // return str.includes(suffix);
      if (!this.fileIsImg) {
        console.log("fileIsVideo=>", this.vidioType.includes(suffix));
        this.fileIsVideo = this.vidioType.includes(suffix);
        // return str.includes(suffix);
      }
      if (!this.fileIsVideo) {
        console.log("fileIsDoc=>", this.docType.includes(suffix));
        this.fileIsDoc = this.vidioType.includes(suffix);
        this.docPreviewUrl = `https://view.officeapps.live.com/op/view.aspx?src=${this.postDetail.resourceUrl}`;
      }
    },
    // 获取路由中的参数
    getParams() {
      this.postId = this.$route.params.id;
      this.collectStatus = this.$route.query.collectStatus;
      console.log(this.collectStatus);
      // console.log(this.postId);
    },
    // 聚焦输入框
    inputFocus() {
      this.isFocus = true;
      this.isEmojis = false; //
    },
    // 点击收藏
    handleCollect() {
      this.collectForm.resource = this.postId;
      this.collectForm.belong = this.postDetail.userId;
      addCollect(this.collectForm).then((res) => {
        this.collectStatus = this.collectStatus === "1" ? "0" : "1";
        this.$message.success(res.message);
      });
    },
    /* 评论相关方法 */
    // 获取评论分页
    async getPostCommentPageInfo(id, current, pageSize) {
      const { data } = await getPostCommentPage(id, current, pageSize);
      this.commentsList = data.records;
    },
    // 回复 非 帖子作者
    commentOther(id, name) {
      this.sendId = id;
      this.sendName = name;
      this.isFocus = true;
    },
    // 点击评论
    commentSubmit() {
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
          this.form.resource = this.postDetail.resourceId; // 接收评论的资料id
          this.form.send = this.sendId; // 接收评论的用户id

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
              this.$message.info("你不能回复自己！！！");
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
    // 评论
    // handleComment() {
    //   console.log(this.commentsList);
    // },
    // 登录表单重置
    resetComment() {
      (this.form = {
        send: undefined, // 接收评论的id
        content: "", // 内容
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
/*大型屏幕pc 超大屏*/
@media screen and (min-width: 1200px) {
  .post-detail-container {
    width: 960px;
  }
}
/*1200>=pc>=992 大屏，字体红色，背景黑色*/
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .post-detail-container {
    width: 960px;
  }
}
/*768<=pad<992 中屏，字体黄色，背景红色*/
@media screen and (min-width: 768px) and (max-width: 991px) {
  .post-detail-container {
    width: 768px;
  }
}
/*phone<768  小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 767px) and (min-width: 480px) {
}
/* 超小屏，字体黑色，背景蓝色*/
@media screen and (max-width: 480px) {
}

.post-detail-container {
  // width: 960px;
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

      span {
        margin-bottom: 30px;
      }

      // 图片附件
      .img-container {
        display: flex;
        justify-content: center;
      }

      // 视频附件
      .movies-container {
        display: flex;
        justify-content: center;
      }

      // 文档附件
      .doc-container {
        display: flex;
        justify-content: center;
      }
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
    width: calc(100% - 60px);
    background-color: #fff;
    border-radius: 10px;
    margin-right: 0px;
    padding: 30px;
    margin-top: 20px;

    .add-comment-header {
      width: 100%;
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
        width: calc(100% - 60px);

        .el-form-item {
          margin-bottom: 0px;
          // width: 838px;

          .el-textarea {
            textarea {
              max-width: 100%;
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

      .add-left {
        display: flex;
        align-items: center;

        .add-smile {
          position: relative;
          cursor: pointer;
          font-size: 14px;
          margin-right: 10px;
          .icon-smile {
          }
        }

        // emojis 容器
        .vue-emojis {
          top: 30px;
          left: 0;
          z-index: 1;
        }

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

    .comment-container-title {
      display: flex;
      align-items: center;

      .comment-title {
        padding: 10px 30px;
      }

      // 最新 按钮 评论最多按钮
      // .btn-group {
      //   button {
      //     appearance: none;
      //     background-color: #fafbfc;
      //     border: 1px solid rgba(27, 31, 35, 0.15);
      //     border-radius: 6px;
      //     box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
      //       rgba(255, 255, 255, 0.25) 0 1px 0 inset;
      //     box-sizing: border-box;
      //     color: #24292e;
      //     cursor: pointer;
      //     display: inline-block;
      //     font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
      //       sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      //     font-size: 10px;
      //     font-weight: 500;
      //     line-height: 20px;
      //     list-style: none;
      //     padding: 3px 8px;
      //     position: relative;
      //     transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
      //     user-select: none;
      //     -webkit-user-select: none;
      //     touch-action: manipulation;
      //     vertical-align: middle;
      //     white-space: nowrap;
      //     word-wrap: break-word;
      //   }

      //   button:hover {
      //     background-color: #f3f4f6;
      //     text-decoration: none;
      //     transition-duration: 0.1s;
      //   }

      //   button:disabled {
      //     background-color: #fafbfc;
      //     border-color: rgba(27, 31, 35, 0.15);
      //     color: #959da5;
      //     cursor: default;
      //   }

      //   button:active {
      //     background-color: #edeff2;
      //     box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
      //     transition: none 0s;
      //   }

      //   button:focus {
      //     outline: 1px transparent;
      //   }

      //   button:before {
      //     display: none;
      //   }

      //   button:-webkit-details-marker {
      //     display: none;
      //   }
      // }
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
