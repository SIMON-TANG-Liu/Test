'use client'
import { useGroupContext } from '@/hooks/use-group'
import { useTranslations } from 'next-intl'
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  BookText,
  ChevronRight,
  Earth,
  ExternalLink,
  FileChartLine,
  Loader2,
  Search,
  Settings,
  SquareChartGantt,
  UserPen,
  Zap
} from 'lucide-react'
import { Benchmarks, ComingSoon, Github, SearchNoResults } from '@/components/utils/icons'
import React, { useEffect, useState } from 'react'
import { useSidebarContext } from '@/app/(dashboard)/_components/provider/sidebar'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useUserContext } from '@/hooks/use-user'
import PCWorkSpaceSwitcher from '@/app/(dashboard)/_components/WorkspaceDesktopSwitcher'
import { WorkspaceSwitcher } from '@/app/(dashboard)/_components/provider/workspace'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import ActiveLink from '@/components/ActiveLink'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useRequest } from 'ahooks'
import { SearchProject } from '@/types/projects'
import { ScrollArea } from '@/components/ui/scroll-area'
import { searchRelatedProjects } from '@/lib/api/project'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'

export default function DashboardSidebar() {
  const { user } = useUserContext()
  const { dataClosed, onOpen, onClose } = useSidebarContext()
  const { group } = useGroupContext()
  const quickStartHref = group.isUser ? '/quick-start' : '/quick-start?space=' + group.username

  return (
    <div className="w-full flex flex-col h-full">
      <div className="p-4 flex flex-col grow items-center">
        <div className="flex flex-col w-full grow">
          <div className={cn('flex justify-between w-full items-center h-12', 'relative')}>
            <PCWorkSpaceSwitcher />
            <SidebarNavIcon
              className="data-[closed]:absolute data-[closed]:-z-50 data-[closed]:opacity-0 transition-opacity duration-300 ml-2"
              icon={<ArrowLeftFromLine className="w-5 h-5" strokeWidth={1.5} />}
              data-closed={dataClosed}
              onClick={onClose}
            />
          </div>
          <SearchDialog />
          <WorkspaceSwitcher user={<UserNavs />} team={<TeamNavs />} />
          <div className="flex flex-col grow justify-end ">
            <div
              data-closed={dataClosed}
              className={cn(
                'flex gap-3 overflow-hidden',
                'data-[closed]:flex-col data-[closed]:items-start data-[closed]:pl-1'
              )}
            >
              <SidebarNavIcon
                className={'data-[closed]:flex hidden'}
                data-closed={dataClosed}
                onClick={onOpen}
                icon={<ArrowRightFromLine className="w-5 h-5" strokeWidth={1.5} />}
              />
              <Link href="https://github.com/SwanHubX/SwanLab" target="_blank">
                <SidebarNavIcon icon={<Github />} />
              </Link>
              <Link href="https://docs.swanlab.cn/" target="_blank">
                <SidebarNavIcon icon={<BookText strokeWidth={1.5} />} />
              </Link>
              <Link href={quickStartHref}>
                <SidebarNavIcon icon={<Zap strokeWidth={1.5} />} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t px-4 h-16 shrink-0 flex items-center gap-4 overflow-hidden justify-between">
        <Link href={'/settings'} className="inline-flex items-center gap-2 hover:bg-accent p-1 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-foreground opacity-40">CN</AvatarFallback>
          </Avatar>
          <div className="w-full text-secondary-foregroun flex  items-center gap-2">
            <p className="text-sm max-w-[100px] truncate data-[closed]:hidden" data-closed={dataClosed}>
              {user.username}
            </p>
            <ChevronRight className="w-4 h-4 data-[closed]:hidden" data-closed={dataClosed} />
          </div>
        </Link>
        <Link href="/settings" className="data-[closed]:hidden" data-closed={dataClosed}>
          <Button variant="ghost" className="h-8 w-8 p-2 rounded-full">
            <Settings className="text-secondary-foreground" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

// 个人导航
function UserNavs() {
  const { group } = useGroupContext()
  const t = useTranslations('Dashboard._components.DashboardSidebar.navs.user')
  const navs = [
    { href: '/workspace', pathname: '/workspace', text: t('workspace'), icon: <SquareChartGantt /> },
    {
      href: '/settings',
      pathname: '/settings',
      text: t('settings'),
      icon: <Settings />,
      hidden: group.role !== 'OWNER'
    },
    { href: '/benchmarks', pathname: '/benchmarks', text: t('benchmarks'), icon: <Benchmarks /> }
  ]
  return <NavsWrapper navs={navs} />
}

// 组织导航
function TeamNavs() {
  const t = useTranslations('Dashboard._components.DashboardSidebar.navs.team')
  const { group } = useGroupContext()
  const username = group.username
  const navs = [
    { href: '/workspace?space=' + username, pathname: '/workspace', text: t('workspace'), icon: <Earth /> },
    {
      href: '/settings?space=' + username,
      pathname: '/settings',
      text: t('settings'),
      icon: <UserPen />,
      hidden: group.role !== 'OWNER'
    },
    { href: '/@' + username, pathname: '/@' + username, text: t('team'), icon: <ExternalLink /> },
    { href: '/benchmarks', pathname: '/benchmarks', text: t('benchmarks'), icon: <Benchmarks /> }
  ]
  return <NavsWrapper navs={navs} />
}

function NavsWrapper({
  navs
}: {
  navs: { href: string; text: string; icon: React.ReactNode; pathname: string; hidden?: boolean }[]
}) {
  const { isClosed } = useSidebarContext()
  const pathname = usePathname()
  const [nowNavIndex, setNowNavIndex] = React.useState<number>(0)
  // 计算当前导航索引
  useEffect(() => {
    if (pathname === '/quick-start') return setNowNavIndex(-1)
    setNowNavIndex(navs.findIndex((nav) => nav.pathname === pathname))
  }, [pathname, navs])
  return (
    <div className="flex flex-col mt-4 relative">
      {navs
        .filter((n) => !n.hidden)
        .map((nav) => (
          <SidebarNavLink key={nav.href} href={nav.href} text={nav.text} icon={nav.icon} />
        ))}
      {isClosed && nowNavIndex !== -1 && (
        <span
          className={cn('absolute h-10 bg-foreground w-[3px] -right-4 rounded-l-full opacity-70', 'transition-[top]')}
          style={{ top: `calc(${(nowNavIndex / navs.length) * 100}% + 2px)` }}
        />
      )}
    </div>
  )
}

interface SidebarNavLinkProps {
  href: string
  icon: React.ReactNode
  text: string
  dataClosed?: string
}

// pc状态下的侧边栏导航链接
function SidebarNavLink({ href, icon, text }: SidebarNavLinkProps) {
  const { dataClosed } = useSidebarContext()
  return (
    <ActiveLink
      href={href}
      activeClassName="!opacity-100"
      className="flex p-3 rounded items-center gap-3 h-11 hover:bg-accent opacity-65 font-medium text-foreground"
      data-closed={dataClosed}
    >
      <div className="w-5 h-5 shrink-0">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-full h-full' })}
      </div>
      <p
        className="data-[closed]:opacity-0 w-[calc(100%-1.25rem)] truncate transition-opacity duration-300"
        data-closed={dataClosed}
      >
        {text}
      </p>
    </ActiveLink>
  )
}

interface SidebarNavIconProps {
  icon: React.ReactNode
  className?: string
  onClick?: () => void
}

// pc状态下的侧边栏导航图标
function SidebarNavIcon({ icon, className, onClick, ...props }: SidebarNavIconProps) {
  return (
    <Button
      variant="ghost"
      className={cn('p-2 rounded-full h-10 w-10 shrink-0 [&_svg]:size-5', className)}
      onClick={onClick}
      {...props}
    >
      <span className="w-full h-full flex items-center justify-center text-muted-foreground">{icon}</span>
    </Button>
  )
}

// 搜索实验弹窗
function SearchDialog() {
  const { dataClosed } = useSidebarContext()
  const t = useTranslations('Dashboard._components.DashboardSidebar.search')
  const { setSearchValue, projectList, loading, debounceLoading, empty, init } = useSearch()
  // 是否正在处于拼写状态
  const [composition, setComposition] = useState(false)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!composition) setSearchValue(e.target.value)
  }
  // input 搜索框的 onCompositionStart 事件
  const onCompositionStart = () => setComposition(true)
  // input 搜索框的 onCompositionEnd 事件
  const onCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setComposition(false)
    setSearchValue((e.target as HTMLInputElement).value)
  }

  const inputIcon = debounceLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Search className="w-4 h-4" />
  const content = empty ? <NoProjects empty={empty} /> : <ProjectList projectList={projectList} />

  return (
    <Dialog onOpenChange={init}>
      <DialogTrigger asChild className="mt-4 w-full">
        <Button
          variant="outline"
          className={cn(
            'h-10 py-3 px-3.5 w-full border-transparent justify-start flex rounded',
            'hover:border-green-600 dark:hover:border-green-900 bg-accent'
          )}
        >
          <Search className="w-4 h-4 shrink-0" />
          <p
            className={cn(
              'w-[calc(100%-1rem)] pl-3 truncate text-sm text-foreground transition-opacity',
              'data-[closed]:opacity-0 opacity-40 text-left'
            )}
            data-closed={dataClosed}
          >
            {t('placeholder')}
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 py-1 text-sm">
        <Command>
          <DialogHeader>
            <DialogTitle className="flex items-center border-b px-3 gap-2 text-base font-normal">
              {inputIcon}
              <input
                className="w-full py-3 pr-6 focus-visible:outline-0 bg-card text-sm"
                placeholder={t('placeholder')}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onInput={handleInput}
              />
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <ScrollArea className={cn('h-96 transition-all', loading && 'blur-sm pointer-events-none')}>
            {content}
          </ScrollArea>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function NoProjects({ empty }: { empty: 'noResult' | 'noSearch' }) {
  const t = useTranslations('Dashboard._components.DashboardSidebar.search')
  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      {empty === 'noResult' ? <SearchNoResults className="w-24 h-24" /> : <ComingSoon className="w-24 h-24" />}
      {t(empty)}
    </div>
  )
}

function ProjectList({ projectList }: { projectList: SearchProject[] }) {
  const t = useTranslations('Dashboard._components.DashboardSidebar.search')
  return (
    <CommandList className="max-h-full">
      <p className="px-3 pt-2 pb-1 text-xs">{t('recent')}</p>
      <CommandGroup>
        {projectList.map((p) => (
          <ProjectListItem key={p.cuid} project={p} />
        ))}
      </CommandGroup>
    </CommandList>
  )
}

function ProjectListItem({ project }: { project: SearchProject }) {
  const target = `/@${project.group.username}/${project.name}`
  const router = useRouter()
  const select = (value: string) => router.push(value)
  return (
    <CommandItem
      asChild
      key={project.cuid}
      value={target}
      onSelect={select}
      className="flex items-center p-2 gap-2 cursor-pointer"
    >
      <Link href={target}>
        <FileChartLine className="shrink-0 w-4 h-4" />
        <span className="truncate">{project.name}</span>
      </Link>
    </CommandItem>
  )
}

const useSearch = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [projectList, setProjectList] = useState<SearchProject[]>([])
  const [loading, setLoading] = useState(false)
  // 三个状态：没有搜索内容、没有搜索结果、不为空
  // 为了避免图标的闪烁, 不用 searchValue 作判断是否没有搜索内容的依据
  const [empty, setEmpty] = useState<'noResult' | 'noSearch' | null>('noSearch')

  // 关闭弹窗后清理状态
  const init = (open: boolean) => {
    if (open) return
    setSearchValue(null)
    setProjectList([])
    setEmpty('noSearch')
    setLoading(false)
  }

  // 搜索相关项目
  const fetchProjects = async () => {
    if (!searchValue) {
      setEmpty('noSearch')
      return []
    }
    const list = await searchRelatedProjects(searchValue)
    setEmpty(list.length === 0 ? 'noResult' : null)
    return list
  }

  const { runAsync, loading: debounceLoading } = useRequest(fetchProjects, {
    manual: true,
    debounceWait: 200,
    loadingDelay: 300
  })
  useEffect(() => {
    setLoading(true)
    runAsync()
      .then((list) => setProjectList(list))
      .finally(() => setLoading(false))
  }, [searchValue, runAsync])

  return { init, setSearchValue, projectList, loading, debounceLoading, empty }
}
