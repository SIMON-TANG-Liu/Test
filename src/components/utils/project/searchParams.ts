import { createSearchParamsCache, parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs/server'
import { ProjectsSort, ProjectsView } from '@/types/projects'

export const pageKey = 'page'
export const sortKey = 'sort'
export const searchKey = 'search'
export const viewKey = 'view'

export const projectSorts: ProjectsSort[] = ['create', 'update', 'name'] as const
export const projectViews: ProjectsView[] = ['grid', 'list'] as const

// 项目搜索参数解析器
export const projectSearchParsers = {
  [pageKey]: parseAsInteger.withDefault(1),
  [sortKey]: parseAsStringLiteral(projectSorts).withDefault('update'),
  [searchKey]: parseAsString,
  [viewKey]: parseAsStringLiteral(projectViews).withDefault('grid')
}

// 项目搜索参数缓存
export const projectSearchCache = createSearchParamsCache(projectSearchParsers)
