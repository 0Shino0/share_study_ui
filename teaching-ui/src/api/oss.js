import request from '@/utils/request'
import qs from 'qs';

/* oss存储相关 */


/** 用户头像上传
 * @param {file} data
 * @method post
 * @returns {object}
  */
export function ossAvatarUpload(data) {
  return request({
    url: `/file/oss_avatar_upload`,
    method: 'post',
    data,
    headers: {
      'Conten-Type': "multipart/form-data"
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** 用户其他文件上传
 * @param {FormData} data
 * @method post
 * @returns {object}
  */
export function ossFileUpload(data) {
  // console.log(data);
  return request({
    url: `/file/oss_file_upload`,
    method: 'post',
    data,
    timeout: 3 *60 *1000, // 上传设置180秒
    headers: {
      'Conten-Type': "multipart/form-data"
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** oss 文件删除
 * @param {string} ossUrl
 * @method delete
 * @returns {object}
  */
export function delOssFile(ossUrl) {
  return request({
    url: `/file/oss_file_delete?ossUrl=${ossUrl}`,
    method: 'delete',
  })
}


