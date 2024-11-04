'use client'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useQueryState } from 'nuqs'
import { frameworks, TabKeys, tasks } from '@/app/(dashboard)/_components/quick-start-code/utils'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getIcon } from '@/app/(dashboard)/_components/quick-start-code/icons'

export function TabSidebar() {
  const tt = useTranslations('Dashboard._components.QuickStartCode.tabs')
  return (
    <div className="xl:max-w-44 max-w-40 w-full text-sm shrink-0 flex flex-col gap-1">
      <p className="text-muted-foreground pb-3">{tt('task')}</p>
      {tasks.map((task) => {
        return <SidebarItem key={task} tabName={task} />
      })}
      <p className="text-muted-foreground pb-3 pt-6">{tt('framework')}</p>
      {frameworks.map((framework) => {
        return <SidebarItem key={framework} tabName={framework} />
      })}
    </div>
  )
}

function SidebarItem({ tabName }: { tabName: TabKeys }) {
  const t = useTranslations('Dashboard._components.QuickStartCode.tabs')
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'introduction' })
  const router = useRouter()
  const handleClick = async () => {
    await setTab(tabName)
    router.refresh()
  }
  return (
    <Button
      variant="ghost"
      className={cn('w-full flex justify-between items-center gap-2 p-3', tab === tabName && 'bg-accent')}
      onClick={handleClick}
      title={t(tabName)}
    >
      <div className="shrink-0">{getIcon(tabName)}</div>
      <span className="w-full text-left">{t(tabName)}</span>
    </Button>
  )
}
