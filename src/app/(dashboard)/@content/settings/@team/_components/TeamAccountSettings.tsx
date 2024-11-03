'use client'

import { useTranslations } from 'next-intl'
import http from '@/lib/ajax'
import { updateAvatar } from '@/lib/api/user'
import AccountSettings from '@/app/(dashboard)/@content/settings/_components/AccountSettings'
import { useGroupContext } from '@/hooks/use-group'
import { User } from '@/types/user'

// 团队账号设置
export default function TeamAccountSettings() {
  const t = useTranslations('Dashboard._content.Settings._team.account')
  const { group, setGroupAvatar, setGroupName } = useGroupContext()
  const { username } = group
  const onNameChange = async (name: string) => {
    const data = await http.put(`/group/${username}`, { name }).then((res): User => res.data)
    setGroupName(data.name || name)
  }
  const onAvatarChange = (canvas: HTMLCanvasElement) => {
    return new Promise<string>(async (resolve) => {
      await updateAvatar(canvas, async ({ key }) => {
        const data = await http.put(`/group/${username}`, { avatar: key }).then((res): User => res.data)
        setGroupAvatar(data.avatar)
        resolve(data.avatar)
      })
    })
  }
  return (
    <AccountSettings
      key={group.username}
      group={group}
      onNameChange={onNameChange}
      onAvatarChange={onAvatarChange}
      text={{
        title: t('title'),
        avatar: t('avatar.title'),
        name: t('name.title'),
        username: t('username.title')
      }}
    />
  )
}
