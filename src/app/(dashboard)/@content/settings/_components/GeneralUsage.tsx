'use client'
import { useGroupContext } from '@/hooks/use-group'
import { useTranslations } from 'next-intl'
import { ChartLine, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import http from '@/lib/ajax'
import { useRequest } from 'ahooks'
import SearchPagination from '@/components/SearchPagination'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { CoffeeEmpty } from '@/components/utils/icons'
import Link from 'next/link'

export default function GeneralUsage() {
  const params: UsageState = useUsage()
  const { username, init } = params
  const t = useTranslations('Dashboard._content.Settings._components.GeneralUsage')
  return (
    <>
      <p className="font-semibold truncate">{t('title', { username })}</p>
      <UsageHeader totalUsage={params.totalUsage} init={init} />
      <UsageList {...params} />
    </>
  )
}

function UsageHeader({ totalUsage, init }: { totalUsage: TotalUsage | undefined; init: boolean }) {
  const t = useTranslations('Dashboard._content.Settings._components.GeneralUsage.total')
  let ts
  if (!init) ts = <Skeleton className="w-16 h-6" />
  else ts = <span className="text-muted-foreground">{totalUsage?.size}</span>
  return (
    <div className="px-6 py-4 mt-3 mb-4 border bg-card rounded-lg flex items-center gap-4">
      <ChartLine className="w-10 h-10 text-green-600 shrink-0" />
      <div>
        <p className="font-semibold ">{t('title')}</p>
        <p className="text-sm text-muted-foreground sm:block hidden">{t('description')}</p>
      </div>
      <div className="ml-auto text-sm flex items-center">
        <span className="font-semibold">{t('usage')}</span>
        {ts}
      </div>
    </div>
  )
}

interface ProjectUsage {
  name: string
  byte: number
  size: string
}

function UsageList(props: UsageState) {
  const { pagination, currentPage, setCurrentPage, loading, isEmpty, username, usageList, init } = props
  const t = useTranslations('Dashboard._content.Settings._components.GeneralUsage.list')
  if (isEmpty) return <Empty />
  return (
    <div className="relative" key={username}>
      {loading && <DetailLoader />}
      <div
        className={cn(
          'border rounded-lg bg-card overflow-hidden',
          'data-[hidden]:opacity-0 data-[hidden]:-translate-y-5 transition-all delay-200'
        )}
        data-hidden={!init ? '' : undefined}
      >
        <p className="py-4 px-6 flex justify-between">
          <span>{t('name')}</span>
          <span>{t('size')}</span>
        </p>
        <hr />
        <div className={cn('relative', loading && 'opacity-60 cursor-wait pointer-events-none min-h-40')}>
          {usageList?.map((item: ProjectUsage) => <UsageItem item={item} key={item.name} />)}
        </div>
        <SearchPagination
          className="pb-4 pt-2"
          totalPages={pagination.pages}
          defaultPage={currentPage}
          autoQuery={false}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

function Empty() {
  const { username } = useGroupContext().group
  const t = useTranslations('Dashboard._content.Settings._components.GeneralUsage.empty')
  return (
    <div className="w-full flex flex-col items-center gap-2 pt-10">
      <CoffeeEmpty className="w-40 h-40" />
      <p>{t('title')}</p>
      <p>
        <span className="text-muted-foreground pr-2">
          <span className="sm:inline hidden">{t('description')}</span>
          <span className="inline sm:hidden">{t('briefDesc')}</span>
        </span>
        <Link href={`/create/project?space=${username}`} className="underline underline-offset-4">
          {t('link')}
        </Link>
      </p>
    </div>
  )
}

function DetailLoader() {
  return (
    <div className="min-h-80 w-full flex items-center justify-center absolute">
      <Loader className="animate-spin" />
    </div>
  )
}

function UsageItem({ item }: { item: ProjectUsage }) {
  const { username } = useGroupContext().group
  return (
    <Link
      href={`/@${username}/${item.name}`}
      className="py-4 px-6 flex justify-between text-sm hover:bg-accent hover:cursor-pointer"
    >
      <span className="truncate">{item.name}</span>
      <span>{item.size}</span>
    </Link>
  )
}

interface UsagePagination {
  size: number
  total: number
  pages: number
}

interface TotalUsage {
  byte: number
  size: string
}

const defaultPagination: UsagePagination = {
  size: 20,
  total: 0,
  pages: 0
}

interface UsageState {
  init: boolean
  username: string
  loading: boolean
  isEmpty: boolean
  pagination: UsagePagination
  currentPage: number
  usageList: ProjectUsage[] | null
  totalUsage: TotalUsage | undefined
  setCurrentPage: (page: number) => void
}

/**
 * 一个钩子，用于获取所有用量相关的状态
 * 其中会根据页码和命名空间发起获取请求
 */
const useUsage = () => {
  const { username } = useGroupContext().group
  const [pagination, setPagination] = useState<UsagePagination>(defaultPagination)
  const [usageList, setUsageList] = useState<ProjectUsage[] | null>(null)
  const [totalUsage, setTotalUsage] = useState<TotalUsage>()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  // 以 username 为单位，标志是否初始化完成数据请求
  const [init, setInit] = useState(false)
  const { runAsync } = useUsageRequest(pagination.size, currentPage, init)
  // 切换命名空间后，重置一些状态，以设置加载组件和动画
  useEffect(() => {
    setInit(false)
    setCurrentPage(1)
  }, [username])
  useEffect(() => {
    setLoading(true)
    runAsync()
      .then(([details, total]) => {
        const { list, ...p } = details
        setPagination(p)
        setUsageList(list)
        if (total) setTotalUsage(total)
      })
      .finally(() => {
        setLoading(false)
        setInit(true)
      })
  }, [currentPage, runAsync, init])
  return {
    // 是否初始化
    init,
    // 当前 username
    username,
    // 是否处于翻页加载
    loading: loading || usageList?.length === 0,
    // 是否没有项目及用量
    isEmpty: usageList?.length === 0 && pagination.total === 0,
    // 当前页码
    currentPage,
    // 用量详情列表
    usageList,
    // 总页数
    totalUsage,
    // 分页数据
    pagination,
    // 更新当前页码
    setCurrentPage
  }
}

/**
 * 一个负责获取用量的钩子，提供请求状态、启动函数、请求结果
 * @param size 每页数量
 * @param page 当前页码
 * @param init 是否初始化
 */
const useUsageRequest = (size: number, page: number, init: boolean) => {
  const { username } = useGroupContext().group
  const fetchUsage = async () => {
    const params = { page, size }
    const reqs = [http.get(`/group/${username}/usage/details`, { params })]
    if (!init) reqs.push(http.get(`/group/${username}/usage`))
    return Promise.all(reqs).then(([details, total]) => [details.data, total?.data])
  }
  const { runAsync } = useRequest(fetchUsage, { manual: true, debounceWait: 200 })
  return { runAsync }
}
