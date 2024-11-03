import SettingGroup from '@/app/(dashboard)/@content/settings/_components/SettingGroup'
import SettingItem from '@/app/(dashboard)/@content/settings/_components/SettingItem'
import { useTranslations } from 'next-intl'
import { getColorMode } from '@/lib/action/color'
import { getUserLocale } from '@/lib/action/locale'
import AppearanceSelector from '@/app/(dashboard)/@content/settings/@user/_components/AppearanceSelector'
import LocaleSelector from '@/app/(dashboard)/@content/settings/@user/_components/LocaleSelector'
import UserAccountSettings from '@/app/(dashboard)/@content/settings/@user/_components/UserAccountSettings'
import ApiKeyInput from '@/app/(dashboard)/@content/settings/@user/_components/ApiKeyInput'
import SignOutOption from '@/app/(dashboard)/@content/settings/@user/_components/SignOutOption'
import StorageStatistics from '@/app/(dashboard)/@content/settings/@user/_components/StorageStatistics'
import { ColorMode } from '@/types/color'
import { Locale } from '@/types/locale'

export default async function Settings() {
  const colorMode = await getColorMode()
  const locale = await getUserLocale()
  return (
    <div className="space-y-8">
      <GeneralSettings colorMode={colorMode} locale={locale} />
      <UserAccountSettings />
      <DevelopmentSettings />
      <SystemSettings />
    </div>
  )
}

function GeneralSettings({ colorMode, locale }: { colorMode: ColorMode; locale: Locale }) {
  const t = useTranslations('Dashboard._content.Settings._user.general')
  return (
    <SettingGroup title={t('title')}>
      <SettingItem title={t('appearance.title')} description={t('appearance.description')}>
        <AppearanceSelector defaultColor={colorMode} />
      </SettingItem>
      <SettingItem title={t('language.title')} description={t('language.description')}>
        <LocaleSelector defaultLocale={locale} />
      </SettingItem>
    </SettingGroup>
  )
}

function DevelopmentSettings() {
  const t = useTranslations('Dashboard._content.Settings._user.development')
  return (
    <SettingGroup title={t('title')}>
      <SettingItem
        className="flex-wrap justify-between gap-2"
        title={t('apiKey.title')}
        description={t('apiKey.description')}
      >
        <ApiKeyInput />
      </SettingItem>
      <SettingItem title={t('storage.title')}>
        <StorageStatistics />
      </SettingItem>
    </SettingGroup>
  )
}

function SystemSettings() {
  const t = useTranslations('Dashboard._content.Settings._user.system')
  return (
    <SettingGroup title={t('title')}>
      <SignOutOption />
    </SettingGroup>
  )
}
