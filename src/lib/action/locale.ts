'use server'

import { cookies } from 'next/headers'
import { Locale } from '@/types/locale'
import { localeCookieKey, validateLocale } from '@/lib/locale'

export async function getUserLocale(): Promise<Locale> {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = cookies().get(localeCookieKey)?.value || 'zh'
  // Ensure the locale is supported
  return validateLocale(locale) as Locale
}

export async function setUserLocale(locale: Locale) {
  cookies().set(localeCookieKey, locale)
}
