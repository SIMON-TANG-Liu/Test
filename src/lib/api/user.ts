import http from '@/lib/ajax'
import axios from 'axios'
import { User, UserApiKey, UserGroup } from '@/types/user'

/**
 * 用户预登录，获取用户信息
 */
export async function preLogin(): Promise<User> {
  return await http.get<User>('/pre_login').then((res) => res.data)
}

/**
 * 获取用户的组织信息
 * 此接口会从sessionStorage中获取信息，如果没有或者解析失败则会重新请求
 */
export async function getUserGroups(): Promise<UserGroup[]> {
  const resp = await http.get<{ list: UserGroup[] }>('/group').then((res) => res.data)
  return resp.list
}

/**
 * 获取用户最新的apiKey
 */
export async function getApiKey(): Promise<UserApiKey> {
  return await http.get('/user/key/latest').then((res) => res.data as UserApiKey)
}

interface AvatarResponse {
  // 上传地址
  url: string
  // 更新到数据库的key
  key: string
}

// 更新用户头像
export async function updateAvatar(
  canvas: HTMLCanvasElement,
  callback: ({ url, key }: AvatarResponse) => Promise<void>
): Promise<AvatarResponse['url']> {
  // 1. canvas to blob
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        throw new Error('Failed to convert canvas to blob')
      }
    })
  })
  // 2. avatar upload to server
  // 2.1 get upload token and upload url
  const { url, key } = await http.post('/user/avatar').then((res): AvatarResponse => res.data)
  // 2.2 upload avatar to cos
  await axios({
    url,
    method: 'PUT',
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'max-age=31536000'
    },
    data: blob
  })
  // 3. callback
  await callback({ url, key })
  return url
}

// 检查用户名是否唯一
export async function checkUsernameUnique(username: string) {
  try {
    await http.get('/user/username', { params: { name: username } })
    return 'valid'
  } catch {
    return 'conflict'
  }
}
