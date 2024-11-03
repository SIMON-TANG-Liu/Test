import { OnlyLogout } from '@/components/utils/auth'
import AppHeader from '@/components/AppHeader'

// 首页，访客可见
export default function Home() {
  return (
    <OnlyLogout rPathname="/workspace">
      <AppHeader />
    </OnlyLogout>
  )
}
