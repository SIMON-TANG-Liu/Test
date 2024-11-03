import 'server-only'
import queryString from 'query-string'
import { cookies } from 'next/headers'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface Params {
  cacheTime?: number //缓存时间，单位为s。默认强缓存，0为不缓存
  body?: { [key: string]: unknown }
  params?: { [key: string]: unknown }
}

interface Props extends Params {
  url: string
  method: Method
}

type Config = { next: { revalidate: number } } | { cache: 'no-store' } | { cache: 'force-cache' }

class Request {
  /**
   * 请求拦截器
   */
  interceptorsRequest({ url, method, params, body, cacheTime }: Props) {
    let queryParams = '' //url参数
    let requestPayload = '' //请求体数据
    //请求头
    const headers = {}

    // 缓存配置
    const config: Config = cacheTime
      ? cacheTime > 0
        ? { next: { revalidate: cacheTime } }
        : { cache: 'force-cache' }
      : { cache: 'no-store' }

    if (method === 'GET' || method === 'DELETE') {
      //fetch对GET请求等，不支持将参数传在body上，只能拼接url
      if (params) {
        queryParams = queryString.stringify(params)
        url = `${url}?${queryParams}`
      }
    } else {
      //非form-data传输JSON数据格式
      if (!['[object FormData]', '[object URLSearchParams]'].includes(Object.prototype.toString.call(body))) {
        Object.assign(headers, { 'Content-Type': 'application/json' })
        requestPayload = JSON.stringify(body)
      } else {
        throw new Error('暂不支持FormData和URLSearchParams')
      }
    }
    Object.assign(headers, { Cookie: cookies() })

    return {
      url,
      options: {
        method,
        headers,
        body: method !== 'GET' && method !== 'DELETE' ? requestPayload : undefined,
        ...config
      }
    }
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url
      if (res.ok) {
        return resolve(res.json() as Promise<T>)
      } else {
        res
          .clone()
          .text()
          .then((text) => {
            try {
              const errorData = JSON.parse(text)
              return reject({ message: errorData || '接口错误', url: requestUrl })
            } catch {
              return reject({ message: text, url: requestUrl })
            }
          })
      }
    })
  }

  /**
   * 请求工厂，创建请求
   * @param url 请求地址，不包含baseUrl，必须以/开头
   * @param body 请求体数据(post、put、patch请求使用)
   * @param params 请求参数(get、delete请求使用)
   * @param cacheTime 缓存时间，单位为s。默认不缓存，0为不缓存，大于0为强缓存且设置缓存时间，小于0为强缓存且不设置缓存时间
   * @param method 请求方法
   */
  async httpFactory<T>({ url = '', body, params, cacheTime, method }: Props): Promise<T> {
    const req = this.interceptorsRequest({
      url: process.env.API_URL + url,
      method,
      params,
      body,
      cacheTime
    })
    const res = await fetch(req.url, req.options)
    return this.interceptorsResponse<T>(res)
  }

  /**
   * 发送请求（raw）版本，更加灵活
   * @param method 请求方法
   * @param url 请求地址
   * @param params 请求参数
   */
  async request<T>(method: Method, url: string, params: Params = {}): Promise<T> {
    return this.httpFactory<T>({
      url,
      method,
      ...params
    })
  }

  get<T>(
    url: string,
    { params, cacheTime }: { params?: Params['params']; cacheTime?: Params['cacheTime'] }
  ): Promise<T> {
    return this.request('GET', url, { params, cacheTime })
  }

  post<T>(url: string, body?: Params['body']): Promise<T> {
    return this.request('POST', url, { body })
  }

  put<T>(url: string, body?: Params['body']): Promise<T> {
    return this.request('PUT', url, { body })
  }

  delete<T>(url: string, params?: Params['params']): Promise<T> {
    return this.request('DELETE', url, { params })
  }

  patch<T>(url: string, body?: Params['body']): Promise<T> {
    return this.request('PATCH', url, { body })
  }
}

const f = new Request()

// 服务端fetch函数
export default f
