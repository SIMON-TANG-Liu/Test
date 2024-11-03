import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { getColorMode } from '@/lib/action/color'
import { NextIntlClientProvider } from 'next-intl'
import ColorModeProvider from '@/components/provider/color'
import GroupProvider from '@/components/provider/group'
import { Toaster } from '@/components/ui/toaster'
import UserProvider from '@/components/provider/user'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const geistSans = localFont({
  src: '../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: '../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    applicationName: 'SwanLab'
  }
}

export default async function RootLayout({ children }: LayoutProps) {
  const locale = await getLocale()
  const messages = await getMessages()
  const colorMode = await getColorMode()
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${colorMode === 'dark' ? 'dark' : ''}`}>
        <NuqsAdapter>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Toaster />
            <ColorModeProvider nowColorMode={colorMode}>
              <UserProvider>
                <GroupProvider>{children}</GroupProvider>
              </UserProvider>
            </ColorModeProvider>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
