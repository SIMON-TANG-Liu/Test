import { getTranslations } from 'next-intl/server'

export default async function SettingsHeader() {
  const t = await getTranslations('Dashboard._header.Settings._user')
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
