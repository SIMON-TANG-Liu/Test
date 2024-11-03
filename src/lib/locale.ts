import { Locale } from '@/types/locale'

/**
 * 存储在 cookie 中的语言的 key
 */
export const localeCookieKey = 'NEXT_LOCALE' as const

/**
 * 合法的颜色模式集合
 */
export const locales: Locale[] = ['zh', 'en'] as const

/**
 * 类型守卫函数，检查 locale 是否是合法的颜色模式
 * @param locale 颜色模式
 * @return 是否是合法的颜色模式
 */
const isLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale)
}

/**
 * 校验颜色模式是否合法，如果不合法需要有一个默认返回
 * @param locale 颜色模式
 * @param defaultLocale 默认颜色模式
 * @return 合法的颜色模式
 */
export const validateLocale = (locale: string, defaultLocale: Locale = 'zh') => {
  if (isLocale(locale)) return locale
  return defaultLocale
}
