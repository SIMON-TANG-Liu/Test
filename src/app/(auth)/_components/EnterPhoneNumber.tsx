'use client'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRequest } from 'ahooks'
import http from '@/lib/ajax'
import { AxiosError } from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Phone } from 'lucide-react'
import { useAuthContext } from '@/app/(auth)/_hooks/use-auth'

export default function EnterPhoneNumber() {
  const t = useTranslations('Auth._components.EnterPhoneNumber')
  const pt = useTranslations('Auth._components.EnterPhoneNumber.schema.phone')
  const { phone } = useAuthContext()
  const formSchema = z.object({
    phone: z
      .string({ message: pt('string') })
      .min(11, { message: pt('min') })
      .max(11, { message: pt('max') })
      .regex(/^\d+$/, { message: pt('regex') })
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone
    }
  })
  const { loading, run } = useSendCode()
  // 定义表单提交函数
  function onSubmit(values: z.infer<typeof formSchema>) {
    run(values.phone)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">Phone</FormLabel>
              <FormControl>
                <Input className="h-12 bg-card" {...field} placeholder={t('placeholder')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full h-12 mt-5 font-semibold" type="submit" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-3 h-4" />}
          <span>{t('btn.submit')}</span>
        </Button>
      </form>
    </Form>
  )
}

function useSendCode() {
  const { setStatus, setPhone } = useAuthContext()
  const rt = useTranslations('Auth._components.EnterPhoneNumber.resp')
  const { toast } = useToast()
  const { loading, run } = useRequest(
    async (phone: string) => {
      await http
        .post('/phone_code', { phone })
        .then(() => {
          setPhone(phone)
          // 进入验证码输入状态
          setStatus('verifying')
        })
        .catch((e: AxiosError) => {
          switch (e.response?.status) {
            case 400:
              toast({ description: rt('_400'), variant: 'destructive' })
              break
            case 403:
              toast({ description: rt('_403'), variant: 'destructive' })
              break
            case 500:
              toast({ description: rt('_500'), variant: 'destructive' })
              break
            default:
              toast({ description: rt('_500'), variant: 'destructive' })
          }
        })
    },
    {
      manual: true,
      throttleWait: 3000,
      throttleTrailing: false
    }
  )
  return { loading, run }
}
