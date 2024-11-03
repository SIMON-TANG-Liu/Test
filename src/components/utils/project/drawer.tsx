'use client'
import { useSortQuery, useViewQuery } from '@/components/utils/project/hooks'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Check, LayoutGrid, List } from 'lucide-react'
import { projectSorts } from '@/components/utils/project/searchParams'
import React from 'react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { ProjectsSort, ProjectsView } from '@/types/projects'

export function ProjectsDrawerWrapper({
  children,
  onSet
}: {
  children: React.ReactNode
  onSet?: (e: DrawerSortEvent | DrawerViewEvent) => void
}) {
  return (
    <Drawer snapPoints={[]} fadeFromIndex={0}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        {/*保留，否则报错*/}
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pb-14">
          <SortDrawerItems onSet={onSet} />
          <hr />
          <ViewDrawerItems onSet={onSet} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface DrawerEvent {
  type: 'sort' | 'view'
  value: string
}

interface DrawerSortEvent extends DrawerEvent {
  type: 'sort'
  value: ProjectsSort
}

interface DrawerViewEvent extends DrawerEvent {
  type: 'view'
  value: ProjectsView
}

function SortDrawerItems({ onSet }: { onSet?: (e: DrawerSortEvent) => void }) {
  const [sort, setSort] = useSortQuery()
  const st = useTranslations('components.utils.project.sorter')
  const handleSort = async (s: ProjectsSort) => {
    await setSort(s)
    onSet?.({ type: 'sort', value: s })
  }

  return (
    <>
      {projectSorts.map((s) => (
        <DrawerItem key={s} onClick={() => handleSort(s)} checked={s === sort}>
          <span>{st(s)}</span>
        </DrawerItem>
      ))}
    </>
  )
}

function ViewDrawerItems({ onSet }: { onSet?: (e: DrawerViewEvent) => void }) {
  const [view, setView] = useViewQuery()
  const vt = useTranslations('components.utils.project.viewer')
  const handleView = async (v: ProjectsView) => {
    await setView(v)
    onSet?.({ type: 'view', value: v })
  }

  return (
    <>
      <DrawerItem onClick={() => handleView('grid')} checked={view === 'grid'}>
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4" />
          <span>{vt('grid')}</span>
        </div>
      </DrawerItem>
      <DrawerItem onClick={() => handleView('list')} checked={view === 'list'}>
        <div className="flex items-center gap-2">
          <List className="w-4 h-4" />
          <span>{vt('list')}</span>
        </div>
      </DrawerItem>
    </>
  )
}

function DrawerItem({
  children,
  onClick,
  checked
}: {
  children: React.ReactNode
  onClick: () => void
  checked: boolean
}) {
  return (
    <DrawerClose asChild>
      <button className="py-2.5 hover:bg-secondary rounded px-2 flex justify-between items-center" onClick={onClick}>
        {children}
        <Check className={cn('w-4 h-4 opacity-0', checked && 'opacity-100')} />
      </button>
    </DrawerClose>
  )
}
