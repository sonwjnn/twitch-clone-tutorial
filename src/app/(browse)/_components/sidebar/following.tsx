'use client'

import { useSidebar } from '@/store/use-sidebar'
import { Follow, User } from '@prisma/client'

import { UserItem, UserItemSkeleton } from './user-item'

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null
    }
  })[]
}

export const Following = ({ data }: FollowingProps) => {
  const { isCollapsed } = useSidebar(state => state)

  if (!data.length) {
    return null
  }

  return (
    <div>
      {!isCollapsed && (
        <div className="mb-4 pl-6">
          <p className="line-clamp-1 text-sm text-muted-foreground">
            Following
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map(follow => (
          <UserItem
            key={follow.following.id}
            name={follow.following.name || ''}
            imageUrl={follow.following.image || ''}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
