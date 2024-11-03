'use client'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { MoreHorizontal, Plus, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  ProjectsDrawerWrapper,
  ProjectsDropdown,
  ProjectsSortSelector,
  ProjectsViewSwitcher,
  useSearchQuery
} from '@/components/utils/project'

export default function WorkspaceHeader() {
  const t = useTranslations('Dashboard._content.Workspace')
  const [search, setSearch] = useSearchQuery()
  const [value, setValue] = useState(search || '')
  // 是否正在处于拼写状态
  const [composition, setComposition] = useState(false)
  // input 搜索框的 onChange 事件
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    setValue(search)
    if (!composition) {
      setSearch(search || null).then(() => {})
    }
  }
  // input 搜索框的 onCompositionStart 事件
  const onCompositionStart = () => {
    setComposition(true)
  }
  // input 搜索框的 onCompositionEnd 事件
  const onCompositionEnd = () => {
    setComposition(false)
    setSearch(value || null).then(() => {})
  }
  return (
    <div className="flex justify-space-between items-center gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="w-full relative">
        <Input
          id="search"
          className="pl-10 focus-visible:ring-1 bg-card pr-8 sm:pr-3"
          placeholder={t('placeholder')}
          value={value}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          onChange={onChange}
        />
        <Search className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4" />
        <div className="flex sm:hidden absolute right-[1px] top-[1px] h-[38px]">
          <ProjectsDrawerWrapper>
            <Button className="h-full px-2" variant="ghost">
              <MoreHorizontal />
            </Button>
          </ProjectsDrawerWrapper>
        </div>
      </div>
      <ProjectsDropdown />
      <div className="hidden lg:flex gap-4">
        <ProjectsSortSelector />
        <ProjectsViewSwitcher />
      </div>
      <CreateProjectButton />
    </div>
  )
}

function CreateProjectButton() {
  const t = useTranslations('Dashboard._content.Workspace')
  return (
    <Link href="/create/project">
      <Button>
        <span className="hidden sm:inline-block">{t('create')}</span>
        <Plus />
      </Button>
    </Link>
  )
}
