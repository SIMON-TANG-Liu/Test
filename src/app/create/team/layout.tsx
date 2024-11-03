import { useTranslations } from 'next-intl'

export default function TeamLayout({ children }: LayoutProps) {
  const t = useTranslations('Create.Team')
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="font-semibold text-3xl">{t('title')}</h1>
      <p className="text-muted-foreground text-lg text-center">{t('description')}</p>
      <div className="w-full">{children}</div>
    </div>
  )
}
