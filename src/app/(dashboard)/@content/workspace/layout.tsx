'use client'
import ContentLayout from '@/components/layouts/content'
import { useGroupContext } from '@/hooks/use-group'

// 当工作区切换时刷新页面
export default function WorkspaceLayout({ children }: LayoutProps) {
  const { username } = useGroupContext().group
  return <ContentLayout key={username}>{children}</ContentLayout>
}
