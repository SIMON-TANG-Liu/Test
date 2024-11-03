import React from 'react'
import HeaderLayout from '@/app/(dashboard)/@header/_components/HeaderLayout'

export default function SettingsHeader({ user, team }: { user: React.ReactNode; team: React.ReactNode }) {
  return <HeaderLayout user={user} team={team} />
}
