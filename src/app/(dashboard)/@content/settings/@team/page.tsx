import TeamAccountSettings from '@/app/(dashboard)/@content/settings/@team/_components/TeamAccountSettings'
import SettingGroup from '@/app/(dashboard)/@content/settings/_components/SettingGroup'
import { useTranslations } from 'next-intl'
import SettingItem from '@/app/(dashboard)/@content/settings/_components/SettingItem'
import StorageStatistics from '@/app/(dashboard)/@content/settings/@user/_components/StorageStatistics'
import DeleteTeamButton from '@/app/(dashboard)/@content/settings/@team/_components/DeleteTeamButton'
import React from 'react'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import InviteMemberButton from '@/app/(dashboard)/@content/settings/@team/_components/InviteMemberButton'
import SettingTabsTrigger from '@/app/(dashboard)/@content/settings/@team/_components/SettingTabsTrigger'
import TeamMemberSettings from '@/app/(dashboard)/@content/settings/@team/_components/TeamMemberSettings'
import TeamApplicantSetting from '@/app/(dashboard)/@content/settings/@team/_components/TeamApplicantSetting'

export default function Page() {
  return (
    <div className="space-y-8">
      <TeamAccountSettings />
      <MemberSettings />
      <DevelopmentSettings />
      <SystemSettings />
    </div>
  )
}

function MemberSettings() {
  const t = useTranslations('Dashboard._content.Settings._team.member')
  return (
    <div>
      <h2 className="mb-3 font-semibold text-base">{t('title')}</h2>
      <Tabs defaultValue="members">
        <header className="flex justify-between pb-2">
          <TabsList className="bg-transparent">
            <SettingTabsTrigger value="members">{t('membersTab.title')}</SettingTabsTrigger>
            <SettingTabsTrigger value="applicants">{t('applicationsTab.title')}</SettingTabsTrigger>
          </TabsList>
          <InviteMemberButton />
        </header>
        <TabsContent value="members" className="px-6 py-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <TeamMemberSettings />
        </TabsContent>
        <TabsContent value="applicants" className="px-6 py-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <TeamApplicantSetting />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DevelopmentSettings() {
  const t = useTranslations('Dashboard._content.Settings._team.development')
  return (
    <SettingGroup title={t('title')}>
      <SettingItem title={t('storage.title')}>
        <StorageStatistics />
      </SettingItem>
    </SettingGroup>
  )
}

function SystemSettings() {
  const t = useTranslations('Dashboard._content.Settings._team.system')
  return (
    <SettingGroup title={t('title')}>
      <SettingItem title={t('delete.title')} description={t('delete.description')} className="justify-between">
        <DeleteTeamButton />
      </SettingItem>
    </SettingGroup>
  )
}
