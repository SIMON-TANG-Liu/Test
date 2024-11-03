import { TeamMember } from '@/app/(dashboard)/@content/settings/@team/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AvatarWithInfo({ user }: { user: TeamMember }) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-center gap-0.5">
        <p className="font-semibold leading-none">{user.username}</p>
        <p className="text-sm text-muted-foreground">{user.phone}</p>
      </div>
    </div>
  )
}
