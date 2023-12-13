import axios from 'axios'
import type { AxiosRequestHeaders } from 'axios'
import electron from '@/stores/electron'

// 创建axios实例
const service = axios.create({
  // 自定义的请求头
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  // 超时设置
  timeout: 60000,
  // 跨域是否带Token
  withCredentials: false,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: 'json'
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 发出请求前的处理
    (config.headers as AxiosRequestHeaders)['Yuyuko-Client-Type'] = electron().electronEnable ? 'WEB;TOOLS.0.0' : 'WEB;0.0.0';
    (config.headers as AxiosRequestHeaders).Authorization = 'WEB_API:wows_yuyuko'
    // config.headers['sessionKey'] = store.getters.key // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  // 如果您想要获取诸如头或状态之类的http信息
  // 请返回response=>response
  response => {
    if (response?.data?.code === 200 || response?.data?.code === 201) {
      return Promise.resolve(response.data.data)
    }
    // 这种格式是代理毛子格式  直接返回
    if (response?.data?.status === 'ok') {
      return Promise.resolve(response)
    }
    return Promise.reject(response)
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  post<T> (url: string, data: T): Promise<any> {
    return service({
      method: 'post',
      url,
      data
    })
  },
  get<T> (url: string, data: T): Promise<any> {
    return service({
      method: 'get',
      url,
      params: data
    })
  }
}
