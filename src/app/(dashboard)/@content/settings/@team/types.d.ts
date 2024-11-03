// 团队状态下的成员信息
export interface TeamMember {
  username: string
  name: string
  phone: string
  avatar: string
}

export interface MemberRes {
  id: number
  role: 'OWNER' | 'MEMBER' | 'VIEWER'
  user: TeamMember
}

export interface Member extends TeamMember {
  id: number
  role: 'OWNER' | 'MEMBER' | 'VIEWER'
}

export interface ApplicantRes {
  user: TeamMember
  createdAt: string
}

export type Applicant = TeamMember

export interface ReviewReq {
  username: string
  review: 'APPROVED' | 'REJECTED'
}
