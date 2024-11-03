'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import http from '@/lib/ajax'
import { Member, MemberRes } from '@/app/(dashboard)/@content/settings/@team/types'
import { useToast } from '@/hooks/use-toast'
import { AvatarWithInfoSkeleton } from '@/app/(dashboard)/@content/settings/@team/_components/AvatarWithInfoSkeleton'
import { useGroupContext } from '@/hooks/use-group'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import AvatarWithInfo from '@/app/(dashboard)/@content/settings/@team/_components/AvatarWithInfo'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'

export default function TeamMemberSettings() {
  const { loading, members, actionMapForMember } = useMemberManage()
  return loading ? <AvatarWithInfoSkeleton /> : <MemberDataTable members={members} actions={actionMapForMember} />
}

// 成员管理hook
const useMemberManage = () => {
  const { group } = useGroupContext()
  const prefix = `/group/${group.username}`
  const t = useTranslations('Dashboard._content.Settings._team.member')
  const { toast } = useToast()
  // 状态管理
  const [members, setMembers] = useState<Member[]>([])
  // 初始化请求
  const { loading, run, cancel } = useRequest(
    async () => {
      const members = await http.get(`${prefix}/users`).then((res) => res.data)
      setMembers(members.map((m: MemberRes) => ({ ...m.user, role: m.role, id: m.id })))
    },
    { manual: true }
  )
  useEffect(() => {
    if (!group.isUser) run()
    return () => cancel()
  }, [run, group, cancel])

  // 成员相关操作
  // 删除成员
  const removeMember = async (id: number) => {
    await http.delete(`/group/rbac/${id}`).then((res) => {
      if (res.status === 200) {
        setMembers(members.filter((m) => m.id !== id))
        toast({ description: t('membersTab.action.remove.success') })
      } else {
        toast({ description: t('membersTab.action.remove.failure') })
      }
    })
  }
  const actionMapForMember = {
    remove: removeMember
  }
  return { loading, members, actionMapForMember }
}

// 成员列表
function MemberDataTable({ members, actions }: { members: Member[]; actions: { remove: (id: number) => void } }) {
  const t = useTranslations('Dashboard._content.Settings._team.member.membersTab')
  const roleMap = {
    OWNER: t('role.owner'),
    MEMBER: t('role.member'),
    VIEWER: t('role.viewer')
  }

  return (
    <ul className="flex flex-col gap-2">
      {members.map((member) => (
        <li key={member.username} className="flex justify-between items-center">
          <AvatarWithInfo user={member} />
          <div className="flex flex-row gap-2 items-center">
            <span className="text-sm text-secondary-foreground">{roleMap[member.role]}</span>
            {member.role !== 'OWNER' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t('action.title')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => actions.remove(member.id)}>
                    {t('action.remove.title')}
                  </DropdownMenuItem>
                  <DropdownMenuArrow className="fill-accent" />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
