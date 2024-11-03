'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { useTranslations } from 'next-intl'
import { useUserContext } from '@/hooks/use-user'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Check, PlusCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useWorkspaceContext } from '@/app/(dashboard)/_components/provider/workspace'
import { useGroupContext } from '@/hooks/use-group'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserGroup } from '@/types/user'

export default function WorkspaceMobileSwitcher() {
  const { group } = useGroupContext()
  const {
    user: { groups }
  } = useUserContext()
  const [value, setValue] = useState(group.username)
  const t = useTranslations('Dashboard._components.WorkspaceMobileSwitcher')
  const users = useRef(groups.filter((group) => group.isUser))
  const teams = useRef(groups.filter((group) => !group.isUser))
  const { setWorkspace } = useWorkspaceContext()
  const WorkspaceItem = ({ group }: { group: UserGroup }) => {
    return (
      <DrawerClose className="flex w-full text-left">
        <CommandItem
          className={cn(
            'py-2 cursor-pointer data-[selected="true"]:bg-gray-50 w-full',
            value === group.username && 'bg-accent'
          )}
          key={group.username}
          value={group.username}
          onSelect={(currentValue) => {
            if (currentValue !== value) setWorkspace(currentValue)
            setValue(currentValue === value ? '' : currentValue)
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
      </DrawerClose>
    )
  }
  useEffect(() => {
    if (value !== group.username) {
      setValue(group.username)
    }
  }, [value, group])
  return (
    <Drawer snapPoints={[]} fadeFromIndex={0}>
      <DrawerTrigger className="w-8 h-8 ring-ring hover:ring-1 rounded-full">
        <Avatar className="w-full h-full rounded-full border">
          <AvatarImage src={group.avatar} />
          <AvatarFallback className="text-foreground opacity-40">CN</AvatarFallback>
        </Avatar>
      </DrawerTrigger>
      <DrawerContent className="h-[90%] bg-card">
        <DrawerHeader>
          <DrawerTitle className="text-left">{t('title')}</DrawerTitle>
          <DrawerDescription className="text-left">{t('description')}</DrawerDescription>
        </DrawerHeader>
        <Command className="flex flex-col overflow-y-auto h-2/3 bg-transparent pb-4">
          <CommandInput placeholder={t('search.placeholder')} />
          <CommandList className="h-full max-h-none">
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
            <CreateButton />
          </CommandList>
        </Command>
      </DrawerContent>
    </Drawer>
  )
}

function CreateButton() {
  const t = useTranslations('Dashboard._components.WorkspaceMobileSwitcher')
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
