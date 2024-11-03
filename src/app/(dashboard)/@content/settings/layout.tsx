import ContentLayout from '@/components/layouts/content'
import { OnlyOwner } from '@/components/utils/auth'
import React from 'react'
import { WorkspaceSwitcher } from '@/app/(dashboard)/_components/provider/workspace'

export default async function SettingsLayout({ team, user }: { team: React.ReactNode; user: React.ReactNode }) {
  return (
    <OnlyOwner rPathname="/workspace">
      <ContentLayout>
        <WorkspaceSwitcher user={user} team={team} />
      </ContentLayout>
    </OnlyOwner>
  )
}
