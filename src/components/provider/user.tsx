'use client'
// 用户信息
import { createContext, useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { assert } from '@/lib/client'
import { AxiosError } from 'axios'

import { getApiKey, getUserGroups, preLogin } from '@/lib/api/user'
import Loading from '@/app/loading'
import { User, UserApiKey, UserGroup } from '@/types/user'

// 用户上下文数据
export interface UserContextData extends User {
  apiKey: UserApiKey
  // 用户所在的所有组织，包括自己
  groups: UserGroup[]
  verified: true
}

export interface UserContextType {
  // 用户信息，未登录时为null
  user: UserContextData | null
  setName: (username: string, name: string) => void
  setAvatar: (username: string, name: string) => void
  removeGroup: (username: string) => void
  signOut: () => void
  // 重新初始化函数，异步，需要调用者自己处理错误，用于重新获取用户信息，整个页面重新初始化
  reInit: () => Promise<unknown>
  // 重新加载用户的组织信息
  reloadGroups: () => Promise<unknown>
}

// 用户上下文，为null表示未登录
export const UserContext = createContext<UserContextType | null>(null)

// 获取用户信息
async function getUser(): Promise<User | null> {
  return await preLogin()
    .then((user) => {
      if (user.verified) {
        return user
      }
      return null
    })
    .catch((e: AxiosError) => {
      if (e.response?.status === 401) {
        // 未登录
        return null
      }
      throw e
    })
}

// 页面初始化，获取用户信息、初始化数据等
async function init(): Promise<UserContextData | null> {
  const user = await getUser()
  if (!user) return null
  const [groups, apiKey] = await Promise.all([getUserGroups(), getApiKey()])
  assert(user.verified, 'user must be verified!')
  return {
    ...user,
    verified: true,
    groups: groups,
    apiKey
  }
}

// 将自己添加到所有组织的头部，用于显示
const addSelfToGroups = (user: UserContextData) => {
  user.groups.unshift({
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    role: 'OWNER',
    isUser: true
  })
}

// 初始化钩子
function useInit() {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<UserContextData | null>(null)
  const { loading, error, run, cancel, runAsync } = useRequest(init, {
    loadingDelay: 300,
    manual: true,
    onSuccess: (data) => {
      if (!data) return
      addSelfToGroups(data)
      setUser(data)
    },
    onFinally: () => {
      setIsReady(true)
    }
  })
  return { loading, error, run, cancel, isReady, user, setUser, runAsync }
}

// 用户信息提供器，发生在首屏渲染时，因此也包括初始化数据的获取
export default function UserProvider({ children }: LayoutProps) {
  const { loading, error, run, cancel, isReady, user, setUser, runAsync } = useInit()
  useEffect(() => {
    run()
    return () => cancel()
  }, [run, cancel])

  if (error) {
    throw new Error(error.message)
  }
  if (loading || !isReady) {
    return <Loading />
  }
  const setName: UserContextType['setName'] = (username, name) => {
    assert(user, 'user must be defined when setName')
    if (username === user.username) {
      user.name = name
    }
    for (const group of user.groups) {
      if (group.username === username) {
        group.name = name
      }
    }
    setUser({ ...user })
  }
  const setAvatar: UserContextType['setAvatar'] = (username, avatar) => {
    assert(user, 'user must be defined when setAvatar')
    if (username === user.username) {
      user.avatar = avatar
    }
    for (const group of user.groups) {
      if (group.username === username) {
        group.avatar = avatar
      }
    }
    setUser({ ...user })
  }
  const signOut: UserContextType['signOut'] = async () => {
    assert(user, 'user must be defined when signOut')
    setUser(null)
  }
  const removeGroup: UserContextType['removeGroup'] = (username) => {
    assert(user, 'user must be defined when removeGroup')
    user.groups = user.groups.filter((g) => g.username !== username)
    setUser({ ...user })
  }
  // 重新获取用户组织信息
  const reloadGroups: UserContextType['reloadGroups'] = async function () {
    assert(user, 'user must be defined when reloadGroups')
    user.groups = await getUserGroups()
    // 重新请求后覆盖了自己，需要重新添加
    addSelfToGroups(user)
  }
  if (isReady)
    return (
      <UserContext.Provider value={{ user, setName, setAvatar, signOut, removeGroup, reInit: runAsync, reloadGroups }}>
        {children}
      </UserContext.Provider>
    )
}
