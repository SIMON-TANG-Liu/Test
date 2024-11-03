import { SwanLabNoI } from '@/components/utils/icons'

export default function Loading() {
  return (
    <div className="inset-0 flex items-center justify-center min-h-screen bg-background">
      <div className="flex items-center text-muted-foreground opacity-40 animate-bounce">
        <SwanLabNoI className="w-6 h-6 sm:w-10 sm:h-10 text-primary-500 rotate-[-8deg]" />
        <span className="mt-1.5 sm:mt-2.5 text-2xl sm:text-4xl font-semibold -ml-1.5 sm:-ml-2.5">wanLab</span>
      </div>
    </div>
  )
}
