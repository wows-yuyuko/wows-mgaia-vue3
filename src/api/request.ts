import axios from 'axios'
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

// response 拦截器
service.interceptors.response.use(
  // 如果您想要获取诸如头或状态之类的http信息
  // 请返回response=>response
  response => {
    if (response?.data?.code === 200) {
      return Promise.resolve(response.data)
    }
    // 如果是近期数据接口  不要弹框报错了
    if ((response.config.url as string).indexOf('/account/recent/list') > -1) {
      return Promise.reject(response.data)
    }
    ElMessage.error(response.data.message)
    return Promise.reject(response.data)
  },
  error => {
    ElMessage.error(error.message)
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
