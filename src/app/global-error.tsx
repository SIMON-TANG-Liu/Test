'use client' // Error boundaries must be Client Components

import { ErrorBoxes } from '@/components/utils/icons'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { getColorMode } from '@/lib/action/color'
import { ColorMode } from '@/types/color'
import { Locale } from '@/types/locale'
import { getUserLocale } from '@/lib/action/locale'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [isReady, setIsReady] = useState(false)
  const [colorMode, setColorMode] = useState<ColorMode>('light')
  const [locale, setLocale] = useState<Locale>('en')
  Promise.all([getColorMode(), getUserLocale()])
    .then(([colorMode, locale]) => {
      setColorMode(colorMode)
      setLocale(locale)
    })
    .finally(() => {
      setIsReady(true)
    })

  if (!isReady) return null
  console.error('Server error', error)

  return (
    <html>
      <body className={colorMode === 'dark' ? 'dark' : ''}>
        <div className="flex flex-col items-center mt-32">
          <div className="flex justify-center w-full ">
            <ErrorBoxes className="w-32" />
          </div>
          <h1 className="font-semibold text-2xl">{messages[locale].title}</h1>
          <p className="text-muted-foreground mt-3 mb-6 max-w-56 text-center">{messages[locale].description}</p>
          <Button className="px-5 py-2 h-auto" onClick={reset}>
            {messages[locale].retry}
          </Button>
        </div>
      </body>
    </html>
  )
}

const messages = {
  zh: {
    title: '哎呀！服务器出错了',
    description: '请稍后再试，或者联系我们的开发团队',
    retry: '重试'
  },
  en: {
    title: 'Oops! Server error',
    description: 'Please try again later or contact our development team',
    retry: 'Retry'
  }
}
