'use client'

// 用户登录请求体
import { createContext, useState } from 'react'

import { User } from '@/types/user'

type AvailableStatus = ['start', 'verifying', 'signing']

export type Status = AvailableStatus[number]

export interface AuthUser extends User {
  // 较早登录的用户可能没有tag字段
  tag: 'A' | 'B' | null
}

export interface AuthContextType {
  /**
   * 当前所处登录/注册流程的状态
   * 1. start: 初始状态
   * 2. verifying: 验证手机号码
   * 3. signing: 验证完毕后填写用户信息
   */
  status: Status
  // 设置状态
  setStatus: (status: Status) => void
  // 手机号
  phone: string
  // 设置手机号
  setPhone: (phone: string) => void
  // user，携带tag字段
  user: AuthUser | null
  // 设置user
  setUser: (user: AuthUser) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthContextProvider({ children }: LayoutProps) {
  const [phone, setPhone] = useState<string>('')
  const [status, setStatus] = useState<Status>('start')
  const [user, setUser] = useState<AuthUser | null>(null)
  return (
    <AuthContext.Provider value={{ status, setStatus, phone, setPhone, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
