import { Skeleton } from '@/components/ui/skeleton'

// 加载项目骨架屏
export default function ProjectCardSkeleton() {
  return (
    <div className="h-[120px] bg-card p-5 rounded-lg shadow-[0_4px_10px_-1px_rgba(0,0,0,0.05)] justify-between flex flex-col">
      <div className="flex w-full h-[35px]">
        <Skeleton className="aspect-square h-full rounded-full" />
        <div className="w-[calc(100%-35px-0.5rem)] ml-2 flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
      <div className="flex text-muted-foreground text-xs w-full">
        <div className="flex items-center gap-3 w-20">
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-6" />
        </div>
        <div className="flex justify-end grow">
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  )
}
