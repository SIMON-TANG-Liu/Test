import { en as QuickStartCodeEn, zh as QuickStartCodeZh } from '@/app/(dashboard)/_components/quick-start-code/messages'

export const zh = {
  DashboardSidebar: {
    search: {
      placeholder: '搜索项目...',
      recent: '最近',
      noSearch: '搜索您的项目',
      noResult: '未找到项目'
    },
    navs: {
      user: {
        workspace: '工作区',
        benchmarks: '基线社区',
        stars: '收藏',
        settings: '设置'
      },
      team: {
        workspace: '工作区',
        benchmarks: '基线社区',
        team: '组织主页',
        settings: '组织管理'
      }
    }
  },
  DashboardNavbar: {
    navs: {
      user: {
        workspace: '工作区',
        stars: '收藏',
        settings: '设置',
        Drawer: {
          benchmarks: '基线社区'
        }
      },
      team: {
        workspace: '工作区',
        settings: '组织管理',
        Drawer: {
          benchmarks: '基线社区',
          team: '组织主页'
        }
      }
    },
    drawer: '更多'
  },
  WorkspaceDesktopSwitcher: {
    search: {
      placeholder: '查找个人或组织...',
      noResult: '未找到组织'
    },
    groups: {
      users: '个人',
      teams: '组织'
    },
    me: '{username} 的项目',
    create: '创建组织'
  },
  WorkspaceMobileSwitcher: {
    title: '切换工作空间',
    description: '选择一个工作空间，查看该工作空间的项目',
    search: {
      placeholder: '查找个人或组织...',
      noResult: '未找到组织'
    },
    groups: {
      users: '个人',
      teams: '组织'
    },
    me: '{username} 的项目',
    create: '创建组织'
  },
  QuickStartCode: QuickStartCodeZh
}

export const en = {
  DashboardSidebar: {
    search: {
      placeholder: 'Search project...',
      recent: 'Recent',
      noSearch: 'Search your project',
      noResult: 'No project found'
    },
    navs: {
      user: {
        workspace: 'Workspace',
        benchmarks: 'Benchmarks',
        stars: 'Star',
        settings: 'Settings'
      },
      team: {
        workspace: 'Workspace',
        benchmarks: 'Benchmarks',
        team: 'View Team',
        settings: 'Team Management'
      }
    }
  },
  DashboardNavbar: {
    navs: {
      user: {
        workspace: 'Workspace',
        stars: 'Star',
        settings: 'Settings',
        Drawer: {
          benchmarks: 'Benchmarks'
        }
      },
      team: {
        workspace: 'Workspace',
        settings: 'Team Management',
        Drawer: {
          benchmarks: 'Benchmarks',
          team: 'View Team'
        }
      }
    },
    drawer: 'More'
  },
  WorkspaceDesktopSwitcher: {
    search: {
      placeholder: 'Find User or Team...',
      noResult: 'No Team Found'
    },
    groups: {
      users: 'User',
      teams: 'Teams'
    },
    me: "{username}'s projects",
    create: 'Create Team'
  },
  WorkspaceMobileSwitcher: {
    title: 'Change Workspace',
    description: 'Select a workspace to view the projects in that workspace',
    search: {
      placeholder: 'Find User or Team...',
      noResult: 'No Team Found'
    },
    groups: {
      users: 'User',
      teams: 'Teams'
    },
    me: "{username}'s projects",
    create: 'Create Team'
  },
  QuickStartCode: QuickStartCodeEn
}
