'use client'

// 此为没有侧边栏时的header
import { Github, SwanLab } from '@/components/utils/icons'
import { useLooseUserContext } from '@/hooks/use-user'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React, { startTransition } from 'react'
import { BookText } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslations } from 'next-intl'
import { useLocale } from 'use-intl'
import { getUserLocale, setUserLocale } from '@/lib/action/locale'
import { cn } from '@/lib/utils'
import { Locale } from '@/types/locale'

export default function AppHeader({ children, variant }: LayoutProps & { variant?: 'default' | 'login' | 'signup' }) {
  let leftComponent: React.ReactNode = null
  variant = variant || 'default'
  switch (variant) {
    case 'default':
      leftComponent = <DefaultVariant />
      break
    case 'login':
      leftComponent = <LoginVariant />
      break
    case 'signup':
      leftComponent = <SignupVariant />
      break
    default:
      throw new Error('Invalid variant:', variant)
  }

  return (
    <header className="bg-card border-b h-[52px] flex items-center sm:px-10 py-2 px-5">
      <HeaderLogo />
      <div className="flex-grow flex">{children}</div>
      <div className="inline-flex justify-end gap-7 items-center h-[35px]">{leftComponent}</div>
    </header>
  )
}

function HeaderLogo() {
  const user = useLooseUserContext()?.user
  return (
    <Link href={user ? '/workspace' : '/'} className="mr-2">
      <SwanLab className="w-5 h-5" />
    </Link>
  )
}

function HeaderIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button variant="ghost" asChild className="rounded-full justify-center w-full p-1.5 [&_svg]:size-5">
      <Link href={href} target="_blank">
        {children}
      </Link>
    </Button>
  )
}

function DefaultVariant() {
  const user = useLooseUserContext()?.user
  const t = useTranslations('components.AppHeader.variant.default')
  const LoginOrUser = () => {
    if (!user) {
      return (
        <Button asChild className="h-8">
          <Link href="/login">{t('authBtn')}</Link>
        </Button>
      )
    }
    return (
      <Avatar className="h-7 w-7 shrink-0">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
    )
  }
  return (
    <>
      <div className="hidden items-center gap-7 *:h-[35px] *:w-[35px] sm:inline-flex shrink-0">
        <HeaderIcon href="https://github.com/SwanHubX/SwanLab">
          <Github />
        </HeaderIcon>
        <HeaderIcon href="https://docs.swanlab.cn">
          <BookText strokeWidth={1.5} />
        </HeaderIcon>
      </div>
      <LoginOrUser />
    </>
  )
}

function LoginVariant() {
  const t = useTranslations('components.AppHeader.variant.login')
  return (
    <div className="flex items-center gap-3 sm:gap-7">
      <LocaleSwitcher />
      <Link
        href="https://docs.swanlab.cn/zh/guide_cloud/community/online-support.html"
        target="_blank"
        className="text-muted-foreground text-sm w-[70px] text-center"
      >
        {t('contractUs')}
      </Link>
      <Button variant="outline" asChild className="bg-card h-8 w-[94px]">
        <Link href="/signup">{t('authBtn')}</Link>
      </Button>
    </div>
  )
}

function SignupVariant() {
  const t = useTranslations('components.AppHeader.variant.signup')
  return (
    <div className="flex items-center gap-3 sm:gap-7">
      <LocaleSwitcher />
      <Link
        href="https://docs.swanlab.cn/zh/guide_cloud/community/online-support.html"
        target="_blank"
        className="text-muted-foreground text-sm w-[70px] text-center"
      >
        {t('contractUs')}
      </Link>
      <Button variant="outline" asChild className="bg-card h-8 w-[94px]">
        <Link href="/login">{t('authBtn')}</Link>
      </Button>
    </div>
  )
}

function LocaleButton({ defaultLocale, text }: { defaultLocale: Locale; text: string }) {
  const locale = useLocale() as Locale
  return (
    <span
      className={cn(
        'scale-75 text-base absolute border rounded h-5 w-5 box-content leading-5 transition-all',
        'data-[inactive]:dark:border-foreground',
        'data-[inactive]:translate-x-1 data-[inactive]:translate-y-1 data-[inactive]:bg-card',
        'data-[active]:bg-foreground data-[active]:text-accent',
        'data-[active]:-translate-x-1 data-[active]:-translate-y-1',
        'data-[active]:border-transparent data-[active]:z-50'
      )}
      data-inactive={locale !== defaultLocale ? '' : undefined}
      data-active={locale === defaultLocale ? '' : undefined}
    >
      {text}
    </span>
  )
}

function LocaleSwitcher() {
  async function onChange() {
    const locale = (await getUserLocale()) as Locale
    // 如果有更多语言，需要更复杂的逻辑
    const newLocale = locale === 'zh' ? 'en' : 'zh'
    startTransition(() => {
      setUserLocale(newLocale)
    })
  }

  return (
    <Button variant="ghost" className="w-[30px] h-[30px]" onClick={onChange}>
      <LocaleButton defaultLocale="zh" text="中" />
      <LocaleButton defaultLocale="en" text="En" />
    </Button>
  )
}
