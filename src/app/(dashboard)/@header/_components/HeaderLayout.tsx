'use client'
import React from 'react'
import ContentLayout from '@/components/layouts/content'

import { useGroupContext } from '@/hooks/use-group'

export default function HeaderLayout({ user, team }: { user: React.ReactNode; team: React.ReactNode }) {
  const { group: nowGroup } = useGroupContext()
  return (
    <header className="border-b h-full pr-20 md:pr-0">
      <ContentLayout
        className="py-0 flex items-center text-xl md:text-2xl font-semibold text-secondary-foreground"
        subClassName="h-auto"
      >
        {nowGroup.isUser ? user : team}
      </ContentLayout>
      {/*sidebar采用box-content，所以会有多余border被挤出，此处需要将多余border重新显示，同时不改变原本宽度*/}
      <span className="w-full h-full absolute bg-card top-0 -z-10 md:border-l"> </span>
    </header>
  )
}
