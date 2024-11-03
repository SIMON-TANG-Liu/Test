import { WorkspaceProject } from '@/types/projects'
import { ComingSoon } from '@/components/utils/icons'

export default function ProjectsListView({ projects }: { projects: WorkspaceProject[] }) {
  console.log(projects)
  return (
    <div className="flex flex-col justify-center items-center">
      <ComingSoon className="w-52 h-52 text-primary-500 mx-auto -mt-10 -z-10" />
      优化中...
    </div>
  )
}
