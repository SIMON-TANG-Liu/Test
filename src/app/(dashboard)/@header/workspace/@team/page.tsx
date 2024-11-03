import { getTranslations } from 'next-intl/server'

export default async function WorkspaceHeader() {
  const t = await getTranslations('Dashboard._header.Workspace._team')
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
