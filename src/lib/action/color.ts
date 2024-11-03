'use server'

import { cookies } from 'next/headers'
import { ColorMode } from '@/types/color'
import { colorCookieKey, colors, validateColorMode } from '@/lib/color'

/**
 * Set color mode
 * @param userColorMode - User color mode, 'dark' | 'light' | 'system'
 */
export async function setColorMode(userColorMode: ColorMode) {
  if (colors.includes(userColorMode)) {
    cookies().set(colorCookieKey, userColorMode)
  } else {
    console.error('Invalid color mode')
  }
}

/**
 * Get color mode
 * @returns User color mode, 'dark' | 'light' | 'system'
 */
export async function getColorMode(): Promise<ColorMode> {
  const colorMode = cookies().get(colorCookieKey)?.value || 'system'
  return validateColorMode(colorMode) as ColorMode
}
