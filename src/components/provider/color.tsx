'use client'
import { useEffect, useState } from 'react'
import { ColorMode } from '@/types/color'
import { setColorClass } from '@/lib/color'

export default function ColorModeProvider({ children, nowColorMode }: LayoutProps & { nowColorMode: ColorMode }) {
  // 防止system模式下颜色闪烁
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    setIsReady(true)
    if (nowColorMode !== 'system') return
    setColorClass(nowColorMode)
    return () => {
      setIsReady(false)
    }
  }, [nowColorMode])
  if (!isReady) return null

  return <>{children}</>
}
