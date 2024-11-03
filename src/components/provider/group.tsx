'use client'

import { createContext, useState } from 'react'
import { useLooseUserContext } from '@/hooks/use-user'

import { UserGroup } from '@/types/user'

export interface GroupContextType {
  // 为null代表还没设置group
  group: UserGroup | null
  // 设置group
  setGroup: (group: UserGroup) => void
  // 设置组织名，只有已登录且是组织拥有者时才能设置
  setGroupName: (name: string) => void
  // 设置组织头像，只有已登录且是组织拥有者时才能设置
  setGroupAvatar: (avatar: string) => void
}

export const GroupContext = createContext<GroupContextType | null>(null)

// 当前所处group上下文，可能在个人空间，也可能在组织空间，此时用户可能是组织的成员、拥有者或者访客，也可能未登录
// 因此空间上下文的设置需要在各自布局组件中进行
export default function GroupProvider({ children }: LayoutProps) {
  const [group, setGroup] = useState<UserGroup | null>(null)
  const userCtx = useLooseUserContext()
  const legalityVerify = () => {
    if (!group) throw new Error('Group is not set')
    // 未登录，肯定不能设置组织名
    if (!group) throw new Error('Group is not set')
    // 组织的角色不是拥有者，不能设置组织名
    if (!userCtx) throw new Error('User is not login')
    return { group, userCtx }
  }
  const setGroupName = (name: string) => {
    const { group: g, userCtx: u } = legalityVerify()
    setGroup({ ...g, name })
    u.setName(g.username, name)
  }
  const setGroupAvatar = (avatar: string) => {
    const { group: g, userCtx: u } = legalityVerify()
    setGroup({ ...g, avatar })
    u.setAvatar(g.username, avatar)
  }

  return (
    <GroupContext.Provider value={{ group, setGroup, setGroupName, setGroupAvatar }}>{children}</GroupContext.Provider>
  )
}
