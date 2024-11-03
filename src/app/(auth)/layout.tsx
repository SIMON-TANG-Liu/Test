import AuthContextProvider from '@/app/(auth)/_components/provider/auth'
import { OnlyLogout } from '@/components/utils/auth'

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <AuthContextProvider>
      <OnlyLogout rPathname={'/workspace'}>{children}</OnlyLogout>
    </AuthContextProvider>
  )
}
