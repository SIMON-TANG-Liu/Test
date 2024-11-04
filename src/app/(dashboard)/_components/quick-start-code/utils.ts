import { createSearchParamsCache, parseAsStringLiteral } from 'nuqs/server'

export type TabKeys = (typeof tasks)[number] | (typeof frameworks)[number]

export const tasks = ['introduction', 'image', 'object', 'tuning', 'text', 'trading'] as const
export const frameworks = ['pytorch', 'lightning', 'huggingface', 'ultralytics'] as const

const searchParser = {
  tab: parseAsStringLiteral([...tasks, ...frameworks]).withDefault('introduction')
}

export const quickStartCache = createSearchParamsCache(searchParser)
