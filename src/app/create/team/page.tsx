'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import React, { useEffect, useMemo, useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useTranslations } from 'next-intl'
import { ChevronRight, CircleCheck, CircleX, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRequest } from 'ahooks'
import { checkUsernameUnique } from '@/lib/api/user'
import { createTeam } from '@/lib/api/create'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useUserContext } from '@/hooks/use-user'

export default function Page() {
  const [open, setOpen] = useState(true)
  const { onSubmit, form, loading } = useCreateForm()
  const t = useTranslations('Create.Team')
  // 用户名是否可用
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-2">
        <NameField form={form} />
        <UsernameField form={form} onCheck={setIsUsernameAvailable} />
        <EmailField form={form} />
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
          <CollapsibleTrigger className="py-2 flex items-center gap-1">
            <ChevronRight className={cn(open && 'rotate-90')} />
            {t('more')}
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col space-y-2">
            <InstitutionField form={form} />
            <LocationField form={form} />
          </CollapsibleContent>
        </Collapsible>
        <Button className="w-full h-12 !mt-6 font-semibold " type="submit" disabled={!isUsernameAvailable || loading}>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? t('loading') : t('submit')}
        </Button>
      </form>
    </Form>
  )
}

type Form = ReturnType<typeof useCreateForm>['form']

function FormFieldTemplate({
  form,
  field,
  optional
}: {
  form: Form
  field: 'name' | 'email' | 'institution' | 'location'
  optional?: boolean
}) {
  const t = useTranslations(`Create.Team.${field}`)
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
            <Input className="h-12" {...field} placeholder={t('placeholder')} />
          </FormControl>
          {t('description') && <FormDescription className="last:block hidden">{t('description')}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const NameField = ({ form }: { form: Form }) => {
  return <FormFieldTemplate form={form} field="name" />
}

const UsernameField = ({ form, onCheck }: { form: Form; onCheck: (v: boolean) => void }) => {
  const t = useTranslations('Create.Team.username')
  const status = useUsernameChecker(form.watch('username'))
  useEffect(() => {
    if (!status) return
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
            <Input className="h-12" {...field} placeholder={t('placeholder')} />
          </FormControl>
          <UsernameDescription status={status} />
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  )
}

const UsernameDescription = ({ status }: { status: 'loading' | 'valid' | 'invalid' | 'conflict' | null }) => {
  const t = useTranslations('Create.Team.username')
  const err = status === 'conflict' || status === 'invalid'
  const iconMap = {
    loading: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
    valid: <CircleCheck className="w-3.5 h-3.5" />,
    conflict: <CircleX className="w-3.5 h-3.5" />,
    invalid: <CircleX className="w-3.5 h-3.5" />
  }
  return (
    <FormDescription
      className={cn(
        'items-center gap-2 last:flex hidden',
        status === 'valid' && 'text-green-700',
        err && 'text-destructive'
      )}
    >
      {status ? (
        <>
          {iconMap[status]} {t(status)}
        </>
      ) : (
        t('description')
      )}
    </FormDescription>
  )
}

const usernameRegex = new RegExp('^[a-zA-Z0-9_-]*$')

const useUsernameChecker = (username: string) => {
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'conflict' | null>(null)
  const { runAsync } = useRequest(checkUsernameUnique, { manual: true, debounceWait: 300 })

  useEffect(() => {
    if (!username) return setStatus(null)
    if (!usernameRegex.test(username)) return setStatus('invalid')
    setStatus('loading')
    runAsync(username).then((res) => setStatus(res))
  }, [username, runAsync])

  return status
}

const EmailField = ({ form }: { form: Form }) => {
  return <FormFieldTemplate form={form} field="email" />
}

const InstitutionField = ({ form }: { form: Form }) => {
  return <FormFieldTemplate form={form} field="institution" optional />
}

const LocationField = ({ form }: { form: Form }) => {
  return <FormFieldTemplate form={form} field="location" optional />
}

const useCreateForm = () => {
  const t = useTranslations('Create.Team')
  const st = useTranslations('Create.Team.schema')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { reloadGroups } = useUserContext()

  const formSchema = useMemo(() => {
    return z.object({
      name: z
        .string()
        .min(1, { message: st('name.required') })
        .max(100, { message: st('name.length') }),
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
        .max(100, { message: st('institution.length') })
        .optional(),
      location: z
        .string()
        .max(100, { message: st('location.length') })
        .optional()
    })
  }, [st])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      institution: '',
      location: ''
    }
  })

  const handleSubmit = async (v: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await createTeam(v)
      await reloadGroups()
      router.replace(`/workspace?space=${v.username}`)
    } catch {
      toast({ description: t('resp._500'), variant: 'destructive' })
      setLoading(false)
    }
  }
  const onSubmit = form.handleSubmit(handleSubmit)

  return { onSubmit, form, loading }
}
