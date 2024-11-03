'use client'
import { BenchmarkProject } from '@/types/projects'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useMoment } from '@/hooks/use-time'
import { CloneNumber, ExpNumber, VisibilityBadge } from '@/components/utils/project/card/WorkspaceProjectCard'

// benchmarks、组织主页、个人主页、收藏项目卡片（客户端版本）
export default function ProjectCard({
  project,
  showVisibility
}: {
  project: BenchmarkProject
  showVisibility?: boolean
}) {
  const t = useTranslations('components.utils.project.card')
  const { mt } = useMoment()
  const link = useMemo(() => `/@${project.group.username}/${project.name}`, [project])
  return (
    <a
      className={cn(
        'border bg-card p-5 rounded-lg shadow-[0_4px_10px_-1px_rgba(0,0,0,0.05)]',
        'hover:border-foreground flex flex-col h-[120px] justify-between'
      )}
      href={link}
    >
      <div className="flex w-full h-[35px]">
        <Avatar className="w-[35px] h-full">
          <AvatarImage src={project.group.avatar} />
          <AvatarFallback>{project.group.username[0]}</AvatarFallback>
        </Avatar>
        <div
          className="ml-2 flex flex-col w-[calc(100%-35px-0.5rem-2.25rem)]"
          data-compat={showVisibility ? '' : undefined}
        >
          <p className="font-semibold leading-none truncate">{project.name}</p>
          <span className="text-xs truncate text-muted-foreground">{project.group.username}</span>
        </div>
        <div className="flex w-9">{showVisibility && <VisibilityBadge visibility={project.visibility} />}</div>
      </div>
      <div className="flex [&_svg]:w-3 [&_svg]:h-3 text-muted-foreground text-xs w-full">
        <div className="flex items-center gap-3 w-20">
          <CloneNumber num={project._count.children} />
          <ExpNumber num={project._count.experiments} />
        </div>
        <time className="w-[calc(100%-80px)] truncate text-end">{t('updateAt') + mt(project.updatedAt)}</time>
      </div>
    </a>
  )
}
