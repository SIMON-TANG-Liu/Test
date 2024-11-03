// 获取并校验search参数
import { useQueryState } from 'nuqs'
import { pageKey, projectSearchParsers, searchKey, sortKey } from '@/components/utils/project/searchParams'

// 获取并校验search参数
export function useSearchQuery() {
  return useQueryState(searchKey, projectSearchParsers[searchKey])
}

// 获取并校验sort参数
export function useSortQuery() {
  return useQueryState(sortKey, projectSearchParsers[sortKey])
}

// 获取并校验page参数
export function usePageQuery() {
  return useQueryState(pageKey, projectSearchParsers[pageKey])
}

// 获取并校验view参数
export function useViewQuery() {
  return useQueryState('view', projectSearchParsers['view'])
}
