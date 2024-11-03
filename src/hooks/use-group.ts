'use client'
import { useContext } from 'react'
import { GroupContext, GroupContextType } from '@/components/provider/group'
import { UserGroup } from '@/types/user'

// 宽松模式下的group上下文，如果没有设置group则不会报错，用于设置组织
export const useLooseGroupContext = () => {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error('useLooseGroupContext must be used within a GroupProvider')
  }
  return context
}
// 使用group上下文，如果没有设置group则会报错
export const useGroupContext = () => {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error('useGroupContext must be used within a GroupProvider')
  }
  if (!context.group) {
    throw new Error('Group is not set')
  }
  return context as GroupContextType & { group: UserGroup }
}
