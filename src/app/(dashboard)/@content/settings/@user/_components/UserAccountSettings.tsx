'use client'

import { useTranslations } from 'next-intl'
import AccountSettings from '@/app/(dashboard)/@content/settings/_components/AccountSettings'
import { updateAvatar } from '@/lib/api/user'
import http from '@/lib/ajax'

import { useGroupContext } from '@/hooks/use-group'
import { User } from '@/types/user'

export default function UserAccountSettings() {
  const t = useTranslations('Dashboard._content.Settings._user.account')
  const { group, setGroupAvatar, setGroupName } = useGroupContext()
  const onNameChange = async (name: string) => {
    const data = await http.put('/user/profile', { name }).then((res): User => res.data)
    setGroupName(data.name || name)
  }
  const onAvatarChange = (canvas: HTMLCanvasElement) => {
    return new Promise<string>(async (resolve) => {
      await updateAvatar(canvas, async ({ key }) => {
        const data = await http.put('/user/profile', { avatar: key }).then((res): User => res.data)
        setGroupAvatar(data.avatar)
        resolve(data.avatar)
      })
    })
  }
  return (
    <AccountSettings
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
