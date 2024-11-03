'use client'
import HeaderLayout from '@/app/(dashboard)/@header/_components/HeaderLayout'
import React from 'react'

export default function WorkspaceHeader({ user, team }: { user: React.ReactNode; team: React.ReactNode }) {
  return <HeaderLayout user={user} team={team} />
}
