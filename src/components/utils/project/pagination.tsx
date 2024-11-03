import SearchPagination from '@/components/SearchPagination'

export function ProjectsPagination({ totalPages }: { totalPages: number }) {
  return <SearchPagination totalPages={totalPages} />
}
