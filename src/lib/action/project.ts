'use server'

import f from '@/lib/request'
import { BenchmarkProject } from '@/types/projects'
import { redirect } from 'next/navigation'

interface PublicProjectsResp {
  size: number
  pages: number
  total: number
  list: BenchmarkProject[]
}
const size = 24

export async function getPublicProjects({ page, sort, search }: { page: number; sort: string; search: string | null }) {
  const params = { page, sort, search: search || undefined, size }
  const resp = (await f.get('/public_projects', { params, cacheTime: 10 })) as PublicProjectsResp
  // 选择了一个不存在的页码
  if (resp.list.length === 0 && !search) {
    const searchParams = new URLSearchParams()
    searchParams.set('page', resp.pages.toString())
    searchParams.set('sort', sort)
    redirect(`/benchmarks?${searchParams.toString()}`)
  }
  return resp
}
