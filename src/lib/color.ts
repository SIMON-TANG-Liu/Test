import { ColorMode } from '@/types/color'

/**
 * 存储在 cookie 中的颜色模式的 key
 */
export const colorCookieKey = 'NEXT_COLOR_MODE' as const

/**
 * 合法的颜色模式集合
 */
export const colors = ['light', 'dark', 'system'] as const

/**
 * 类型守卫函数，检查颜色模式是否是合法的颜色模式
 * @param colorMode 颜色模式
 */
function isColorMode(colorMode: string): colorMode is ColorMode {
  return colors.includes(colorMode as ColorMode)
}

/**
 * 校验颜色模式是否合法，如果不合法需要有一个默认返回
 * @param mode 颜色模式
 * @param defaultMode 默认颜色模式
 */
export const validateColorMode = (mode: string, defaultMode: ColorMode = 'system') => {
  if (isColorMode(mode)) return mode
  return defaultMode
}

const handlePrefersColorSchemeChange = () => {
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const colorMode = dark ? 'dark' : 'light'
  setColorClass(colorMode)
}

/**
 * 传入颜色模式，设置body的class：
 * - light：删除dark，删除监听
 * - dark：添加dark，删除监听
 * - system：根据当前系统颜色模式添加dark，并且添加监听
 * @param mode 颜色模式
 */
export const setColorClass = (mode: ColorMode) => {
  document.body.classList.remove('dark')
  if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark')
  }
  if (mode === 'system') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handlePrefersColorSchemeChange)
  } else {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handlePrefersColorSchemeChange)
  }
  return () => {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handlePrefersColorSchemeChange)
  }
}
