import request from '@/utils/request'
/* oss存储相关 */

/** 用户头像上传
 * @param {file} file
 * @method post
 * @returns {object}
  */
export function getResourceInfoPage(file) {
  return request({
    url: `/file/oss_avatar_upload`,
    method: 'post',
    file
  })
}

/** 用户头像上传
 * @param {file} file
 * @method post
 * @returns {object}
  */
export function ossAvatarUpload(file) {
  return request({
    url: `/file/oss_avatar_upload`,
    method: 'post',
    file
  })
}

/** 用户其他文件上传
 * @param {file} file
 * @method post
 * @returns {object}
  */
export function ossFileUpload(file) {
  return request({
    url: `/file/oss_file_upload`,
    method: 'post',
    file
  })
}

/** oss 文件删除
 * @param {string} ossUrl
 * @method delete
 * @returns {object}
  */
export function ossFileUpload(ossUrl) {
  return request({
    url: `/file/oss_file_delete/${ossUrl}`,
    method: 'delete',
  })
}


