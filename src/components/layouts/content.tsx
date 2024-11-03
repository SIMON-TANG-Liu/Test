// 内容区域统一布局
import React from 'react'
import { cn } from '@/lib/utils'

export default function ContentLayout({
  children,
  className,
  subClassName
}: LayoutProps & { className?: string; subClassName?: string }) {
  return (
    <div className={cn('py-8 w-full mx-auto h-full max-w-screen-xl', className)}>
      <div className={cn('px-5 h-full md:px-10', subClassName)}>{children}</div>
    </div>
  )
}
