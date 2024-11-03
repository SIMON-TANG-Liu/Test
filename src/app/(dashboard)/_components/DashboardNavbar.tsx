'use client'
import React, { useEffect } from 'react'
import ActiveLink from '@/components/ActiveLink'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import ContentLayout from '@/components/layouts/content'
import { WorkspaceSwitcher } from '@/app/(dashboard)/_components/provider/workspace'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Earth, ExternalLink, MoreHorizontal, Settings, UserPen } from 'lucide-react'
import { useGroupContext } from '@/hooks/use-group'
import { Benchmarks } from '@/components/utils/icons'

export default function DashboardNavbar() {
  return (
    <ContentLayout className="py-0 w-full">
      <WorkspaceSwitcher user={<UserNavs />} team={<TeamNavs />} />
    </ContentLayout>
  )
}

interface NavbarNavLinkProps {
  href: string
  // 用作key
  pathname: string
  icon: React.ReactNode
  text: string
  hidden?: boolean
}

function NavbarNavLink({ href, icon, text, hidden }: NavbarNavLinkProps) {
  return (
    <div className="flex justify-center flex-1">
      <ActiveLink
        href={href}
        activeClassName="!opacity-100"
        className={cn(
          'flex flex-col items-center gap-1 opacity-65 font-medium text-foreground',
          'data-[hidden]:opacity-0 data-[hidden]:pointer-events-none'
        )}
        data-hidden={hidden ? '' : undefined}
      >
        <div className="w-5 h-5">{React.cloneElement(icon as React.ReactElement, { className: 'w-full h-full' })}</div>
        <span className="text-sm truncate">{text}</span>
      </ActiveLink>
    </div>
  )
}

function NavbarDrawerLink({ href, icon, text }: NavbarNavLinkProps) {
  return (
    <Link className="flex justify-start items-center gap-4 py-4 first:border-t-0 border-t" href={href}>
      <div className="w-5 h-5 opacity-65">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-full h-full ' })}
      </div>
      <span className="text-sm opacity-65 font-medium">{text}</span>
    </Link>
  )
}

function UserNavs() {
  const t = useTranslations('Dashboard._components.DashboardNavbar.navs.user')
  const { group } = useGroupContext()
  const navs: NavbarNavLinkProps[] = [
    { href: '/workspace', pathname: '/workspace', text: t('workspace'), icon: <Earth /> },
    {
      href: '/settings',
      pathname: '/settings',
      text: t('settings'),
      icon: <Settings />,
      hidden: group.role !== 'OWNER'
    },
    { href: '/benchmarks', pathname: '/benchmarks', text: t('Drawer.benchmarks'), icon: <Benchmarks /> }
  ]

  return <NavsWrapper navs={navs} />
}

function TeamNavs() {
  const t = useTranslations('Dashboard._components.DashboardNavbar.navs.team')
  const { group } = useGroupContext()
  const username = group.username
  const navs: NavbarNavLinkProps[] = [
    { href: '/workspace?space=' + username, pathname: '/workspace', text: t('workspace'), icon: <Earth /> },
    {
      href: '/settings?space=' + username,
      pathname: '/settings',
      text: t('settings'),
      icon: <UserPen />,
      hidden: group.role !== 'OWNER'
    },
    { href: '/@' + username, pathname: '/@' + username, text: t('Drawer.team'), icon: <ExternalLink /> },
    { href: '/benchmarks', pathname: '/benchmarks', text: t('Drawer.benchmarks'), icon: <Benchmarks /> }
  ]
  return <NavsWrapper navs={navs} />
}

function NavsWrapper({ navs, maxNavs }: { navs: NavbarNavLinkProps[]; maxNavs?: number }) {
  maxNavs = maxNavs || 3
  const t = useTranslations('Dashboard._components.DashboardNavbar')
  const drawers: NavbarNavLinkProps[] = []
  // 超过maxNavs的navs放入drawer，index的计算剔除hidden的nav
  navs = navs.filter((nav) => nav.hidden !== true)
  if (navs.length > maxNavs) {
    drawers.push(...navs.slice(maxNavs - 1))
    navs = navs.slice(0, maxNavs - 1)
  }
  const pathname = usePathname()
  const [nowNavIndex, setNowNavIndex] = React.useState<number>(0)
  // 计算当前导航索引
  useEffect(() => {
    if (pathname === '/quick-start') return setNowNavIndex(-1)
    setNowNavIndex(navs.findIndex((nav) => nav.pathname === pathname))
  }, [pathname, navs])
  return (
    <div className="flex w-full items-center h-full justify-between relative">
      {navs.map((nav) => (
        <NavbarNavLink
          key={nav.pathname}
          href={nav.href}
          pathname={nav.pathname}
          icon={nav.icon}
          text={nav.text}
          hidden={nav.hidden}
        />
      ))}
      {nowNavIndex !== -1 && (
        <span
          className="bg-foreground absolute w-1/3 h-[3px] top-0 rounded-b transition-[left] duration-300"
          style={{ left: `calc(${(nowNavIndex * 100) / 3}% + 1px)` }}
        />
      )}
      {drawers?.length > 0 && (
        <Drawer snapPoints={[]} fadeFromIndex={0}>
          <div className="flex flex-1 justify-center">
            <DrawerTrigger>
              <div className="flex flex-col items-center opacity-65 text-foreground">
                <MoreHorizontal className="w-5 h-5" />
                <span className="text-sm truncate font-medium">{t('drawer')}</span>
              </div>
            </DrawerTrigger>
          </div>
          <DrawerContent>
            {/*保留，否则报错*/}
            <DrawerHeader className="hidden">
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pb-14">
              {drawers.map((drawer) => (
                <NavbarDrawerLink
                  key={drawer.pathname}
                  href={drawer.href}
                  pathname={drawer.pathname}
                  icon={drawer.icon}
                  text={drawer.text}
                  hidden={drawer.hidden}
                />
              ))}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}
