import Vue from "vue";
import { login, logout, getInfo, register,getCurrentUser } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from "@/router";
// import { resetRouter } from '@/router'
// import Cookies from 'js-cookie'

const getDefaultState = () => {
  return {
    token: getToken(),
    // name: '',
    // avatar: ''
    userInfo: {},
    isLogin: false,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ISLOGIN: (state, isLogin) => {
    state.isLogin = isLogin
  }
}

const actions = {
  // 管理员登录
  login({ commit }, userInfo) {
    // console.log(commit,userInfo);
    const { account, password } = userInfo;
    // let { $userInfo,getTokenData } = Vue.prototype; // 全局属性相关

    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        const { data } = response;
        // 获取用户信息
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // token鉴权
        
        // console.log({...data,isLogin:true});
        commit('SET_TOKEN', JSON.stringify({...data,isLogin:true}))
        setToken(JSON.stringify({...data,isLogin:true}))
        commit('SET_USERINFO', { ...data, isLogin: true })
        // 获取用户数据
        // $userInfo = getTokenData()
        // console.log('$userInfo=>', $userInfo);
        // 设置登录状态
        // commit('SET_ISLOGIN', true)
        // 传递信息
        resolve({...data,isLogin:true})
        // resolve()
        // console.log(1);
      }).catch(error => {
        reject(error)
        console.log(3);
      })
    })
  },

  getInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      getCurrentUser(id).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // const { name, avatar } = data
        commit('SET_TOKEN', JSON.stringify({...data,isLogin:true}))
        setToken(JSON.stringify({...data,isLogin:true}))
        commit('SET_USERINFO', { ...data, isLogin: true })

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve({ ...data, isLogin: true })
        return { ...data, isLogin: true };
      }).catch(error => {
        reject(error)
        return error;
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },


  // 用户登出
  logout({ commit, state }) {
    // let {$userInfo} = Vue.prototype; // 全局属性相关
    // $userInfo = undefined;
    // // 清除用户数据
    // console.log('$userInfo=>',$userInfo);
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // 清除token
        // 跳转路由
        if (window.location.href.split('#')[1] !== '/login') {
          router.push(`/login`);
        }
        // resetRouter()
        commit('RESET_STATE')
        commit('SET_USERINFO',undefined)
        commit('SET_ISLOGIN', false)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('SET_ISLOGIN', false)
      commit('RESET_STATE')
      resolve()
    })
  },

  // changeLogin
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

