import axios from 'axios'
import type { AxiosRequestHeaders } from 'axios'
import { ElMessage } from 'element-plus'

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
    (config.headers as AxiosRequestHeaders).Authorization = 'WEB_API:wows_yuyuko';
    (config.headers as AxiosRequestHeaders)['Yuyuko-Client-Type'] = 'WEB;01'
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
      return Promise.resolve(response.data)
    }
    // 如果是近期数据接口  不要弹框报错了
    if ((response.config.url as string).indexOf('/account/recent/list') > -1) {
      return Promise.reject(response.data)
    }
    console.error(response.data.message)
    return Promise.reject(response.data)
  },
  error => {
    console.error(error)
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
