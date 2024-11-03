// 默认展示
export type ProjectsView = 'grid' | 'list'
// 排序
export type ProjectsSort = 'update' | 'create' | 'name'
// 项目搜索参数
export interface ProjectParams {
  page: number
  search: string | undefined
  sort: ProjectsSort
  size: 24
}

// 项目分页信息
export interface ProjectPagination {
  // 当前页
  page: number
  // 一页多少条(默认)
  size: number
  // 不考虑search，总共多少个
  total: number
  // 总共多少页
  pages: number
}

// 响应项目的数据
export interface Project {
  cuid: string
  name: string
  description: string
  group: GroupInfo
  visibility: 'PUBLIC' | 'PRIVATE'
  createdAt: string
  updatedAt: string
  _count: {
    children: number
    experiments: number
    runningExps: number
    contributors: number
  }
}

interface GroupInfo {
  avatar: string
  name: string
  type: 'PERSON' | 'TEAM'
  username: string
}

export type WorkspaceProject = Project

export type BenchmarkProject = Project

export type SearchProject = Project
