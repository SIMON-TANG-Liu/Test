import { en as usageEn, zh as usageZh } from '@/app/(dashboard)/@content/settings/@team/usage/messages'

export const zh = {
  Usage: usageZh,
  account: {
    title: '组织账户',
    avatar: {
      title: '头像'
    },
    username: {
      title: '组织用户名'
    },
    name: {
      title: '组织昵称'
    }
  },
  member: {
    title: '成员',
    invite: {
      dialog: {
        trigger: '邀请成员',
        title: '邀请组织成员',
        link: '邀请链接',
        copy: {
          title: '复制链接',
          success: '复制成功',
          failure: '复制失败',
          description: '{username} 邀请您加入组织 「{groupname}」 一起协作训练更好的 AI 模型。\n' + '加入组织：{link}'
        },
        tip: '*任何知道此链接的人都可以加入此组织，链接有效期为2小时'
      }
    },
    membersTab: {
      title: '团队成员',
      role: {
        owner: '创建者',
        member: '成员',
        viewer: '查看者'
      },
      action: {
        title: '操作',
        remove: {
          title: '移除',
          success: '移除成功',
          failure: '移除失败'
        }
      }
    },
    applicationsTab: {
      title: '申请审核',
      empty: '暂无申请',
      actions: {
        review: {
          success: '审核成功',
          failure: '审核失败，请检查组织是否达到人数上限'
        }
      }
    }
  },
  development: {
    title: '开发',
    storage: {
      title: '存储',
      link: '查看详情'
    }
  },
  system: {
    title: '系统',
    delete: {
      title: '解散组织',
      description: '永久删除该组织的账户和数据',
      dialog: {
        trigger: '了解更多',
        title: '确认要解散组织吗？',
        description: '解散组织以后，你将失去所有的实验记录和数据，且此过程无法恢复。 请在下面的文本框中输入组织名称：',
        cancel: '取消',
        confirm: '是的，我确认要解散',
        toast: '组织名称不匹配，请检查输入信息',
        error: '解散组织失败，请重试'
      }
    }
  }
}

export const en = {
  Usage: usageEn,
  account: {
    title: 'Team Account',
    avatar: {
      title: 'Avatar'
    },
    username: {
      title: 'Team Username'
    },
    name: {
      title: 'Team Name'
    }
  },
  member: {
    title: 'Members',
    invite: {
      dialog: {
        trigger: 'Invite Members',
        title: 'Invite Team Members',
        link: 'Invite Link',
        copy: {
          title: 'Copy Link',
          success: 'Copied',
          failure: 'Copy Failed',
          description:
            '{username} invites you to join the team "{groupname}" to collaborate on training better AI models.\n' +
            'Join the team: {link}'
        },
        tip: '*Anyone who knows this link can join this team, and the link is valid for 2 hours.'
      }
    },
    membersTab: {
      title: 'Team Members',
      role: {
        owner: 'Owner',
        member: 'Member',
        viewer: 'Viewer'
      },
      action: {
        title: 'Actions',
        remove: {
          title: 'Remove',
          success: 'Removed',
          failure: 'Remove Failed'
        }
      }
    },
    applicationsTab: {
      title: 'Applications',
      empty: 'No Applications',
      actions: {
        review: {
          success: 'Reviewed',
          failure: 'Review Failed, please check if the team has reached the maximum number of members'
        }
      }
    }
  },
  development: {
    title: 'Development',
    storage: {
      title: 'Storage',
      link: 'View Details'
    }
  },
  system: {
    title: 'System',
    delete: {
      title: 'Delete Team',
      description: 'Permanently delete the account and data of this team',
      dialog: {
        trigger: 'Learn More',
        title: 'Are you sure you want to delete the team?',
        description:
          'After deleting the team, you will lose all the experiment records and data, and this process cannot be recovered. Please enter the team name in the text box below:',
        cancel: 'Cancel',
        confirm: 'Yes, I confirm to delete.',
        toast: 'Team name does not match, please check the input box',
        error: 'Failed to delete the team, please try again'
      }
    }
  }
}
