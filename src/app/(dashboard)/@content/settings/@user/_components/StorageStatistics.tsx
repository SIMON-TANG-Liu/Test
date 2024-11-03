'use client'

import { useRequest } from 'ahooks'
import http from '@/lib/ajax'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useGroupContext } from '@/hooks/use-group'

export default function StorageStatistics() {
  const t = useTranslations('Dashboard._content.Settings._user.development.storage')
  const { group } = useGroupContext()
  const [usage, setUsage] = useState<string>()
  const { loading } = useRequest(
    async () => {
      const data = await http
        .get(`/group/${group.username}/usage`)
        .then((res): { byte: number; size: string } => res.data)
      setUsage(data.size)
    },
    { loadingDelay: 300 }
  )
  if (loading) {
    return <div className="flex grow justify-end">loading...</div>
  }
  return (
    <div className="flex grow justify-end gap-2 items-center text-sm">
      <span className="text-secondary-foreground">{usage}</span>
      <Link
        href={'/settings/usage?space=' + group.username}
        className="hover:underline underline-offset-2 text-green-600"
      >
        {t('link')}
      </Link>
    </div>
  )
}
