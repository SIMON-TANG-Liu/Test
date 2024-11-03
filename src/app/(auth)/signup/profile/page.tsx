'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthUser } from '@/app/(auth)/_components/provider/auth'
import { useAuthContext } from '@/app/(auth)/_hooks/use-auth'
import { assert } from '@/lib/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CircleCheck, CircleX, Loader2 } from 'lucide-react'
import { useRequest } from 'ahooks'
import http from '@/lib/ajax'
import { useLooseUserContext } from '@/hooks/use-user'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { checkUsernameUnique } from '@/lib/api/user'

export default function Page() {
  const { form, onSubmit, loading } = useProfileForm()
  const { user } = useAuthContext()
  // 用户名是否可用
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
  assert(user, 'user is required')
  const t = useTranslations('Auth.Signup.Profile.form.btn')
  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <NameField form={form} />
        <UsernameField form={form} onCheck={setIsUsernameAvailable} />
        <EmailField form={form} />
        <InstitutionField form={form} />
        <RefererField form={form} user={user} />
        <Button className="w-full h-12 !mt-6 font-semibold " type="submit" disabled={!isUsernameAvailable || loading}>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? t('loading') : t('submit')}
        </Button>
      </form>
    </Form>
  )
}

const usernameRegex = new RegExp('^[a-zA-Z0-9_-]*$')

function useProfileForm() {
  const t = useTranslations('Auth.Signup.Profile')
  const st = useTranslations('Auth.Signup.Profile.form.schema')
  const router = useRouter()
  const userCtx = useLooseUserContext()
  const { toast } = useToast()
  const { user } = useAuthContext()
  assert(user, 'user is required when useProfileForm')
  const { username: oldName } = user
  assert(userCtx, 'userCtx is required when useProfileForm')
  const { reInit } = userCtx
  const profileSchema = useMemo(() => {
    return z.object({
      name: z
        .string()
        .min(1, { message: st('name.required') })
        .max(50, { message: st('name.length') }),
      username: z
        .string()
        .min(1, { message: st('username.required') })
        .max(25, { message: st('username.length') })
        .regex(usernameRegex, { message: st('username.invalid') }),
      email: z
        .string()
        .min(1, st('email.required'))
        .email({ message: st('email.invalid') }),
      institution: z
        .string()
        .min(1, st('institution.required'))
        .max(50, { message: st('institution.length') }),
      referer: z.string().max(100, { message: st('referer.length') })
    })
  }, [st])
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      institution: '',
      referer: ''
    }
  })
  const [loading, setLoading] = useState(false)
  // 定义表单提交函数
  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setLoading(true)
    try {
      await http.put('/user/username', { oldName, newName: values.username })
      await http.put('/user/profile', {
        name: values.name,
        profile: {
          email: values.email,
          institution: values.institution
        },
        referer: values.referer || undefined
      })
      await reInit()
      router.replace('/workspace')
    } catch {
      toast({ description: t('resp._500'), variant: 'destructive' })
      setLoading(false)
    }
  }
  return {
    form,
    onSubmit,
    loading
  }
}

type Form = ReturnType<typeof useProfileForm>['form']

function ProfileFieldTemplate({
  form,
  field,
  optional
}: {
  form: Form
  field: 'name' | 'email' | 'institution' | 'referer'
  optional?: boolean
}) {
  const t = useTranslations(`Auth.Signup.Profile.form.fields.${field}`)
  return (
    <FormField
      control={form.control}
      name={field}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="data-[required]:after:content-['*'] after:ml-0.5 after:text-destructive"
            data-required={optional ? undefined : ''}
          >
            {t('label')}
          </FormLabel>
          <FormControl>
            <Input className="h-12 bg-card" {...field} placeholder={t('placeholder')} />
          </FormControl>
          {t('description') && <FormDescription className="last:block hidden">{t('description')}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function NameField({ form }: { form: Form }) {
  return <ProfileFieldTemplate form={form} field="name" />
}

function UsernameDescription({ status }: { status: 'loading' | 'valid' | 'invalid' | 'conflict' | null }) {
  const t = useTranslations('Auth.Signup.Profile.form.fields.username')
  if (status === null) {
    return <FormDescription className="last:block hidden">{t('description')}</FormDescription>
  }
  let icon = null
  switch (status) {
    case 'loading':
      icon = <Loader2 className="w-3.5 h-3.5 animate-spin" />
      break
    case 'valid':
      icon = <CircleCheck className="w-3.5 h-3.5" />
      break
    case 'invalid':
    case 'conflict':
      icon = <CircleX className="w-3.5 h-3.5" />
      break
  }
  const err = status === 'conflict' || status === 'invalid'
  return (
    <FormDescription
      className="last:flex hidden items-center gap-1 data-[conflict]:text-destructive"
      data-conflict={err ? '' : undefined}
    >
      {icon}
      {t(`check.${status}`)}
    </FormDescription>
  )
}

const useUsernameCheck = (username: string) => {
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'conflict' | null>(null)
  const { run } = useRequest(async () => setStatus(await checkUsernameUnique(username)), {
    debounceWait: 300,
    manual: true
  })
  useEffect(() => {
    if (!username) return setStatus(null)
    if (!usernameRegex.test(username)) return setStatus('invalid')
    setStatus('loading')
    run()
  }, [username, run])
  return status
}

function UsernameField({ form, onCheck }: { form: Form; onCheck: (value: boolean) => void }) {
  const t = useTranslations(`Auth.Signup.Profile.form.fields.username`)
  const username = form.watch('username')
  const status = useUsernameCheck(username)
  useEffect(() => {
    if (status === null) return
    onCheck(status === 'valid')
  }, [status, onCheck])
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="after:content-['*'] after:ml-0.5 after:text-destructive">{t('label')}</FormLabel>
          <FormControl>
            <Input className="h-12 bg-card" {...field} placeholder={t('placeholder')} />
          </FormControl>
          <UsernameDescription status={status} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function EmailField({ form }: { form: Form }) {
  return <ProfileFieldTemplate form={form} field="email" />
}

function InstitutionField({ form }: { form: Form }) {
  return <ProfileFieldTemplate form={form} field="institution" />
}

// ab测试
function RefererField({ form, user }: { form: Form; user: AuthUser }) {
  if (user.tag === 'A' || user.tag === null) {
    return <RefererFieldA form={form} />
  } else {
    return <RefererFieldB form={form} />
  }
}

function RefererFieldA({ form }: { form: Form }) {
  return <ProfileFieldTemplate form={form} field="referer" optional />
}

function RefererFieldB({ form }: { form: Form }) {
  const t = useTranslations('Auth.Signup.Profile.form.fields.referer')
  const rt = useTranslations('Auth.Signup.Profile.refererSelect')
  return (
    <FormField
      control={form.control}
      name="referer"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('label')}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={rt('title')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="*:cursor-pointer">
              <SelectItem value="朋友介绍">{rt('items.friends')}</SelectItem>
              <SelectItem value="Github">{rt('items.github')}</SelectItem>
              <SelectItem value="知乎">{rt('items.zhihu')}</SelectItem>
              <SelectItem value="CSDN">{rt('items.csdn')}</SelectItem>
              <SelectItem value="公众号">{rt('items.officialAccount')}</SelectItem>
              <SelectItem value="小红书">{rt('items.xiaohongshu')}</SelectItem>
              <SelectItem value="其他">{rt('items.others')}</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
