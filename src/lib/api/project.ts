import { Project, ProjectPagination, ProjectParams, SearchProject } from '@/types/projects'
import http from '@/lib/ajax'

// 获取指定用户的项目列表
export async function getProjectsByUsername(username: string, query: ProjectParams) {
  const res = await http.get(`/project/${username}`, {
    params: query
  })
  return res.data as { list: Project[] } & ProjectPagination
}

// 页容量
const defaultSearchSize = 100
// 搜索用户相关的项目
export async function searchRelatedProjects(search: string) {
  const res = await http.get('/user/projects', { params: { search, size: defaultSearchSize } })
  return res.data.list as SearchProject[]
}
