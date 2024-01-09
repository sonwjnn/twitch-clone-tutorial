'use client'

import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  hostIdentity: string
  isFollowing: boolean
  isHost: boolean
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const user = useCurrentUser()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then(data =>
          toast.success(`You are now following ${data?.following.name}`)
        )
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then(data =>
          toast.success(`You have unfollowed ${data?.following.name}`)
        )
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const toggleFollow = () => {
    if (!user?.id) {
      return router.push('/auth/login')
    }

    if (isHost) return

    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn('mr-2 h-4 w-4', isFollowing ? 'fill-white' : 'fill-none')}
      />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />
}
