import axios from 'axios'
import { Message } from 'element-ui'

console.log(process.env)

let pending = [] //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken
//删除重复请求
let removePending = (ever) => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) {
      //当当前请求在数组中存在时执行函数体
      pending[p].f('cancel') //执行取消操作
      pending.splice(p, 1) //把这条记录从数组中移除
    }
  }
}

const service = axios.create({
  baseURL: process.env.VUE_APP_INTERFACE_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'X-Api-Key': process.env.VUE_APP_KEY,
  },
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    removePending(config) //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + '&' + config.method, f: c })
    })

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    removePending(response.config)
    const { code, msg, message } = response.data || {}
    if (code !== 10000) {
      console.log(msg)
      Message.warning(msg || message || '系统异常')
      return Promise.reject(response)
    }
    return response.data
  },
  function (error) {
    if (error.response) {
      const errRes = error.response.data
      const errMsg = errRes.message || errRes.msg || '系统异常'
      Message.error(errMsg)
      if (errRes.code === 401) {
        window.location.href = errRes.loginUrl
      }
    } else if (error.message === 'Network Error') {
      Message.error('Network Error')
    } else if (error.message.indexOf('timeout') != -1) {
      Message.error('请求超时')
    }

    return Promise.reject(error)
  }
)

export default service
