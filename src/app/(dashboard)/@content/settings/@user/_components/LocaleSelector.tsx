'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setUserLocale } from '@/lib/action/locale'
import { Locale } from '@/types/locale'

export default function LocaleSelector({ defaultLocale }: { defaultLocale: Locale }) {
  const onValueChange = (value: Locale) => {
    setUserLocale(value).then()
  }
  return (
    <div className="flex justify-end flex-1">
      <Select defaultValue={defaultLocale} onValueChange={onValueChange}>
        <SelectTrigger className="w-[130px] bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem className="cursor-pointer" value="zh">
              {fmtLocale('zh')}
            </SelectItem>
            <SelectItem className="cursor-pointer" value="en">
              {fmtLocale('en')}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const fmtLocale = (locale: Locale) => {
  switch (locale) {
    case 'zh':
      return '简体中文'
    case 'en':
      return 'English'
    default:
      return locale
  }
}
