import { ElementPlus, ElMessage } from 'element-plus';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
});
console.log(import.meta.env)
// 添加请求拦截器
axiosInstance.interceptors.request.use(
(config: InternalAxiosRequestConfig) => {
  // 在发送请求之前做些什么
  return config;
},(error: any) => {
  // 处理请求错误
  return Promise.reject(error);
},
);
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    if (res.code !== "00000") {
      // 未登录
      if (res.code === "D0112") {
        console.log("未登录");
        // console.log('Vue=>',Vue.prototype.$bus);

        // store.dispatch('user/logout').then(() => { // 退出登录
        //   // location.reload()
        // })
        // console.log("getToken=>", getToken());
        // 未登录 => 跳转首页
        // console.log(getToken());
        
        // if (getToken()) {
        //   console.log('noLogin');
        //   // 未登录
        //   Vue.prototype.$bus.$emit('noLogin', 'noLogin')
        //   removeToken('adminLoginstate')
        // }else if (window.location.href.split('#')[1] !== '/login') {
        //     router.push(`/login`);
        //   }
      }else if (res.code === 'A0410') {
        console.error('请求必填参数为空!!!');
        return Promise.reject(new Error(res.message || 'Error'))
        // console.log(res);
      } else if (res.code === 'A0301') {
        console.error('请求必填参数为空!!!');
        console.log("访问未授权!!");
        return Promise.reject(new Error(res.message || 'Error'))
        // console.log(res);
      } else {
            // 暂时关闭全局 error
            ElMessage({
              message: res.message || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
 
            return Promise.reject(new Error(res.message || 'Error'))
      }
    } else {
      
       // 对响应数据做点什么
       return res;
    }
},(error: any) => {
  // 处理响应错误
  return Promise.reject(error);
},
);
export default axiosInstance;