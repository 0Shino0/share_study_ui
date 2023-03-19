import axios from 'axios'
import Vue from 'vue'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router' // 引入路由
import { getToken, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config);
    // do something before request is sent

    // session鉴权

    // token鉴权
    /*     if (store.getters.token) {
          // let each request carry token
          // ['X-Token'] is a custom headers key
          // please modify it according to the actual situation
          config.headers['userLoginState'] = getToken()
        } */

    // 添加 responseType 向服务端请求文件时添加
    // if (config.responseType) {
    //   config['responseType'] = 'blob'
    // }

    // 上传文件响应头
    // config.headers['Conten-Type'] = "application/x-www-form-urlencoded";
    // config.headers['Conten-Type'] = "multipart/form-data";
    // console.log(config);
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res);
    // console.log("getToken=>", getToken());
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== "00000") {
      // if (res.code !== 20000) {

      // 暂时关闭全局 error
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 未登录
      if (res.code === "D0112") {
        console.log("未登录");
        console.log('Vue=>',Vue.prototype.$bus);

        // store.dispatch('user/logout').then(() => { // 退出登录
        //   // location.reload()
        // })
        // console.log("getToken=>", getToken());
        // 未登录 => 跳转首页
        console.log(getToken());
        if (getToken()) {
          console.log('noLogin');
          // 未登录
          Vue.prototype.$bus.$emit('noLogin', 'noLogin')
          removeToken('adminLoginstate')
        }else if (window.location.href.split('#')[1] !== '/login') {
            router.push(`/login`);
          }

      }

      if (res.code === 'A0410') {
        console.log("请求必填参数为空");
        console.log(res);
      }

      if (res.code === 'A0301') {
        console.log("访问未授权!!");
        console.log(res);
      }

      // 50008:非法令牌;50012:已登录的其他客户端;50014:令牌过期;
      if (res.code === "50008" || res.code === "50012" || res.code === "50014") {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // token鉴权-清除token
          store.dispatch('user/resetToken').then(() => {
            // location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // console.log(error.message);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
