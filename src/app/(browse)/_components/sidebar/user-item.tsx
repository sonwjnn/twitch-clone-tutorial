'use client'

import { LiveBadge } from '@/components/live-badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface UserItemProps {
  name: string
  imageUrl: string
  isLive?: boolean
}

export const UserItem = ({ name, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname()

  const { isCollapsed } = useSidebar(state => state)

  const href = `/${name}`
  const isActive = pathname === href

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'h-12 w-full',
        isCollapsed ? 'justify-center' : 'justfy-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            'flex w-full items-center gap-x-4',
            isCollapsed && 'justify-center'
          )}
        >
          <UserAvatar imageUrl={imageUrl} name={name} isLive={isLive} />
          {!isCollapsed && <p className="truncate">{name}</p>}
          {!isCollapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  )
}

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}
