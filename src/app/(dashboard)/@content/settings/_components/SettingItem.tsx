import { cn } from '@/lib/utils'
import React from 'react'

export default function SettingItem({
  children,
  className,
  title,
  description
}: LayoutProps & { title: string; description?: string | React.ReactNode; className?: string }) {
  return (
    <div className={cn('py-6 first:border-t-0 border-t w-full flex items-center gap-2 relative', className)}>
      <div className="flex flex-col justify-between">
        <p className="font-semibold text-base text-nowrap">{title}</p>
        {description && <span className="text-muted-foreground text-sm">{description}</span>}
      </div>
      {children}
    </div>
  )
}
