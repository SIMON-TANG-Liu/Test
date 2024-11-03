'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Search } from 'lucide-react'
import { ProjectsDrawerWrapper, ProjectsSortSelector, usePageQuery, useSearchQuery } from '@/components/utils/project'

export default function BenchmarksHeader() {
  const [search, setSearch] = useSearchQuery()
  const setPage = usePageQuery()[1]
  const [value, setValue] = useState(search)
  const router = useRouter()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const refreshPage = useCallback(
    async (newValue?: string | null) => {
      await setSearch(newValue || value || null, { scroll: true })
      await setPage(null, { scroll: true })
      router.refresh()
    },
    [router, setSearch, value, setPage]
  )

  // 🔔 如果要支持输入即搜索，把下面注释去掉即可
  // 但是我觉得很抽象，所以先注释
  // useEffect(() => {
  //   refreshPage(value).then()
  // }, [value, refreshPage])

  return (
    <div className="h-9 sm:h-10 mt-6 sm:mt-8 mb-4 sm:mb-6">
      <div className="hidden sm:flex gap-3">
        <DesktopSearchInput value={value} onChange={onChange} refreshPage={refreshPage} />
        <ProjectsSortSelector onSortChange={() => router.refresh()} />
      </div>
      <div className="flex gap-3 sm:hidden h-full">
        <MobileSearchInput value={value} onChange={onChange} refreshPage={refreshPage} />
        <ProjectsDrawerWrapper onSet={() => refreshPage()}>
          <Button className="h-full py-0 " variant="outline">
            <MoreHorizontal />
          </Button>
        </ProjectsDrawerWrapper>
      </div>
    </div>
  )
}

function DesktopSearchInput({
  value,
  onChange,
  refreshPage
}: {
  value: string | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  refreshPage: () => void
}) {
  const t = useTranslations('Benchmarks._components.BenchmarksHeader')
  return (
    <div className="relative h-full w-full">
      <Input
        className="bg-card rounded-full text-center focus-visible:ring-1 focus-visible:ring-offset-0 px-24"
        placeholder={t('search.placeholder')}
        value={value || ''}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && refreshPage()}
      />
      <div className="h-full py-1.5 absolute right-3 top-0">
        <Button className="h-full rounded-full" onClick={() => refreshPage()}>
          <span>{t('search.btn')}</span>
        </Button>
      </div>
    </div>
  )
}

function MobileSearchInput({
  value,
  onChange,
  refreshPage
}: {
  value: string | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  refreshPage: () => void
}) {
  const t = useTranslations('Benchmarks._components.BenchmarksHeader')
  return (
    <div className="h-full w-full relative">
      <Input
        className="bg-card focus-visible:ring-1 focus-visible:ring-offset-0 h-full text-xs"
        placeholder={t('search.placeholder')}
        value={value || ''}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && refreshPage()}
      />
      <Button
        className="py-0 h-[calc(100%-2px)] rounded-l-none border-r-0 border-y-0 absolute top-[1px] right-[1px]"
        variant="outline"
        onClick={() => refreshPage()}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}
