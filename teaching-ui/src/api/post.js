import request from '@/utils/request'
/* 用户帖子相关接口 */


/** 用户帖子分页查询
 * @param {number} current
 * @param {number} pageSize
 * @method post
 * @returns {object}
  */
export function getPostPage(current, pageSize) {
  return request({
    url: `/post/page/${current}/${pageSize}`,
    method: "get",
  })
}

/** 用户帖子发布
 * @param {object} data
 * @method post
 * @returns {object}
  */
export function addPost(data) {
  return request({
    url: `/post/add`,
    method: "post",
    data
  })
}

/** 用户帖子详情
 * @param {number|string} id
 * @method post
 * @returns {object}
  */
export function getPostDetail(id) {
  return request({
    url: `/post/info/${id}`,
    method: "get",
  })
}

/** 资料详情评论分页
 * @param {number|string} id
 * @param {string} current
 * @param {string} pageSize
 * @method get
 * @returns {object}
  */
export function getPostCommentPage(id, current, pageSize) {
  return request({
    url: `/post/page/${id}/${current}/${pageSize}`,
    method: "get",
  })
}

/** 获取用户收到评论分页
 * @param {number} current
 * @param {number} pageSize
 * @method get
 * @returns {object}
  */
export function getUserCommentPage(current, pageSize) {
  return request({
    url: `/user/comment/page/${current}/${pageSize}`,
    method: "get",
  })
}

/** 新增评论
 * @param {object} data
 * @method post
 * @returns {object}
  */
export function addPostComment(data) {
  return request({
    url: `/post/comment/add`,
    method: "post",
    data
  })
}

/** 添加收藏 接口
 * @param {object} data = {belong resource}
 * @method post
 * @returns {object}
  */
export function addCollect(data) {
  return request({
    url: `/post/update/collect`,
    method: "put",
    data
  })
}

/** 删除收藏 接口
 * @param {string} id
 * @method post
 * @returns {object}
  */
export function delCollect(id) {
  return request({
    url: `/user/collect/delete/${id}`,
    method: "delete",
  })
}

/** 获取收藏分页接口
 * @param {string} id
 * @param {number} current
 * @param {number} pageSize
 * @method get
 * @returns {object}
  */
export function getCollectPage(id,current,pageSize) {
  return request({
    url: `/user/collect/page/${id}/${current}/${pageSize}`,
    method: "get",
  })
}

