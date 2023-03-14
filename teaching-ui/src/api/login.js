import request from '@/utils/request'

/** 用户登录
 * @param {object} data
 * @method post
 * @returns {object}
  */
export function login(data) {
  return request({
    url: '/teacher/login',
    method: 'post',
    data
  })
}

/** 用户注册
 * @param {object} data
 * @method post
 * @returns {object}
  */
export function register(data) {
  return request({
    url: '/teacher/register',
    method: 'post',
    data
  })
}

/** 用户退出
 * @param {null}
 * @method post
 * @returns {null}
  */
export function logout() {
  return request({
    url: '/teacher/logout',
    method: 'post',
  })
}

/** 用户获取信息
 * @param {number | string} id
 * @method get
 * @returns {object}
  */
export function getInfo(id) {
  return request({
    url: `/user/info/get/${id}`,
    method: 'get'
  })
}

/** 用户获取最新信息
 * @param {number | string} id
 * @method get
 * @returns {object}
  */
export function getCurrentUser(id) {
  return request({
    url: `/user/login/get/${id}`,
    method: 'get'
  })
}

/** 用户修改自己信息
 * @param {object} data
 * @method post
 * @returns {object}
  */
export function updateUserInfo(data) {
  return request({
    url: `/user/info/self/update`,
    method: 'post',
    data
  })
}

