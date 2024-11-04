import { getRequestConfig } from 'next-intl/server'
import { getUserLocale } from '@/lib/action/locale'

export default getRequestConfig(async () => {
  const locale = await getUserLocale()
  return {
    locale,
    messages: (await import(`../../messages/${locale}`)).default
  }
})