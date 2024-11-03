'use client'
import { Moon, Smartphone, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { setColorMode } from '@/lib/action/color'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ColorMode } from '@/types/color'
import { setColorClass, validateColorMode } from '@/lib/color'

export default function AppearanceSelector({ defaultColor }: { defaultColor: ColorMode }) {
  const onValueChange = (colorMode: ColorMode) => {
    colorMode = validateColorMode(colorMode) as ColorMode
    setColorClass(colorMode)
    setColorMode(colorMode).then()
  }
  return (
    <div className="flex justify-end flex-1">
      <Select defaultValue={defaultColor} onValueChange={onValueChange}>
        <SelectTrigger className="w-[130px] bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem className="cursor-pointer" value="system">
              {<ColorModeItem colorMode="system" />}
            </SelectItem>
            <SelectItem className="cursor-pointer" value="light">
              {<ColorModeItem colorMode="light" />}
            </SelectItem>
            <SelectItem className="cursor-pointer" value="dark">
              {<ColorModeItem colorMode="dark" />}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function ColorModeItem({ colorMode }: { colorMode: ColorMode }) {
  let icon, label
  const t = useTranslations('Dashboard._content.Settings._user.general.appearance.choice')
  switch (colorMode) {
    case 'system':
      icon = <Smartphone className="w-3.5 h-3.5" />
      label = t('system')
      break
    case 'dark':
      icon = <Moon className="w-3.5 h-3.5" />
      label = t('dark')
      break
    case 'light':
      icon = <Sun className="w-3.5 h-3.5" />
      label = t('light')
      break
    default:
      throw new Error('Invalid color mode:' + colorMode)
  }
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
  )
}
