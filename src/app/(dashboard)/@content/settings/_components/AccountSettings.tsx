import 'client-only'
import SettingGroup from '@/app/(dashboard)/@content/settings/_components/SettingGroup'
import SettingItem from '@/app/(dashboard)/@content/settings/_components/SettingItem'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { PencilRuler, SquarePen } from 'lucide-react'
import React, { useRef, useState } from 'react'
import AvatarEditorWrapper from '@/components/AvatarEditorWrapper'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import { UserGroup } from '@/types/user'

// 账号设置组件，修改头像、昵称等
export default function AccountSettings({
  group,
  onNameChange,
  onAvatarChange,
  text: { title, avatar, name, username }
}: {
  group: UserGroup
  onNameChange: (name: string) => Promise<void>
  onAvatarChange: (canvas: HTMLCanvasElement) => Promise<string>
  text: {
    title: string
    avatar: string
    name: string
    username: string
  }
}) {
  return (
    <SettingGroup title={title}>
      <SettingItem title={avatar}>
        <AvatarEditor defaultAvatar={group.avatar} onAvatarChange={onAvatarChange} />
      </SettingItem>
      <SettingItem title={username}>
        <UsernameHelper username={group.username} />
      </SettingItem>
      <SettingItem className="flex-wrap" title={name}>
        <NameEditor defaultName={group.name || group.username} onNameChange={onNameChange} />
      </SettingItem>
    </SettingGroup>
  )
}

const showBtnCondition = ['loaded', 'error']
function AvatarEditor({
  defaultAvatar,
  onAvatarChange
}: {
  defaultAvatar: string
  onAvatarChange: (canvas: HTMLCanvasElement) => Promise<string>
}) {
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [loadingStatus, setLoadingStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('loading')
  const onAvatarCropped = async (canvas: HTMLCanvasElement) => {
    const newAvatar = await onAvatarChange(canvas)
    setAvatar(newAvatar)
  }
  return (
    <div className="flex justify-end flex-1 relative">
      <Avatar className="w-20 h-20">
        <AvatarImage src={avatar} onLoadingStatusChange={setLoadingStatus} />
        <AvatarFallback className="text-foreground opacity-40">CN</AvatarFallback>
      </Avatar>
      {showBtnCondition.includes(loadingStatus) && (
        <AvatarEditorWrapper onAvatarCropped={onAvatarCropped}>
          <Button className="absolute p-0 rounded-full h-8 w-8 -right-1 -bottom-1 bg-card" variant="ghost">
            <PencilRuler className="w-4 h-4 text-muted-foreground" />
          </Button>
        </AvatarEditorWrapper>
      )}
    </div>
  )
}

function UsernameHelper({ username }: { username: string }) {
  return (
    <div className="flex grow justify-end">
      <p className="text-base font-semibold relative flex w-[calc(100%-50px)]">
        <span className="text-right w-full truncate">{username}</span>
      </p>
    </div>
  )
}

function NameEditor({
  defaultName,
  onNameChange
}: {
  defaultName: string
  onNameChange: (name: string) => Promise<void>
}) {
  const [name, setName] = useState(defaultName)
  const [isEditing, setIsEditing] = useState(false)
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [cancelDisabled, setCancelDisabled] = useState(false)
  const [error, setError] = useState<undefined | string>('')
  const t = useTranslations('Dashboard._content.Settings._components.name')
  const nameSchema = useRef(
    z
      .string({ message: t('rules.type') })
      .min(1, { message: t('rules.length') })
      .max(30, { message: t('rules.length') })
  )
  const inputRef = useRef<HTMLInputElement>(null)
  if (isEditing) {
    const onSubmit = () => {
      const value = inputRef.current?.value as string
      const result = nameSchema.current.safeParse(value)
      if (result.success) {
        setError(undefined)
        setSaveDisabled(true)
        setCancelDisabled(true)
        onNameChange(value)
          .then(() => {
            setIsEditing(false)
            setName(value)
          })
          .finally(() => {
            setCancelDisabled(false)
          })
      } else {
        setError(result.error.errors[0].message)
        setSaveDisabled(true)
      }
    }
    // 如果输入的值和原来的值相同，则禁用按钮
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.value === name) {
        setSaveDisabled(true)
      } else {
        setSaveDisabled(false)
      }
    }
    return (
      <div className="flex justify-end grow sm:items-center items-end gap-5 sm:gap-3 sm:flex-row flex-col sm:w-auto w-full shrink-0">
        <div className="relative sm:w-40 w-full">
          <Input className="w-full h-8" defaultValue={name} onChange={onChange} ref={inputRef} />
          {error && <p className="absolute text-xs text-destructive top-9 left-0 text-nowrap">{error}</p>}
        </div>
        <div className="flex h-8 justify-end gap-3">
          <Button className="h-full" disabled={saveDisabled} onClick={onSubmit}>
            {t('save')}
          </Button>
          <Button variant="outline" className="h-full" disabled={cancelDisabled} onClick={() => setIsEditing(false)}>
            {t('cancel')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-end flex-1 items-center">
      <p className="truncate text-base font-semibold w-[calc(100%-150px)] text-right absolute right-10">{name}</p>
      <Button
        variant="ghost"
        className="rounded-full w-8 h-8 p-0 flex items-center"
        onClick={() => {
          setIsEditing(true)
        }}
      >
        <SquarePen className="text-muted-foreground w-4 h-4" />
      </Button>
    </div>
  )
}
