import { Skeleton } from '@/components/ui/skeleton'

export function AvatarWithInfoSkeleton() {
  return Array.from({ length: 1 }).map((_, index) => <AvatarSkeleton key={index} />)
}

function AvatarSkeleton() {
  return (
    <div className="flex items-center space-x-4 mb-3 last:mb-0">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
