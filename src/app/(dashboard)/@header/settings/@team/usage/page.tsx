'use client'
import { useTranslations } from 'next-intl'
import { useGroupContext } from '@/hooks/use-group'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

export default function UsageHeader() {
  const t = useTranslations('Dashboard._header.Settings._team.Usage')
  const { username } = useGroupContext().group
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-2xl">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/settings?space=${username}`}>{t('setting')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{t('usage')}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
