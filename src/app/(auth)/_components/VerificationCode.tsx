import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useRequest } from 'ahooks'
import http from '@/lib/ajax'
import { useAuthContext } from '@/app/(auth)/_hooks/use-auth'
import { useTranslations } from 'next-intl'
import { Info, Loader2 } from 'lucide-react'
import { AuthUser } from '@/app/(auth)/_components/provider/auth'

// 验证码输入组件，不会处理验证成功后的跳转逻辑
export default function VerificationCode({
  onVerified,
  variant
}: {
  onVerified: (user: AuthUser) => void
  variant?: 'login' | 'signup'
}) {
  variant = variant || 'login'
  const [value, setValue] = useState('')
  const t = useTranslations('Auth._components.VerificationCode')
  const { state } = useCodeRequest(value, onVerified)
  const { setStatus } = useAuthContext()
  const verifyTip = variant === 'login' ? <VerifyLoginTip /> : <VerifySignupTip />
  return (
    <div className={variant === 'signup' ? 'space-y-8' : 'space-y-4'}>
      <p className="text-center text-sm flex items-center justify-center gap-2">
        {state === 'loading' ? <VerifyingTip /> : verifyTip}
      </p>
      <div className={variant === 'signup' ? 'flex justify-center' : ''}>
        <InputOTP maxLength={6} value={value} onChange={setValue} autoFocus>
          <InputOTPGroup
            className={cn(
              'w-full data-[default]:justify-between *:data-[default]:border *:data-[default]:rounded-md',
              'data-[loading]:pointer-events-none data-[loading]:opacity-35',
              '*:data-[error]:border-destructive *:data-[error]:ring-destructive'
            )}
            data-default={variant === 'login' ? '' : undefined}
            data-compacted={variant === 'signup' ? '' : undefined}
            data-loading={state === 'loading' ? '' : undefined}
            data-error={state === 'error' ? '' : undefined}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="sm:data-[compacted]:w-16 sm:data-[compacted]:h-16"
                data-compacted={variant === 'signup' ? '' : undefined}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      {state === 'error' && <ErrorTip />}
      <div className="flex flex-1 flex-col justify-end items-center">
        <button className="text-center text-blue-600" onClick={() => setStatus('start')}>
          ← {t('back')}
        </button>
      </div>
    </div>
  )
}

function VerifyLoginTip() {
  const { phone } = useAuthContext()
  const t = useTranslations('Auth._components.VerificationCode.verifyTip')
  return t.rich('login', {
    phone,
    bold: (chunks) => <span className="font-semibold">{chunks}</span>
  })
}

function VerifySignupTip() {
  const { phone } = useAuthContext()
  const t = useTranslations('Auth._components.VerificationCode.verifyTip')
  return (
    <span className="text-muted-foreground">
      {t.rich('signup', {
        phone,
        bold: (chunks) => <span className="font-semibold">{chunks}</span>
      })}
    </span>
  )
}

function VerifyingTip() {
  const t = useTranslations('Auth._components.VerificationCode')
  return (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{t('verifying')}</span>
    </>
  )
}

function ErrorTip() {
  const t = useTranslations('Auth._components.VerificationCode')
  return (
    <div className="text-sm text-destructive flex items-center justify-center w-full">
      <p className="text-center">
        <Info className="w-4 h-4 inline-block mr-1 pb-0.5" />
        <span>{t('resp._500')}</span>
      </p>
    </div>
  )
}

// 用户登录请求体
interface UserLoginRequest {
  phone: string
  code: string
  // 用户来源记录
  from: {
    appid: 'swanlab-web'
    version: string
    channel: 'core-app'
  }
}

const from: UserLoginRequest['from'] = {
  appid: 'swanlab-web',
  version: process.env.NEXT_PUBLIC_VERSION,
  channel: 'core-app'
}

// 一个钩子，定义了验证码请求的状态，监听验证码输入框的值，当值长度为 6 时，将状态设置为 loading并发起验证请求
function useCodeRequest(value: string, onVerified: (user: AuthUser) => void) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')
  const { phone } = useAuthContext()
  const { run, loading, cancel } = useRequest(
    async () => {
      return await http
        .post('/login', { phone, code: value, from })
        .then((resp) => {
          const user = resp.data as AuthUser
          onVerified(user)
        })
        .catch(() => {
          setState('error')
        })
    },
    { manual: true }
  )

  useEffect(() => {
    if (value.length === 6 && state === 'idle') {
      setState('loading')
      cancel()
      run()
    } else if (state === 'error' && value.length !== 6) {
      setState('idle')
    }
  }, [value, run, cancel, loading, state])
  return {
    state
  }
}
