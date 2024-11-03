import { Check, ChevronDown, PlusCircle } from 'lucide-react'
import { useUserContext } from '@/hooks/use-user'
import { useSidebarContext } from '@/app/(dashboard)/_components/provider/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useWorkspaceContext } from '@/app/(dashboard)/_components/provider/workspace'
import { useGroupContext } from '@/hooks/use-group'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserGroup } from '@/types/user'

// 工作区切换器
export default function WorkspaceDesktopSwitcher() {
  const { group: nowGroup } = useGroupContext()
  const { dataClosed } = useSidebarContext()
  return (
    <DesktopSwitcherWrapper>
      <button
        className={cn('p-1 hover:bg-accent rounded flex w-full', 'max-w-[max(calc(100%-3rem),3rem)]')}
        data-closed={dataClosed}
      >
        <Avatar className="w-10 h-10 rounded">
          <AvatarImage src={nowGroup.avatar} />
          <AvatarFallback className="text-foreground opacity-40">CN</AvatarFallback>
        </Avatar>
        <div
          className="w-[calc(100%-2.5rem)] h-10 pl-2 flex items-center data-[closed]:w-full"
          data-closed={dataClosed}
        >
          <div
            className={cn(
              'w-[calc(100%-2rem)] flex flex-col text-left',
              'data-[closed]:opacity-0 transition-opacity duration-300'
            )}
            data-closed={dataClosed}
          >
            <p className="w-full truncate font-bold leading-5">{nowGroup.username}</p>
            <p className="text-foreground text-sm opacity-40 truncate">{nowGroup.name || nowGroup.username}</p>
          </div>
          <div
            className={cn(
              'ml-4 w-4 flex justify-center items-center duration-300 rounded-full',
              'data-[closed]:bg-card data-[closed]:-translate-x-8 data-[closed]:translate-y-[18px]',
              'data-[closed]:opacity-0 transition-[opacity,transform]'
            )}
            data-closed={dataClosed}
          >
            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
          </div>
        </div>
      </button>
    </DesktopSwitcherWrapper>
  )
}

function DesktopSwitcherWrapper({ children }: LayoutProps) {
  const [open, setOpen] = useState(false)
  const {
    user: { groups }
  } = useUserContext()
  const { group } = useGroupContext()
  const [value, setValue] = useState(group.username)
  const users = useRef(groups.filter((group) => group.isUser))
  const teams = useRef(groups.filter((group) => !group.isUser))
  const { setWorkspace } = useWorkspaceContext()
  const WorkspaceItem = ({ group }: { group: UserGroup }) => {
    return (
      <CommandItem
        className={cn(
          'py-2 cursor-pointer data-[selected="true"]:bg-accent/60 rounded-md',
          value === group.username && 'bg-accent'
        )}
        key={group.username}
        value={group.username}
        onSelect={(currentValue) => {
          if (currentValue !== value) setWorkspace(currentValue)
          setValue(currentValue === value ? '' : currentValue)
          setOpen(false)
        }}
      >
        <div className="w-[calc(100%-1rem)] pr-2 flex items-center">
          <Avatar className="w-6 h-6 border">
            <AvatarImage src={group.avatar} />
            <AvatarFallback className="text-foreground opacity-40">{group.username[0]}</AvatarFallback>
          </Avatar>
          <p className="w-[calc(100%-1.5rem)] truncate pl-2 text-sm">
            {group.isUser ? t.rich('me', { username: group.username }) : group.username}
          </p>
        </div>
        <Check className={cn('h-4 w-4', value === group.username ? 'opacity-100' : 'opacity-0')} />
      </CommandItem>
    )
  }

  const t = useTranslations('Dashboard._components.WorkspaceDesktopSwitcher')
  useEffect(() => {
    if (value !== group.username) {
      setValue(group.username)
    }
  }, [value, group])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={open ? 'bg-accent' : ''} asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className=" w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder={t('search.placeholder')} />
          <CommandList className="max-h-72">
            <CommandEmpty>{t('search.noResult')}</CommandEmpty>
            <CommandGroup>
              <p className="text-sm px-2 py-1 text-muted-foreground">{t('groups.users')}</p>
              {users.current.map((group) => (
                <WorkspaceItem key={group.username} group={group} />
              ))}
            </CommandGroup>
            {teams.current.length > 0 && (
              <CommandGroup>
                <p className="text-sm px-2 py-1 text-muted-foreground">{t('groups.teams')}</p>
                {teams.current.map((group) => (
                  <WorkspaceItem key={group.username} group={group} />
                ))}
              </CommandGroup>
            )}
            {value && <CreateButton />}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function CreateButton() {
  const t = useTranslations('Dashboard._components.WorkspaceDesktopSwitcher')
  return (
    <div className="sticky bottom-0 p-1 bg-card">
      <Button className="w-full justify-start px-3.5 py-2 gap-4 hover:bg-accent/80" variant="ghost" asChild>
        <Link href="/create/team">
          <PlusCircle className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-normal">{t('create')}</span>
        </Link>
      </Button>
    </div>
  )
}
