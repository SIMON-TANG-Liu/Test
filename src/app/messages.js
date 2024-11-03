import { en as DashboardEn, zh as DashboardZh } from './(dashboard)/messages'
import { en as BenchmarksEn, zh as BenchmarksZh } from './benchmarks/messages'
import { en as AuthEn, zh as AuthZh } from './(auth)/messages'
import { en as CreateEn, zh as CreateZh } from './create/messages'

export const zh = {
  Metadata: {
    title: 'SwanLab - AGI时代先进模型训练研发工具',
    description:
      'SwanLab面向AI训练过程，为开发者提供了训练可视化、自动日志记录、超参数记录、实验对比、多人协同等一系列专业工具，提高研发团队的模型研发效率，打破沟通壁垒。',
    keywords:
      'AI训练工具, 深度学习训练工具, 训练可视化软件, 自动日志记录工具, 超参数记录系统, 实验对比平台, 多人协同研发, AI开发者工具, 模型研发效率, 研发团队协作, 沟通壁垒解决方案'
  },
  Dashboard: DashboardZh,
  Benchmarks: BenchmarksZh,
  Auth: AuthZh,
  Create: CreateZh,
  NotFound: {
    Metadata: {
      title: '404 - 找不到页面',
      description: '如果有人批准您的访问，您可以访问此页面。'
    },
    title: '无法访问此页面',
    description: '如果有人批准您的访问，您可以访问此页面。',
    btn: {
      isLogin: '返回您的工作区',
      isNotLogin: '返回首页'
    },
    tip: '您当前已登录为<user>{username}</user><break></break>可能需要更换不同的账号'
  }
}

export const en = {
  Metadata: {
    title: 'SwanLab - AI Experiment Platform in the Cloud',
    description:
      'SwanLab is an AI experiment platform that provides experiment management, training visualization, deep learning, machine learning, hyper parameter tracking, metric recording, and AI team collaboration tools to improve the efficiency of AI model development.',
    keywords:
      'AI Training Tools, Deep Learning Training Tools, Training Visualization Software, Automatic Logging Tool, Hyperparameter Recording System, Experiment Comparison Platform, Multi-person Collaborative R&D, AI Developer Tools, Model R&D Efficiency, R&D Team Collaboration, Communication Barrier Solutions'
  },
  Dashboard: DashboardEn,
  Benchmarks: BenchmarksEn,
  Auth: AuthEn,
  Create: CreateEn,
  NotFound: {
    Metadata: {
      title: '404 - Page Not Found',
      description: 'If someone approves your access, you can visit this page.'
    },
    title: 'Page Not Found',
    description: 'If someone approves your access, you can visit this page.',
    btn: {
      isLogin: 'Back to Your Workspace',
      isNotLogin: 'Back to Home'
    },
    tip: 'You are currently logged in as <user>{username}</user><break></break>You may need to switch to a different account'
  }
}
