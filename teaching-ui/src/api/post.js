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
    method: "post",
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
export function getPostPage(id) {
  return request({
    url: `/post/info/${id}`,
    method: "post",
  })
}

/** 资料详情评论分页
 * @param {number|string} id
 * @param {string} current
 * @param {string} pageSize
 * @method get
 * @returns {object}
  */
export function getPostPage(id, current, pageSize) {
  return request({
    url: `/post/page/${id}/${current}/${pageSize}`,
    method: "get",
  })
}