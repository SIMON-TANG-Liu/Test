'use client'
import { useAuthContext } from '@/app/(auth)/_hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

// 注册用户信息填写，如果没设置status=signing或status=verifying和phone，无法跳转本页面
export default function Layout({ children }: LayoutProps) {
  const checkState = useSignupChecker()
  const t = useTranslations('Auth.Signup.Profile')
  if (checkState !== 'done') return null
  return (
    <div className="border rounded-lg px-4 py-10 sm:px-20 sm-16 max-w-[600px] bg-card">
      <div className="flex flex-col">
        <h1 className="sm:text-4xl text-2xl font-semibold text-center">{t('title')}</h1>
        <p className="text-muted-foreground text-sm text-center mb-5 mt-4">{t('description')}</p>
        {children}
      </div>
    </div>
  )
}

function useSignupChecker() {
  const { status, phone } = useAuthContext()
  // idle: 未开始检查
  // redirect: 定向到注册页面
  // done: 检查完成
  const [checkState, setCheckState] = useState<'idle' | 'redirect' | 'done'>('idle')
  const router = useRouter()
  useEffect(() => {
    if (checkState !== 'idle') return
    if ((status === 'signing' || status === 'verifying') && phone) {
      setCheckState('done')
    } else {
      setCheckState('redirect')
      router.replace('/signup')
    }
  }, [status, phone, checkState, router])
  return checkState
}
