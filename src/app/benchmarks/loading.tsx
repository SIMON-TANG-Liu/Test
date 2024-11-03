import ProjectCardSkeleton from '@/components/utils/project/card/ProjectCardSkeleton'
import { ProjectsGridLayout } from '@/components/utils/project'

export default function Loading() {
  return (
    <div className="flex flex-col pb-10">
      <ProjectsGridLayout>
        {Array.from({ length: 24 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </ProjectsGridLayout>
    </div>
  )
}
