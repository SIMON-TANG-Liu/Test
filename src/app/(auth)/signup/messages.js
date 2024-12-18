import { en as ProfileEn, zh as ProfileZh } from '@/app/(auth)/signup/profile/messages'

export const zh = {
  Metadata: {
    title: '注册 – SwanLab',
    description: '加入SwanLab，与千万训练师共成长。'
  },
  start: {
    title: '“每次训练都值得被记录”<break></break>加入SwanLab与千万训练师共成长',
    planType: {
      title: '订阅类型',
      personal: {
        desc: '我正在进行个人/团队训练',
        label: '免费'
      },
      commercial: {
        desc: '我正在进行企业级训练',
        label: '即将推出'
      }
    },
    phone: '手机号',
    professionalTip: '有更复杂的公司需求吗？获取 <bold>企业级</bold> 支持'
  },
  verifying: {
    title: '注册SwanLab账号',
    tip: '如果您还没有账号，我们已经发送了验证码到 <bold>{phone}</bold>。请输入验证码。'
  },
  Profile: ProfileZh
}

export const en = {
  Metadata: {
    title: 'Signup - SwanLab',
    description: 'Join SwanLab and grow with millions of trainers.'
  },
  start: {
    title: '“Every Training Should Be Recorded”<break></break>Join SwanLab and Grow with Trainers',
    planType: {
      title: 'Plan Type',
      personal: {
        desc: "I'm working on personal/team training",
        label: 'Hobby'
      },
      commercial: {
        desc: "I'm working on commercial training",
        label: 'Coming Soon'
      }
    },
    phone: 'Phone Number',
    professionalTip: 'Have a complex company use case? Get <bold> Enterprise grade </bold> assistance'
  },
  verifying: {
    title: 'Sign up for SwanLab',
    tip: 'If you don’t have an account, we have sent a verification code to <bold>{phone}</bold>. Please enter the code.'
  },
  Profile: ProfileEn
}
