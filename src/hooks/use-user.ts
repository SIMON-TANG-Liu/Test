'use client'
import 'client-only'
import { useContext } from 'react'
import { UserContext, UserContextData, UserContextType } from '@/components/provider/user'

// 用户上下文钩子，用于获取用户信息，不要求用户已登录
export const useLooseUserContext = () => {
  return useContext(UserContext)
}

// 用户上下文钩子，用于获取用户信息，注意使用此钩子时用户必须已登录
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  if (!context.user) {
    throw new Error('user must be defined when useUserContext')
  }
  return context as UserContextType & { user: UserContextData }
}
