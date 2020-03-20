/**
* 全局变量 和 设置 、配置等。。。
*/
import axios from 'axios' // 引入axios
import {Message} from 'element-ui'
// import Storage from '@/assets/js/util/storage.js' // storage工具类，简单的封装
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* 请求拦截器 */
axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
  let token = localStorage.token
  // let token = '263082f1-bba2-4471-8949-0f524a4abcc5'
  console.log('=====================')
  console.log(localStorage)
  console.log(token)
  console.log(config)
  if (token) {
    token = 'bearer' + ' ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中
    config.headers.common['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
/* 响应拦截器 */
axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
  console.log('------------------------', response)
  if (response.status === '401') {
    Message.error(response.error)
  }
  if (response.data.code === 10010 || response.data.code === 10011) {
    localStorage.localRemove('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
    // this.router.replace({
    //   path: '/login' // 到登录页重新获取token
    // })
  } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
    localStorage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export async function myaxios (url, method, params) {
  let axiosData = {
    url: url,
    method: method,
    params: {},
    data: {}
  }
  let _datas
  if (method === 'GET' || method === 'DELETE') {
    axiosData.params = params
  } else if (method === 'POST' || method === 'PUT') {
    axiosData.data = params
  }
  _datas = axios(axiosData).then((data1) => {
    if (data1.data.isException === '0') {
      Message.success(data1.data.message)
    } else if (data1.data.isException === '1') {
      Message.error(data1.data.message)
    }
    return data1
  }).catch((error) => {
    console.log('----==========-----------', error)
    Message.error(error)
    return error
  })
  return _datas
}
