import axios from 'axios'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  withCredentials: true
})

// 请求拦截器
http.interceptors.request.use(
  async (req) => {
    console.log('[request] ', req.method, req.url, req.data || req.params || '')

    return req
  },
  (error) => {
    console.log('[request error] ', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  // 成功拦截
  (resp) => {
    // 打印响应信息
    console.log('[response] ', resp.config.url, resp.data)
    return resp
  },
  // 失败拦截
  (error) => {
    // 判断连接是否超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('[response error] ', 'timeout')
    } else console.log('[response error] ', error.response?.status, error.response?.data, error)
    return Promise.reject(error)
  }
)

export default http
