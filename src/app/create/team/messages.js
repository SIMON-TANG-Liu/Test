export const zh = {
  title: '创建你的组织',
  description: '“透明、高效的AI组织协作，让研究目标加速完成”',
  submit: '创建',
  loading: '正在创建',
  name: {
    label: '名称',
    placeholder: '例如：天鹅港',
    description: '昵称，可以随时修改'
  },
  username: {
    label: '组织ID',
    placeholder: '由 0-9、a-z、A-Z、-、_ 组成，例如：SwanHub',
    description: 'ID，不可修改',
    valid: 'ID 可用!',
    invalid: '仅允许 0-9、a-z、A-Z、-、_',
    conflict: 'ID 已被占用',
    loading: '正在检查'
  },
  email: {
    label: '组织邮箱',
    placeholder: '组织的邮箱地址',
    description: '用于接收服务通知'
  },
  more: '更多信息（可选）',
  institution: {
    label: '机构/学校',
    placeholder: '组织所在的机构或院校名称',
    description: ''
  },
  location: {
    label: '地区',
    placeholder: '组织所在的地区或城市',
    description: ''
  },
  schema: {
    name: {
      required: '昵称不可为空',
      length: '昵称长度必须在1-100个字符之间'
    },
    username: {
      required: '用户名不可为空',
      length: '用户名长度必须在1-25个字符之间',
      conflict: '用户名已被占用',
      invalid: '用户名只能由数字、字母、下划线、中横线组成'
    },
    email: {
      required: '邮箱不可为空',
      invalid: '请输入正确的邮箱格式'
    },
    institution: {
      length: '机构/学校名称长度必须在1-100个字符之间'
    },
    location: {
      length: '地区名称长度必须在1-100个字符之间'
    }
  },
  resp: {
    _500: '发生未知错误，请稍后再试'
  }
}

export const en = {
  title: 'Create Your Organization',
  description: '“Transparent, efficient AI organization collaboration, to accelerate research goals”',
  submit: 'Create',
  loading: 'Creating...',
  name: {
    label: 'Name',
    placeholder: 'Eg: SwanHub',
    description: 'Nickname, can be modified anytime'
  },
  username: {
    label: 'Organization ID',
    placeholder: 'Only 0-9、a-z、A-Z、-、_ , eg: SwanHub',
    description: 'ID, cannot be modified',
    valid: 'ID is available',
    invalid: 'Only 0-9、a-z、A-Z、-、_ are allowed',
    conflict: 'ID is already taken',
    loading: 'Checking...'
  },
  email: {
    label: 'Organization email',
    placeholder: 'Organization email address',
    description: 'Used to receive service notifications'
  },
  more: 'More information (optional)',
  institution: {
    label: 'Institution',
    placeholder: 'Institution or school name',
    description: ''
  },
  location: {
    label: 'Location',
    placeholder: 'Location or city',
    description: ''
  },
  schema: {
    name: {
      required: 'Nickname cannot be empty',
      length: 'Nickname length must be between 1-100 characters'
    },
    username: {
      required: 'Username cannot be empty',
      length: 'Username length must be between 1-25 characters',
      conflict: 'Username is already taken',
      invalid: 'Username can only contain numbers, letters, underscores, and hyphens'
    },
    email: {
      required: 'Email cannot be empty',
      invalid: 'Please enter a valid email address'
    },
    institution: {
      length: 'Institution name length must be between 1-100 characters'
    },
    location: {
      length: 'Location name length must be between 1-100 characters'
    }
  },
  resp: {
    _500: 'An unknown error occurred, please try again later'
  }
}
