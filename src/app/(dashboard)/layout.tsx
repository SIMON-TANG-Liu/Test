import OnlyLogin from '@/components/utils/auth'
import React from 'react'
import WorkspaceProvider from '@/app/(dashboard)/_components/provider/workspace'
import SidebarProvider from '@/app/(dashboard)/_components/provider/sidebar'
import WorkspaceMobileSwitcher from '@/app/(dashboard)/_components/WorkspaceMobileSwitcher'

import DashboardSidebar from '@/app/(dashboard)/_components/DashboardSidebar'
import DashboardNavbar from '@/app/(dashboard)/_components/DashboardNavbar'

// 用户控制台，登录后出现，所以有侧边栏
// 本布局主要承担平行布局水合的作用
export default function DashboardLayout({ content, header }: { content: React.ReactNode; header?: React.ReactNode }) {
  return (
    <OnlyLogin rPathname="/login">
      <WorkspaceProvider>
        <SidebarProvider sidebar={<DashboardSidebar />}>
          <div className="flex-1 w-full md:pb-8 pb-16 h-full">
            <section className="overflow-hidden h-[52px] sticky top-0 md:pr-0 z-10">
              {header}
              <div className="absolute md:hidden h-full right-5 top-0 flex items-center">
                <WorkspaceMobileSwitcher />
              </div>
            </section>
            {content}
            <section className="border-t w-full fixed bottom-0 h-16 md:hidden block bg-card">
              <DashboardNavbar />
            </section>
          </div>
        </SidebarProvider>
      </WorkspaceProvider>
    </OnlyLogin>
  )
}
