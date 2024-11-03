'use client'
import { Applicant, ApplicantRes, ReviewReq } from '@/app/(dashboard)/@content/settings/@team/types'
import http from '@/lib/ajax'
import { useGroupContext } from '@/hooks/use-group'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { useRequest } from 'ahooks'
import AvatarWithInfo from '@/app/(dashboard)/@content/settings/@team/_components/AvatarWithInfo'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { AvatarWithInfoSkeleton } from '@/app/(dashboard)/@content/settings/@team/_components/AvatarWithInfoSkeleton'

export default function TeamApplicantSetting() {
  const { loading, applicants, actionMapForApplicant } = useApplicantManage()
  if (loading) return <AvatarWithInfoSkeleton />
  return <ApplicationDataTable applicants={applicants} actions={actionMapForApplicant} />
}

function useApplicantManage() {
  const { group } = useGroupContext()
  const t = useTranslations('Dashboard._content.Settings._team.member.applicationsTab')
  const { toast } = useToast()
  const prefix = `/group/${group.username}`
  const [applicants, setApplicants] = useState<Applicant[]>([])
  // 初始化请求
  const { loading, run, cancel } = useRequest(
    async () => {
      const applicants = await http.get(`${prefix}/waitlist`).then((res) => res.data)
      setApplicants(applicants.map((a: ApplicantRes) => a.user))
    },
    { manual: true, cacheKey: 'team-applicants' }
  )
  // 申请者操作
  const reviewApplicant = async (username: string, review: 'APPROVED' | 'REJECTED') => {
    const data: ReviewReq = { username, review }
    await http.patch(`${prefix}/review`, data).then(async (res) => {
      if (res.status === 204) {
        setApplicants(applicants.filter((a) => a.username !== username))
        toast({ description: t('actions.review.success') })
      } else {
        // TODO 错误提示优化
        toast({ description: t('actions.review.failure'), variant: 'destructive' })
      }
    })
  }
  const actionMapForApplicant = {
    review: reviewApplicant
  }
  useEffect(() => {
    if (!group.isUser) run()
    return () => cancel()
  }, [run, group, cancel])

  return { loading, applicants, actionMapForApplicant }
}

// 申请成员列表
function ApplicationDataTable({
  applicants,
  actions
}: {
  applicants: Applicant[]
  actions: {
    review: (username: string, review: 'APPROVED' | 'REJECTED') => void
  }
}) {
  const t = useTranslations('Dashboard._content.Settings._team.member.applicationsTab')
  if (applicants.length === 0) {
    return <p className="h-10 flex items-center text-sm text-foreground italic">{t('empty')}</p>
  }
  return (
    <ul className="flex flex-col gap-2">
      {applicants.map((applicant) => (
        <li key={applicant.username} className="flex items-center justify-between">
          <AvatarWithInfo user={applicant} />
          <div className="flex flex-row gap-2 items-center">
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => actions.review(applicant.username, 'APPROVED')}
            >
              <Check size={24} color="#5DB964" />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => actions.review(applicant.username, 'REJECTED')}
            >
              <X size={24} color="#FF5656" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
