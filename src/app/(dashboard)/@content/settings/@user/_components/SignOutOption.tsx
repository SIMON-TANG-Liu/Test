'use client'
import { useUserContext } from '@/hooks/use-user'
import { useTranslations } from 'next-intl'
import SettingItem from '@/app/(dashboard)/@content/settings/_components/SettingItem'
import { Button } from '@/components/ui/button'
import http from '@/lib/ajax'
import { useRouter } from 'next/navigation'

export default function SignOutOption() {
  const { user, signOut } = useUserContext()
  const router = useRouter()
  const t = useTranslations('Dashboard._content.Settings._user.system.signOut')
  const Tip = () =>
    t.rich('description', {
      username: user.username,
      user: (chunks) => {
        return <span className="font-semibold">{chunks}</span>
      }
    })
  const handleSignOut = async () => {
    await http.delete('/sign_out')
    signOut()
    router.replace('/', { scroll: true })
  }
  return (
    <SettingItem title={t('title')} description={<Tip />}>
      <div className="flex justify-end grow">
        <Button variant="secondary" className="font-semibold" onClick={handleSignOut}>
          {t('btn')}
        </Button>
      </div>
    </SettingItem>
  )
}
