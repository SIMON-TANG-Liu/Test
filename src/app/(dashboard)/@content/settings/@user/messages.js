import { en as usageEn, zh as usageZh } from '@/app/(dashboard)/@content/settings/@user/usage/messages'

export const zh = {
  Usage: usageZh,
  general: {
    title: '常规',
    language: {
      title: '语言',
      description: '用户界面使用的语言'
    },
    appearance: {
      title: '外观',
      description: 'SwanLab在您设备上的颜色模式',
      choice: {
        light: '浅色',
        dark: '深色',
        system: '跟随系统'
      }
    }
  },
  account: {
    title: '账户',
    avatar: {
      title: '头像'
    },
    username: {
      title: '用户名'
    },
    name: {
      title: '昵称'
    }
  },
  development: {
    title: '开发',
    apiKey: {
      title: 'API Key',
      description: '编程环境的账号登陆密钥',
      copy: {
        success: '已复制到剪贴板',
        failure: '复制失败'
      }
    },
    storage: {
      title: '存储',
      link: '查看详情'
    }
  },
  system: {
    title: '系统',
    signOut: {
      title: '当前账户',
      description: '您当前登录为：<user>{username}</user>',
      btn: '退出登录'
    }
  }
}

export const en = {
  Usage: usageEn,
  general: {
    title: 'General',
    language: {
      title: 'Language',
      description: 'The language used in the user interface'
    },
    appearance: {
      title: 'Appearance',
      description: 'How SwanLab looks on your device',
      choice: {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      }
    }
  },
  account: {
    title: 'Account',
    avatar: {
      title: 'Avatar'
    },
    username: {
      title: 'Username'
    },
    name: {
      title: 'Name'
    }
  },
  development: {
    title: 'Development',
    apiKey: {
      title: 'API Key',
      description: 'The login key for the programming environment',
      copy: {
        success: 'Copied to clipboard',
        failure: 'Failed to copy'
      }
    },
    storage: {
      title: 'Storage',
      link: 'View details'
    }
  },
  system: {
    title: 'System',
    signOut: {
      title: 'Active account',
      description: 'You are signed in as <user>{username}</user>',
      btn: 'Sign out'
    }
  }
}
