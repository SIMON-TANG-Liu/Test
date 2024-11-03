'use client'

import { useTranslations } from 'next-intl'
import { useGroupContext } from '@/hooks/use-group'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import http from '@/lib/ajax'
import { useUserContext } from '@/hooks/use-user'

export default function DeleteTeamButton() {
  const t = useTranslations('Dashboard._content.Settings._team.system.delete.dialog')
  const ctx = useGroupContext()
  const userCtx = useUserContext()
  const router = useRouter()
  const { toast } = useToast()
  const username = ctx.group.username
  const [isOpen, setIsOpen] = useState(false)
  // 删除团队
  async function deleteTeam(formData: FormData) {
    if (formData.get('username') === username) {
      await http.delete(`/group/${username}`).then((res) => {
        if (res.status === 204) {
          userCtx.removeGroup(username)
          router.push('/workspace')
          setIsOpen(false)
        } else {
          toast({ description: t('error'), variant: 'destructive' })
        }
      })
    } else {
      toast({ description: t('toast'), variant: 'destructive' })
    }
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          {t('trigger')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent asChild>
        <form action={deleteTeam}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <Input type="text" name="username" placeholder={username} />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} type="submit">
              {t('confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
