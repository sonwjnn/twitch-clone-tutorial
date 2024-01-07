'use client'

import { onBlock, onUnblock } from '@/actions/block'
import { onFollow, onUnfollow } from '@/actions/follow'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  isFollowing: boolean
  isBlocking: boolean
  userId: string
}

export const Actions = ({ isFollowing, isBlocking, userId }: ActionsProps) => {
  const [isBlockPending, startBlockTransition] = useTransition()
  const [isFollowPending, startFollowTransition] = useTransition()

  const handleFollow = () => {
    startFollowTransition(() => {
      onFollow(userId)
        .then(data =>
          toast.success(`You are now following ${data?.following.name}`)
        )
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const handleUnfollow = () => {
    startFollowTransition(() => {
      onUnfollow(userId)
        .then(data =>
          toast.success(`You have unfollowed ${data?.following.name}`)
        )
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const handleBlock = () => {
    startBlockTransition(() => {
      onBlock(userId)
        .then(data => toast.success(`Blocked the user ${data?.blocked.name}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const handleUnblock = () => {
    startBlockTransition(() => {
      onUnblock(userId)
        .then(data => toast.success(`Unblocked the user ${data?.blocked.name}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const onFollowClick = () => {
    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  const onBlockClick = () => {
    if (isBlocking) {
      handleUnblock()
    } else {
      handleBlock()
    }
  }

  return (
    <>
      <Button
        onClick={onFollowClick}
        disabled={isFollowPending || isBlockPending}
        variant="primary"
      >
        {isFollowPending ? <Spinner className="mr-2" /> : null}
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button
        onClick={onBlockClick}
        disabled={isFollowPending || isBlockPending}
      >
        {isBlockPending ? <Spinner className="mr-2" /> : null}
        {isBlocking ? 'Unblock' : 'Block'}
      </Button>
    </>
  )
}
