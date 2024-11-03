'use server'

import f from '@/lib/request'
import { User } from '@/types/user'

// 服务端获取用户信息
export async function getUser(): Promise<User | null> {
  return await f
    .httpFactory({ url: '/pre_login', method: 'GET', cacheTime: 0 })
    .then((res) => {
      return res as User
    })
    .catch(() => {
      return null
    })
}
