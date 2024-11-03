'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createQueryFromSearchParams } from '@/lib/client'

// 项目分页器，不是我写的，有问题找 https://github.com/Feudalman
export default function SearchPagination(props: PaginationProps) {
  const params = usePaginationParams(props)
  const { totalPages } = params
  return (
    <Pagination className={cn(totalPages <= 1 && 'hidden', 'select-none', props.className)}>
      <PaginationContent>
        <PaginationArrow variant="left" {...params} />
        <PaginationPages {...params} />
        <PaginationArrow variant="right" {...params} />
      </PaginationContent>
    </Pagination>
  )
}

interface PaginationProps {
  // 所有页
  totalPages: number
  // 自动更新 searchParams 参数
  autoQuery?: boolean
  // 默认页码
  defaultPage?: number
  // 页码变化时的回调
  onChange?: (page: number) => void
  //   分页样式
  className?: string
}

interface PaginationParams {
  totalPages: number
  currentPage: number
  pageNumbers: (null | number)[]
  turnPage: (page: number) => void
}

// 使用分页参数，返回：
// totalPages: 总页数
// currentPage: 当前页码
// pageNumbers: 需要显示的分页页码
// turnPage: 翻页函数
const usePaginationParams = ({
  totalPages,
  autoQuery = true,
  defaultPage = 1,
  onChange
}: PaginationProps): PaginationParams => {
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const query = useSearchParams()
  const [pageNumbers, setPageNumbers] = useState<(null | number)[]>([])
  const setPageParam = useSetPageParam()

  useEffect(() => {
    const page = parseInt(query.get('page') as string) || defaultPage
    setCurrentPage(page)
    setPageNumbers(fmtPaginationItems(totalPages, page))
  }, [query, totalPages, defaultPage])

  const turnPage = useCallback(
    (page: number) => {
      // 不在范围的不予操作
      if (page < 1 || page > totalPages) return
      if (autoQuery) setPageParam(page)
      // 先更新 pageNumbers，再调用 onChange
      setPageNumbers(fmtPaginationItems(totalPages, page))
      if (onChange) onChange(page)
      setCurrentPage(page)
    },
    [totalPages, autoQuery, setPageParam, onChange]
  )

  return {
    totalPages,
    currentPage,
    pageNumbers,
    turnPage
  }
}

function useSetPageParam() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  return useCallback(
    (newValue: number) => {
      const newRoute = createQueryFromSearchParams({
        searchParams,
        prefix: pathname,
        update: (current) => current.set('page', newValue.toString())
      })
      router.push(newRoute)
    },
    [searchParams, router, pathname]
  )
}

/**
 * 通过总页数和当前页码计算出需要显示的分页页码
 * @param {number} totalPages 总页数
 * @param {number} currentPage 当前页码
 * @returns {(number | null)[]} 需要显示的分页页码，null 表示省略符号
 */
const fmtPaginationItems = (totalPages: number, currentPage: number): (number | null)[] => {
  const pageNumbers = []
  const showPages = 7 // 总共显示的页码数量（包括省略号）
  if (totalPages <= showPages) return Array.from({ length: totalPages }, (_, i) => i + 1)
  pageNumbers.push(1)
  if (currentPage <= 4) {
    for (let i = 2; i <= 5; i++) pageNumbers.push(i)
    pageNumbers.push(null)
  } else if (currentPage >= totalPages - 3) {
    pageNumbers.push(null)
    for (let i = totalPages - 4; i < totalPages; i++) pageNumbers.push(i)
  } else {
    pageNumbers.push(null)
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i)
    pageNumbers.push(null)
  }
  pageNumbers.push(totalPages)
  return pageNumbers
}

// 分页页码组件
function PaginationPages(params: PaginationParams) {
  const { totalPages, currentPage, pageNumbers, turnPage } = params
  return (
    <>
      <div className="md:flex items-center hidden">
        {pageNumbers.map((number, index) =>
          number === null ? (
            <PaginationEllipsis key={index} />
          ) : (
            <PaginationBlock
              key={index}
              isActive={number === currentPage}
              onClick={(e) => {
                e.preventDefault()
                turnPage(number)
              }}
            >
              {number}
            </PaginationBlock>
          )
        )}
      </div>
      <div className="flex items-center md:hidden text-base px-5">
        {currentPage} / {totalPages}
      </div>
    </>
  )
}

interface PaginationArrowProps {
  currentPage: number
  turnPage: (page: number) => void
  totalPages: number
  variant: 'left' | 'right'
}

// 分页箭头组件
const PaginationArrow: React.FC<PaginationArrowProps> = ({ currentPage, turnPage, totalPages, variant }) => {
  const isLeft = variant === 'left'
  const isDisabled = (isLeft && currentPage === 1) || (!isLeft && currentPage === totalPages)
  const nextPage = isLeft ? currentPage - 1 : currentPage + 1
  const limitPage = isLeft ? 1 : totalPages

  const arrowIcon = isLeft ? <ChevronLeft /> : <ChevronRight />
  const arrowsIcon = isLeft ? <ChevronsLeft /> : <ChevronsRight />

  return (
    <div className={cn('flex items-center', isLeft && 'flex-row-reverse')}>
      <PaginationBlock
        isDisabled={isDisabled}
        onClick={(e) => {
          e.preventDefault()
          turnPage(nextPage)
        }}
      >
        {arrowIcon}
      </PaginationBlock>
      <PaginationBlock
        onClick={(e) => {
          e.preventDefault()
          turnPage(limitPage)
        }}
        isDisabled={isDisabled}
        autoHidden
      >
        {arrowsIcon}
      </PaginationBlock>
    </div>
  )
}

// 单个分页页码块
function PaginationBlock({
  children,
  onClick,
  isActive,
  autoHidden,
  isDisabled
}: {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  isActive?: boolean
  isDisabled?: boolean
  autoHidden?: boolean
}) {
  return (
    <PaginationItem
      className={cn(
        'w-8 h-8 rounded-lg mx-1 border flex items-center justify-center overflow-hidden bg-card',
        'data-[active]:text-accent data-[active]:bg-ring data-[active]:pointer-events-none',
        'data-[disabled]:opacity-40 data-[disabled]:pointer-events-none',
        autoHidden && 'md:flex hidden'
      )}
      data-active={isActive ? '' : undefined}
      data-disabled={isDisabled ? '' : undefined}
    >
      <PaginationLink href="" onClick={onClick}>
        {children}
      </PaginationLink>
    </PaginationItem>
  )
}
