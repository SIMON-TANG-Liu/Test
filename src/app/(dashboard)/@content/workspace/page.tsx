'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGroupContext } from '@/hooks/use-group'
import { useRequest } from 'ahooks'
import { LoadingWrapper, ProjectsPagination, useViewQuery, WorkspaceProjectCard } from '@/components/utils/project'
import { useTranslations } from 'next-intl'
import { createQueryFromSearchParams } from '@/lib/client'
import WorkspaceHeader from '@/app/(dashboard)/@content/workspace/_components/WorkspaceHeader'
import ProjectsListView from '@/app/(dashboard)/@content/workspace/_components/ProjectList'
import { ProjectPagination, ProjectParams, ProjectsView, WorkspaceProject } from '@/types/projects'
import { SearchNoResults } from '@/components/utils/icons'
import { projectSorts } from '@/components/utils/project/searchParams'
import { getProjectsByUsername } from '@/lib/api/project'

export default function Page() {
  const { loading, debounceLoading, projects, isQuickStart, isChecked, pagination } = useProjects()
  if (!isChecked) return null
  if (isQuickStart) return <div>quick-start</div>
  // 初次请求完毕
  if (projects !== null) {
    return (
      <div className="flex flex-col gap-4 sm:gap-6">
        <WorkspaceHeader />
        <StatusSwitcher loading={loading} projects={projects} />
        <ProjectsPagination totalPages={pagination?.pages || 0} />
      </div>
    )
  }
  // 初次请求中（下次请求的状态交给上面的组件完成处理）
  // TODO 优化加载中的样式
  if (debounceLoading) return <div>加载中</div>
}

function StatusSwitcher({ loading, projects }: { loading: boolean; projects: WorkspaceProject[] | null }) {
  const [view] = useViewQuery()

  if (projects === null) return null
  if (projects.length === 0) return <SearchNoProjects />

  if (view === 'grid') {
    return (
      <LoadingWrapper loading={loading}>
        <GridView projects={projects} />
      </LoadingWrapper>
    )
  } else if (view === 'list')
    return (
      <LoadingWrapper loading={loading}>
        <ListView projects={projects} />
      </LoadingWrapper>
    )
}

// 搜索结果为空时的提示
function SearchNoProjects() {
  const t = useTranslations('Dashboard._content.Workspace')
  return (
    <div className="w-full min-h-40 flex flex-col justify-center items-center gap-4">
      <SearchNoResults className="w-64" />
      <p>{t('empty')}</p>
    </div>
  )
}

// 卡片视图
function GridView({ projects }: { projects: WorkspaceProject[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {projects.map((project) => (
        <WorkspaceProjectCard project={project} key={project.cuid} />
      ))}
    </div>
  )
}

// 列表视图
function ListView({ projects }: { projects: WorkspaceProject[] }) {
  return <ProjectsListView projects={projects} />
}

// 默认的查询参数
const defaultQuery: ProjectParams = {
  page: 1,
  size: 24,
  sort: 'update',
  search: undefined
} as const

// 一个钩子，获取到当前所有项目列表和分页信息以及加载状态，并且在内部完成：
// 1. 对路由参数校验
// 2. 请求项目列表数据
// 3. 根据路由参数变化响应式更新导出的状态
// 4. 提供了一个切换视图的状态，与路由参数同步
// 5. 提供了一个是否显示quick-start的状态
// 6. 提供了一个立即响应式的请求状态，与4的防抖请求状态不同
function useProjects() {
  // 校验路由参数
  const isChecked = useQueryCheck()
  const [projects, setProjects] = useState<WorkspaceProject[] | null>(null)
  const [pagination, setPagination] = useState<ProjectPagination | null>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { runAsync, cancel, loading: debounceLoading } = useProjectsRequest()
  const [loading, setLoading] = useState(false)
  // 是否显示quick-start
  const [isQuickStart, setQuickStart] = useState(false)
  const [lastQuery, setLastQuery] = useState<ProjectParams | null>(null)

  // 副作用：根据路由参数变化，重新请求数据
  useEffect(() => {
    if (!isChecked) return
    const params: RouteParams = {
      page: searchParams.get('page') || undefined,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || undefined,
      view: searchParams.get('view') as ProjectsView
    }
    cancel()
    // 设置查询参数
    const query: ProjectParams = {
      page: parseInt(params.page || '1'),
      sort: (params.sort || 'update') as ProjectParams['sort'],
      search: params.search || undefined,
      size: defaultQuery.size
    }
    // 如果查询参数没有变化，不重新请求
    if (lastQuery && JSON.stringify(lastQuery) === JSON.stringify(query)) {
      console.log('no change')
      setLoading(false)
      return
    }

    setLoading(true)
    runAsync(query)
      .then((data) => {
        // 大于总页数时，page置为最大页数
        if (params.page && data.pages > 0 && parseInt(params.page) > data.pages) {
          router.replace(
            createQueryFromSearchParams({
              searchParams,
              prefix: pathname,
              update: (current) => {
                current.delete('page')
              }
            })
          )
          return
        }
        setProjects(data.list)
        setPagination({
          page: data.page,
          size: query.size,
          total: data.total,
          pages: data.pages
        })
        setLastQuery(query)
        setQuickStart(data.total === 0 && !query.search)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [runAsync, isChecked, searchParams, cancel, router, pathname, lastQuery])

  return {
    loading,
    debounceLoading,
    projects,
    pagination,
    isQuickStart,
    isChecked
  }
}

interface RouteParams {
  page?: string
  search?: string
  sort?: string
  view?: ProjectsView
}

// 一个校验钩子，用于校验当前页码、参数等是否合法，导出默认页码、参数等，将校验：
// 1. page，不能小于等于0或者是 NaN
// 2. search，不能是空字符串
// 3. sort，不能是空字符串
// 4. view，只能是 grid 或者 list
// 上述参数不合法时，会从路由剔除
// 返回一个状态，代表是否已经校验完毕
const useQueryCheck = (): boolean => {
  // 需要检查的参数
  const searchParams = useSearchParams()
  const [isChecked, setIsChecked] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    if (isChecked) return
    // 当前地址栏代表的搜索参数
    const query: RouteParams = {
      page: searchParams.get('page') || undefined,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || undefined,
      view: (searchParams.get('view') as ProjectsView) || undefined
    }
    const newSearchParams = new URLSearchParams()
    const username = searchParams.get('space')
    if (username) newSearchParams.set('space', username)
    // page 不能小于等于0或者是 NaN
    if (query.page) {
      const page = parseInt(query.page)
      if (!isNaN(page) && page >= 0) newSearchParams.set('page', query.page)
    }
    // search如果不为空字符串
    if (query.search !== undefined && query.search !== '') {
      newSearchParams.set('search', query.search)
    }
    // sort如果不为空字符串且是默认值中的一个
    if (query.sort !== undefined && projectSorts.includes(query.sort as ProjectParams['sort'])) {
      newSearchParams.set('sort', query.sort)
    }
    // view只能是 grid 或者 list
    if (query.view === 'grid' || query.view === 'list') {
      newSearchParams.set('view', query.view)
    }
    // 生成新路由
    const newRoute = createQueryFromSearchParams({ searchParams, prefix: pathname, update: () => newSearchParams })
    // 替换路由
    router.replace(newRoute)
    setIsChecked(true)
  }, [searchParams, pathname, isChecked, router])
  return isChecked
}

// 一个请求钩子，用于请求项目列表数据，根据传入的查询参数，返回请求函数，请求状态和请求结果
const useProjectsRequest = () => {
  const { username } = useGroupContext().group
  const { loading, runAsync, data, cancel } = useRequest(
    async (query: ProjectParams) => {
      return await getProjectsByUsername(username, query)
    },
    { manual: true, debounceWait: 200, loadingDelay: 300 }
  )
  return { loading, runAsync, data, cancel }
}
