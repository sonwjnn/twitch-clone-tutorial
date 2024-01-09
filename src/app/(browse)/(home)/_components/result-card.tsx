import { LiveBadge } from '@/components/live-badge'
import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar'
import { Stream, User } from '@prisma/client'
import Link from 'next/link'

interface ResultCardProps {
  data: {
    user: User
    isLive: boolean
    name: string
    thumbnailUrl: string | null
  }
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.name}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.image || ''}
          isLive={data.isLive}
          username={data.user.name || ''}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            name={data.user.name || ''}
            imageUrl={data.user.image || ''}
            isLive={data.isLive}
          />
          <div className="flex flex-col overflow-hidden text-sm">
            <p className="truncate font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <p className="text-muted-foreground">{data.user.name}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}
