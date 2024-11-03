'use client'
import { useTranslations } from 'next-intl'
import EnterPhoneNumber from '@/app/(auth)/_components/EnterPhoneNumber'
import VerificationCode from '@/app/(auth)/_components/VerificationCode'
import { useAuthContext } from '@/app/(auth)/_hooks/use-auth'
import { useLooseUserContext } from '@/hooks/use-user'
import { useRouter } from 'next/navigation'
import { assert } from '@/lib/client'
import { AuthUser } from '@/app/(auth)/_components/provider/auth'

export default function LoginPage() {
  const t = useTranslations('Auth.Login.Phone')
  const { status, setStatus, setUser } = useAuthContext()
  const userCtx = useLooseUserContext()
  assert(userCtx, 'userCtx is required when verifying code')
  const router = useRouter()

  const onVerified = async (user: AuthUser) => {
    if (user.verified) {
      await userCtx.reInit()
      router.replace('/workspace')
    } else {
      // 未注册，跳转到注册页面
      setUser(user)
      setStatus('signing')
      router.replace('/signup/profile')
    }
  }

  if (status === 'start') {
    return (
      <>
        <h1 className="text-3xl font-bold text-center">{t('title.start')}</h1>
        <div className="h-36 mt-5">
          <EnterPhoneNumber />
        </div>
      </>
    )
  }
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5">{t('title.verifying')}</h1>
      <div className="h-36 mt-5">
        <VerificationCode onVerified={onVerified} variant="login" />
      </div>
    </>
  )
}

// function EnterPhoneNumber() {}
