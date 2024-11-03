import { ErrorBoxes } from '@/components/utils/icons'
import AppHeader from '@/components/AppHeader'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NotFound.Metadata')
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function NotFound() {
  const tip = null
  const isLogin = false
  const t = await getTranslations('NotFound')
  // FIXME 这块存在一些问题，详见 https://github.com/SwanHubX/SwanLab-Core-App/issues/43

  // const user = await getUser()
  // const isLogin = !!user
  // if (user) {
  //   tip = t.rich('tip', {
  //     username: user.username,
  //     break: () => <br />,
  //     user: () => <span className="font-semibold text-sm">{user.username}</span>
  //   })
  // }

  return (
    <div className="flex flex-col gap-20">
      <AppHeader />
      <div className="flex flex-col items-center">
        <div className="flex justify-center w-full">
          <ErrorBoxes className="w-32" />
        </div>
        <h1 className="font-semibold text-2xl">{t('title')}</h1>
        <p className="text-muted-foreground mt-3 mb-6 max-w-56 text-center">{t('description')}</p>
        <BtnSwitcher isLogin={isLogin} />
        <p className="text-center mt-9 text-sm">{tip}</p>
      </div>
    </div>
  )
}

async function BtnSwitcher({ isLogin }: { isLogin: boolean }) {
  const t = await getTranslations('NotFound.btn')
  if (isLogin) {
    return (
      <Button asChild className="px-5 py-2 h-auto">
        <Link href="/workspace" replace>
          {t('isLogin')}
        </Link>
      </Button>
    )
  }
  return (
    <Button asChild className="px-5 py-2 h-auto">
      <Link href="/" replace>
        {t('isNotLogin')}
      </Link>
    </Button>
  )
}
