import { TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { cn } from '@/lib/utils'

export default function SettingTabsTrigger({ children, value }: LayoutProps & { value: string }) {
  return (
    <TabsTrigger
      className={cn(
        'relative h-9 rounded-none border-b-2 border-b-transparent px-0 pb-3 pt-2',
        'font-semibold text-muted-foreground shadow-none transition-none mr-3',
        'data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=inactive]:hover:opacity-70',
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:rounded-t-lg"
      )}
      value={value}
    >
      {children}
    </TabsTrigger>
  )
}
