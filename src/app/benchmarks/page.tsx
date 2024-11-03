// 获取公开项目列表（基线）
import { SearchParams } from 'nuqs/server'
import { getPublicProjects } from '@/lib/action/project'
import { getTranslations } from 'next-intl/server'
import { SearchNoResults } from '@/components/utils/icons'
import { ProjectCard, projectSearchCache, ProjectsGridLayout, ProjectsPagination } from '@/components/utils/project'

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const s = projectSearchCache.parse(await searchParams)
  const t = await getTranslations('Benchmarks')
  const resp = await getPublicProjects(s)
  if (resp.list.length === 0) {
    return (
      <div className="flex flex-col pb-10 items-center">
        <SearchNoResults className="w-64" />
        <p>{t('noResult.title')}</p>
        <p className="text-muted-foreground mt-1">{t('noResult.description')}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col pb-10">
      <ProjectsGridLayout>
        {resp.list.map((project) => (
          <ProjectCard key={project.cuid} project={project} />
        ))}
      </ProjectsGridLayout>
      <div className="mt-10">
        <ProjectsPagination totalPages={resp.pages} />
      </div>
    </div>
  )
}
