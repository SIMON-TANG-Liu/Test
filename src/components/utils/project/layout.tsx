import React from 'react'
import { cn } from '@/lib/utils'

// 项目网格布局
export function ProjectsGridLayout({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4', className)} {...props}>
      {children}
    </div>
  )
}

// 加载状态包装
export function LoadingWrapper({ loading, children }: LayoutProps & { loading: boolean }) {
  return (
    <div className="flex flex-col relative data-[loading]:cursor-wait" data-loading={loading ? '' : undefined}>
      <div
        className="flex flex-col data-[loading]:pointer-events-none data-[loading]:opacity-50"
        data-loading={loading ? '' : undefined}
      >
        {children}
      </div>
    </div>
  )
}
