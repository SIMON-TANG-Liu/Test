import { useTranslations } from 'next-intl'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export default function UsageHeader() {
  const t = useTranslations('Dashboard._header.Settings._user.Usage')
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-2xl">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/settings`}>{t('setting')}</Link>
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
