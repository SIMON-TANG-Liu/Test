'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import EnterPhoneNumber from '@/app/(auth)/_components/EnterPhoneNumber'
import Link from 'next/link'
import { CircleChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useAuthContext } from '@/app/(auth)/_hooks/use-auth'
import VerificationCode from '@/app/(auth)/_components/VerificationCode'
import { useRouter } from 'next/navigation'
import { useLooseUserContext } from '@/hooks/use-user'
import { assert } from '@/lib/client'
import { AuthUser } from '@/app/(auth)/_components/provider/auth'

export default function SignupPage() {
  const { status } = useAuthContext()
  return (
    <main className="bg-card border rounded-lg">
      {status === 'start' ? <EnterPhoneNumberStatus /> : <VerificationCodeStatus />}
    </main>
  )
}

function EnterPhoneNumberStatus() {
  const t = useTranslations('Auth.Signup.start')
  const pt = useTranslations('Auth.Signup.start.planType')
  return (
    <>
      <div className="sm:px-16 sm:py-16 py-10 px-4 flex flex-col gap-8">
        <h1 className="text-center sm:text-2xl text-xl font-semibold tracking-tight">
          {t.rich('title', { break: () => <span className="py-1 block" /> })}
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{pt('title')}</p>
          <div className="flex flex-col">
            <PlanItem text={pt('personal.desc')} tag={pt('personal.label')} variant={'personal'} />
            <PlanItem text={pt('commercial.desc')} tag={pt('commercial.label')} variant={'commercial'} />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{t('phone')}</p>
          <EnterPhoneNumber />
        </div>
      </div>
      <div className="p-4">
        <Link href="https://docs.swanlab.cn/zh/guide_cloud/community/online-support.html" target="_blank">
          <div className="flex justify-center py-2 items-center bg-[#f9f0ff] dark:bg-[#1a1325] rounded-md dark:text-[#854eca] text-[#531dab]">
            <span className="text-xs">
              {t.rich('professionalTip', { bold: (chunks) => <span className="font-semibold mx-1">{chunks}</span> })}
            </span>
            <CircleChevronRight className="w-3.5 h-3.5 ml-2" />
          </div>
        </Link>
      </div>
    </>
  )
}

function PlanItem({ text, variant, tag }: { text: string; variant: 'personal' | 'commercial'; tag: string }) {
  const checked = variant === 'personal'
  return (
    <div className="p-2 border first:border-b-0 first:rounded-t-md last:rounded-b-md">
      <div className="flex items-center gap-2">
        <Checkbox
          id={variant}
          disabled
          className={cn(
            'rounded-full opacity-60 border-muted-foreground',
            'data-[checked]:opacity-100 data-[checked]:border-foreground'
          )}
          checked={checked}
          data-checked={checked ? '' : undefined}
        />
        <Label
          className="text-sm font-normal data-[checked]:text-foreground text-muted-foreground"
          htmlFor={variant}
          data-checked={checked ? '' : undefined}
        >
          {text}
        </Label>
        <div className="flex flex-1 justify-end">
          <div
            className="px-1 bg-blue-500 h-5 flex items-center rounded-full data-[checked]:bg-muted-foreground"
            data-checked={checked ? '' : undefined}
          >
            <span className="text-[11px] text-destructive-foreground scale-90">{tag}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function VerificationCodeStatus() {
  const t = useTranslations('Auth.Signup.verifying')
  const router = useRouter()
  const { setStatus, setUser } = useAuthContext()
  const userCtx = useLooseUserContext()
  assert(userCtx, 'userCtx is required when verifying code')
  const onVerified = async (user: AuthUser) => {
    if (user.verified) {
      await userCtx.reInit()
      router.replace('/workspace')
    } else {
      // 未注册，跳转到注册页面
      setStatus('signing')
      setUser(user)
      router.replace('/signup/profile')
    }
  }
  return (
    <div className="sm:px-16 sm:py-16 py-10 px-4 flex flex-col gap-8">
      <h1 className="text-center sm:text-4xl text-2xl font-semibold">{t('title')}</h1>
      <VerificationCode variant="signup" onVerified={onVerified} />
    </div>
  )
}
