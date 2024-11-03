import { WorkspaceProject } from '@/types/projects'
import { useTranslations } from 'next-intl'
import { useMoment } from '@/hooks/use-time'
import { cn } from '@/lib/utils'
import { Activity, BookCopy, FlaskConical } from 'lucide-react'

// 工作区项目卡片
export default function WorkspaceProjectCard({ project }: { project: WorkspaceProject }) {
  const { name, _count, visibility, updatedAt } = project
  const { children, experiments, runningExps } = _count
  const t = useTranslations('components.utils.project.card')
  const projectPath = `/@${project.group.username}/${project.name}`
  const { mt } = useMoment()

  return (
    <a
      href={projectPath}
      className={cn(
        'p-5 border rounded-lg h-[105px] overflow-hidden',
        'flex flex-col justify-between hover:border-transparent',
        'bg-card hover:border-accent-foreground shadow-[0_4px_10px_-1px_rgba(0,0,0,0.05)] transition-all'
      )}
    >
      <header className="flex items-start justify-between">
        <ProjectInfo name={name} visibility={visibility} />
        <ActivityCircle runningExps={runningExps} />
      </header>
      <footer className="text-muted-foreground flex items-center gap-4">
        {!!children && <CloneNumber num={children} />}
        <ExpNumber num={experiments} />
        <div className="flex grow justify-end relative text-xs h-full">
          <time className="absolute top-0 w-full text-end truncate">{t('updateAt') + mt(updatedAt)}</time>
        </div>
      </footer>
    </a>
  )
}

function ProjectInfo({ name, visibility }: { name: string; visibility: string }) {
  return (
    <div className="max-w-[80%] whitespace-nowrap flex justify-between items-center gap-1">
      <p className="font-semibold w-full truncate text-lg">{name}</p>
      <VisibilityBadge visibility={visibility} />
    </div>
  )
}

export function VisibilityBadge({ visibility }: { visibility: string }) {
  const vt = useTranslations('components.utils.project.card.visibility')
  return (
    <span className="flex items-center text-xs px-1.5 h-5 border rounded-full text-muted-foreground">
      {vt(visibility.toLowerCase() as 'public' | 'private')}
    </span>
  )
}

function ActivityCircle({ runningExps }: { runningExps: number }) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full p-1 border-2',
        runningExps && 'border-[#8fc7af] dark:border-green-900 text-[#8fc7af] dark:text-green-900',
        runningExps && 'px-1.5 animate-pulse'
      )}
    >
      <Activity
        className={cn('w-4 h-4 text-muted-foreground data-[running]:text-inherit', 'animate-[easy-in_1s]')}
        data-running={runningExps ? '' : undefined}
      />
      <p className={cn('text-xs ml-1', !runningExps && 'hidden')}>{runningExps}</p>
    </div>
  )
}

export function CloneNumber({ num }: { num: number }) {
  return (
    <div className="flex text-xs gap-1 items-center">
      <BookCopy className="w-3 h-3" />
      {num}
    </div>
  )
}

export function ExpNumber({ num }: { num: number }) {
  return (
    <div className="flex text-xs gap-1 items-center">
      <FlaskConical className="w-3 h-3" />
      {num}
    </div>
  )
}
