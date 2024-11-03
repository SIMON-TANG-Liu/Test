export const zh = {
  title: '完善您的个人资料',
  description: '填写您的个人信息，开启你的SwanLab训练之旅',
  form: {
    fields: {
      name: {
        label: '用户名称',
        placeholder: '黑天鹅',
        description: '您的名称，将用于展示'
      },
      username: {
        label: '用户ID',
        placeholder: 'blackswan',
        description: '您的英文名，可由数字、字母、下划线、中横线组成',
        check: {
          loading: '检查中...',
          valid: 'ID可用!',
          invalid: 'ID只能由数字、字母、下划线、中横线组成',
          conflict: 'ID已被占用'
        }
      },
      email: {
        label: '邮箱',
        placeholder: '您的邮箱',
        description: '在未来，您的邮箱可用于登录和找回密码'
      },
      institution: {
        label: '机构/院校',
        placeholder: '您所在的机构或院校',
        description: ''
      },
      referer: {
        label: '您从哪了解到SwanLab?',
        placeholder: '选填，如 知乎',
        description: ''
      }
    },
    schema: {
      name: {
        required: '名称不能为空',
        length: '名称长度必须在1-50个字符之间'
      },
      username: {
        conflict: 'ID已被占用',
        invalid: 'ID只能由数字、字母、下划线、中横线组成',
        length: 'ID长度必须在1-25个字符之间',
        required: 'ID不能为空'
      },
      email: {
        invalid: '邮箱格式不正确',
        required: '邮箱不能为空'
      },
      institution: {
        length: '机构/院校名称长度必须在1-50个字符之间',
        required: '机构/院校名称不能为空'
      },
      referer: {
        length: '机构/院校名称长度必须在1-100个字符之间',
        required: '机构/院校名称不能为空'
      }
    },
    btn: {
      submit: '完成',
      loading: '处理中...'
    }
  },
  refererSelect: {
    title: '点击选择一个',
    items: {
      friends: '朋友介绍',
      github: 'GitHub',
      zhihu: '知乎',
      csdn: 'CSDN',
      officialAccount: '公众号',
      xiaohongshu: '小红书',
      others: '其他'
    }
  },
  resp: {
    _500: '发生未知错误，请稍后再试'
  }
}

export const en = {
  title: 'Complete your profile',
  description: 'Fill in your personal information and start your SwanLab training',
  form: {
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Black Swan',
        description: 'Your name will be used for display'
      },
      username: {
        label: 'Username',
        placeholder: 'blackswan',
        description: 'Your username can only contain letters, numbers, underscores, and hyphens',
        check: {
          loading: 'Checking...',
          valid: 'ID is available!',
          invalid: 'ID can only contain letters, numbers, underscores, and hyphens',
          conflict: 'ID is taken'
        }
      },
      email: {
        label: 'Email',
        placeholder: 'Your email',
        description: 'Your email will be used for login and password recovery'
      },
      institution: {
        label: 'Institution',
        placeholder: 'Your institution or school',
        description: ''
      },
      referer: {
        label: 'Where did you learn about SwanLab?',
        placeholder: '',
        description: ''
      }
    },
    schema: {
      name: {
        required: 'Name is required',
        length: 'Name must be between 1-50 characters'
      },
      username: {
        conflict: 'ID is taken',
        invalid: 'ID can only contain letters, numbers, underscores, and hyphens',
        length: 'ID must be between 1-25 characters',
        required: 'ID is required'
      },
      email: {
        invalid: 'Invalid email format',
        required: 'Email is required'
      },
      institution: {
        length: 'Institution name must be between 1-50 characters',
        required: 'Institution name is required'
      },
      referer: {
        length: 'Referer name must be between 1-100 characters',
        required: 'Referer name is required'
      }
    },
    btn: {
      submit: 'Submit',
      loading: 'Processing...'
    }
  },
  refererSelect: {
    title: 'Click to select one',
    items: {
      friends: 'Friends',
      github: 'GitHub',
      zhihu: 'Zhihu',
      csdn: 'CSDN',
      officialAccount: 'Official Account',
      xiaohongshu: 'Xiaohongshu',
      others: 'Others'
    }
  },
  resp: {
    _500: 'An unknown error occurred, please try again later'
  }
}
