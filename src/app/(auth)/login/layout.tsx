import ContentLayout from '@/components/layouts/content'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AppHeader from '@/components/AppHeader'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth.Login.Metadata')
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function LoginLayout({ children }: LayoutProps) {
  const t = await getTranslations('Auth.Login')
  return (
    <>
      <AppHeader variant="login" />
      <ContentLayout className="h-[calc(100dvh-52px-100px)] max-w-[400px]">
        <div className="flex flex-col justify-center h-full"> {children}</div>
      </ContentLayout>
      <div className="h-[100px] border-t flex items-center justify-center">
        <Link href={'/signup'} className="text-blue-600 hover:underline underline-offset-2">
          {t('goToSignup')}
        </Link>
      </div>
    </>
  )
}
