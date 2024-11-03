import ContentLayout from '@/components/layouts/content'
import AppHeader from '@/components/AppHeader'
import { getTranslations } from 'next-intl/server'
import { Benchmarks } from '@/components/utils/icons'
import BenchmarksHeader from '@/app/benchmarks/_components/BenchmarksHeader'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Benchmarks.Metadata')
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords')
  }
}

// 基线社区布局，无侧边栏
export default async function BenchmarksLayout({ children }: LayoutProps) {
  const t = await getTranslations('Benchmarks')
  return (
    <>
      <AppHeader>
        <p className="font-semibold">{t('header.title')}</p>
      </AppHeader>
      <div className="min-h-[calc(100dvh-52px)] flex flex-col">
        <div className="flex flex-col sm:gap-4 gap-1 sm:items-center h-[120px] sm:h-[203px] justify-center px-5">
          <p className="items-center gap-2 font-semibold sm:flex hidden">
            <Benchmarks className="sm:w-6 sm:h-6 w-4 h-4" />
            <span className="sm:text-2xl">{t('title')}</span>
          </p>
          <h1 className="sm:text-center sm:text-3xl font-semibold">{t('slogan')}</h1>
          <p className="text-sm sm:text-lg font-normal text-muted-foreground sm:w-[460px] sm:text-center inline-flex">
            {t('description')}
          </p>
        </div>
        <div className="bg-card w-full border-t flex flex-col grow">
          <ContentLayout className="py-0">
            <BenchmarksHeader />
            {children}
          </ContentLayout>
        </div>
      </div>
    </>
  )
}
