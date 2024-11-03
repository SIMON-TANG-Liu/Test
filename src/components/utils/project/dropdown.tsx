'use client'
// 查询下拉框
import { Check, LayoutGrid, List, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { projectSorts } from '@/components/utils/project/searchParams'
import React from 'react'
import { cn } from '@/lib/utils'
import { useSortQuery, useViewQuery } from '@/components/utils/project/hooks'
import { useTranslations } from 'next-intl'

export function ProjectsDropdown({
  className = '',
  contentClassName
}: {
  className?: string
  contentClassName?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn('hidden sm:flex lg:hidden bg-card', className)}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cn('relative w-[212px]', contentClassName)}>
        <SortDropdownItems />
        <DropdownMenuSeparator />
        <ViewDropdownItems />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SortDropdownItems() {
  const [sort, setSort] = useSortQuery()
  const st = useTranslations('components.utils.project.sorter')

  return (
    <>
      {projectSorts.map((s) => (
        <DropdownItem key={s} onClick={() => setSort(s)} checked={s === sort}>
          <span>{st(s)}</span>
        </DropdownItem>
      ))}
    </>
  )
}

function ViewDropdownItems() {
  const [view, setView] = useViewQuery()
  const vt = useTranslations('components.utils.project.viewer')

  return (
    <>
      <DropdownItem onClick={() => setView('grid')} checked={view === 'grid'}>
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4" />
          <span>{vt('grid')}</span>
        </div>
      </DropdownItem>
      <DropdownItem onClick={() => setView('list')} checked={view === 'list'}>
        <div className="flex items-center gap-2">
          <List className="w-4 h-4" />
          <span>{vt('list')}</span>
        </div>
      </DropdownItem>
    </>
  )
}

function DropdownItem({
  children,
  onClick,
  checked
}: {
  children: React.ReactNode
  onClick: () => void
  checked: boolean
}) {
  return (
    <DropdownMenuItem className="py-2 w-full flex justify-between" onClick={onClick}>
      {children}
      <Check className={cn('w-4 h-4 ml-2 opacity-0', checked && 'opacity-100')} />
    </DropdownMenuItem>
  )
}
