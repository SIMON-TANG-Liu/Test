'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useUserContext } from '@/hooks/use-user'
import { useLooseGroupContext } from '@/hooks/use-group'
import { createQueryFromSearchParams } from '@/lib/client'
import { UserGroup } from '@/types/user'

function findGroup(groups: UserGroup[], username: string) {
  return groups.find((group) => group.username.toLowerCase() === username.toLowerCase())
}

interface WorkspaceContextType {
  setWorkspace: (groupname: string) => void
}

const WorkspaceContext = React.createContext<WorkspaceContextType | null>(null)

export const useWorkspaceContext = () => {
  const context = React.useContext(WorkspaceContext)
  if (!context) {
    throw new Error('useWorkspaceContext must be used within a WorkspaceProvider')
  }
  return context
}

// 监听、校验group上下文变化，切换router的space参数
export default function WorkspaceProvider({ children }: LayoutProps) {
  const { user } = useUserContext()
  const query = useSearchParams()
  const router = useRouter()
  const { setGroup } = useLooseGroupContext()
  const [isReady, setIsReady] = useState(false)
  const pathname = usePathname()
  // 校验，确保group上下文已经准备好，并且与router的space参数一致
  useEffect(() => {
    const set = (group: UserGroup) => {
      setGroup(group)
      setIsReady(true)
    }
    const username = query.get('space')
    if (username === null) {
      const nowGroup = findGroup(user.groups, user.username)
      if (nowGroup === undefined) throw new Error('User must have a group')
      set(nowGroup)
    } else {
      const group = findGroup(user.groups, username)
      // username不在任何一个组织中，则重定向到个人空间
      if (!group) {
        router.replace('/workspace')
      } else {
        set(group)
      }
    }
    return () => {
      setIsReady(false)
    }
  }, [query, user, router, setGroup, setIsReady])
  const setWorkspace = (groupname: string) => {
    const username = query.get('space') || user.username
    const nowGroup = findGroup(user.groups, username)
    if (!nowGroup) throw new Error('Can not find group!')
    if (nowGroup.username !== groupname) {
      setGroup(nowGroup)
      router.push(
        createQueryFromSearchParams({
          searchParams: query,
          prefix: pathname,
          update: (current) => {
            current.set('space', groupname)
          }
        })
      )
    }
  }
  if (!isReady) return null
  return <WorkspaceContext.Provider value={{ setWorkspace }}>{children}</WorkspaceContext.Provider>
}

export function WorkspaceSwitcher({ user, team }: { user: React.ReactNode; team: React.ReactNode }) {
  const { group } = useLooseGroupContext()
  return group?.isUser ? user : team
}
