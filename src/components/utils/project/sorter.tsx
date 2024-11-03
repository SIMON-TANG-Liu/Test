'use client'
import { useTranslations } from 'next-intl'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Check, ChevronDown } from 'lucide-react'
import React from 'react'
import { useSortQuery } from '@/components/utils/project/hooks'
import { projectSorts } from '@/components/utils/project/searchParams'

// 桌面端排序选择器
export function ProjectsSortSelector({
  onSortChange
}: {
  onSortChange?: (sort: 'update' | 'create' | 'name') => void
}) {
  const [sort, setSort] = useSortQuery()
  const t = useTranslations('components.utils.project.sorter')
  const onChange = async (sort: 'update' | 'create' | 'name') => {
    await setSort(sort)
    onSortChange?.(sort)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between w-44 shrink-0 hover:opacity-90 bg-card">
          <span>{t(sort as 'update' | 'create' | 'name')}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0'" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc(100vw-70px)] sm:w-44">
        {projectSorts.map((item) => (
          <DropdownMenuItem key={item} onClick={() => onChange(item)}>
            <Check className={item === sort ? 'opacity-100' : 'opacity-0'} />
            {t(item)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
