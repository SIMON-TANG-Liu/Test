import { OnlyLogout } from '@/components/utils/auth'
import ContentLayout from '@/components/layouts/content'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AppHeader from '@/components/AppHeader'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth.Signup.Metadata')
  return {
    title: t('title'),
    description: t('description')
  }
}

export default function SignupLayout({ children }: LayoutProps) {
  return (
    <OnlyLogout rPathname={'/workspace'}>
      <AppHeader variant="signup" />
      <ContentLayout className="h-[calc(100dvh-52px)] max-w-[650px] w-full">
        <div className="flex flex-col justify-start h-full flex-1 pt-24">{children}</div>
      </ContentLayout>
    </OnlyLogout>
  )
}
