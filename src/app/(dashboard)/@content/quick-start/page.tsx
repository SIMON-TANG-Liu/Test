import { SearchParams } from 'nuqs/server'
import { quickStartCache } from '@/app/(dashboard)/_components/quick-start-code/utils'
import QuickStartCode from '@/app/(dashboard)/_components/quick-start-code'

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const s = quickStartCache.parse(await searchParams)
  return <QuickStartCode tab={s.tab} />
}
