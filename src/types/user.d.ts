// 登录用户信息
export interface User {
  username: string
  name: string | null
  avatar: string
  createdAt: string
  verified: boolean
}
// 用户的API Key信息
export interface UserApiKey {
  id: number
  name: string
  key: string
  createdAt: string
}
//  用户组织信息
export interface UserGroup {
  username: string
  name: string | null
  avatar: string
  // 该用户在组织中的角色，如果是用户自己则为OWNER
  role: 'OWNER' | 'MEMBER' | 'VIEWER'
  // 标注是否是用户自己
  isUser: true | undefined
}
