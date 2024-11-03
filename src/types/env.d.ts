// src/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // 开发环境API代理地址
    NEXT_PROXY_URL: string
    // baseURL
    NEXT_BASE_URL: string
    // cloud地址
    NEXT_CLOUD_URL: string
    // 前端请求API地址
    NEXT_PUBLIC_API_URL: string
    // app版本号
    NEXT_PUBLIC_VERSION: string
  }
}
