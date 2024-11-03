import React from 'react'

export default function SettingGroup({
  children,
  title
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="mb-3 font-semibold text-base">{title}</h2>
      <div className="w-full bg-card border rounded-md overflow-hidden px-6">{children}</div>
    </div>
  )
}
