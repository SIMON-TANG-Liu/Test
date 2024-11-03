'use client'

import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { UserRoundPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGroupContext } from '@/hooks/use-group'
import { useToast } from '@/hooks/use-toast'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import http from '@/lib/ajax'
import { copyTextToClipboard } from '@/lib/client'
import { useUserContext } from '@/hooks/use-user'

export default function InviteMemberButton() {
  const t = useTranslations('Dashboard._content.Settings._team.member.invite.dialog')
  const ctx = useGroupContext()
  const { user } = useUserContext()
  const { toast } = useToast()
  const host = `${window.location.protocol}//${window.location.host}`
  const prefix = `/group/${ctx.group.username}`
  const [invitation, setInvitation] = useState<string>()
  const { loading, run, cancel } = useRequest(
    async () => {
      const invitation = await http.get(`${prefix}/invitation`).then((res) => res.data)
      setInvitation(invitation.link)
    },
    { manual: true }
  )
  useEffect(() => {
    if (!ctx.group.isUser) run()
    return () => cancel()
  }, [run, ctx.group, cancel])

  const onCopy = (msg: string) => {
    if (host && invitation)
      copyTextToClipboard(msg)
        .then(() => {
          toast({ description: t('copy.success') })
        })
        .catch(() => {
          toast({ description: t('copy.failure'), variant: 'destructive' })
        })
  }

  return (
    <Dialog>
      {!loading && <DialogButton />}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <Label htmlFor="link">{t('link')}</Label>
        <div className="flex w-full items-center space-x-2 h-9">
          <Input
            value={host + invitation}
            readOnly
            type="url"
            id="link"
            placeholder={t('link')}
            className="h-full select-none cursor-pointer"
            onClick={() => onCopy(host + invitation)}
          />
          <Button
            type="button"
            onClick={() =>
              onCopy(
                t('copy.description', {
                  link: host + invitation,
                  groupname: ctx.group.username,
                  username: user.username
                })
              )
            }
            className="h-full"
          >
            {t('copy.title')}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogDescription>{t('tip')}</DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DialogButton() {
  const t = useTranslations('Dashboard._content.Settings._team.member.invite.dialog')
  return (
    <div className="flex items-center">
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 bg-card">
          <UserRoundPlus size={16} />
          <span className="sm:block hidden">{t('trigger')}</span>
        </Button>
      </DialogTrigger>
    </div>
  )
}
