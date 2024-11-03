import { useViewQuery } from '@/components/utils/project/hooks'
import { cn } from '@/lib/utils'
import { LayoutGrid, List } from 'lucide-react'
import React from 'react'

// 桌面端视图切换器
export function ProjectsViewSwitcher({ onChange }: { onChange?: (view: 'grid' | 'list') => void }) {
  const [view, setView] = useViewQuery()
  const changeView = async (view: 'grid' | 'list') => {
    await setView(view)
    onChange?.(view)
  }

  return (
    <div className="flex border rounded-lg px-2 items-center gap-1 h-10 bg-card [&_button]:opacity-70">
      <button
        className={cn('p-1.5 hover:opacity-100', view === 'grid' && 'bg-accent rounded')}
        onClick={() => changeView('grid')}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        className={cn('p-1.5 hover:opacity-100', view === 'list' && 'bg-accent rounded')}
        onClick={() => changeView('list')}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  )
}
