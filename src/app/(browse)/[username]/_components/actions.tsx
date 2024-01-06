'use client'

// import { onBlock, onUnblock } from "@/actions/block";
import { onFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  isFollowing: boolean
  userId: string
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(data =>
          toast.success(`You are now following ${data?.following.name}`)
        )
        .catch(() => toast.error('Something went wrong'))
    })
  }

  // const handleUnfollow = () => {
  //   startTransition(() => {
  //     onUnfollow(userId)
  //       .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
  //       .catch(() => toast.error("Something went wrong"));
  //   });
  // };

  const onClick = () => {
    // if (isFollowing) {
    //   handleUnfollow();
    // } else {
    //   handleFollow();
    // }
    handleFollow()
  }

  // const handleBlock = () => {
  //   startTransition(() => {
  //     onUnblock(userId)
  //       .then((data) => toast.success(`Unblocked the user ${data.blocked.username}`))
  //       .catch(() => toast.error("Something went wrong"));
  //   });
  // };

  return (
    <>
      <Button
        disabled={isPending || isFollowing}
        onClick={onClick}
        variant="primary"
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      {/* <Button onClick={handleBlock} disabled={isPending}>
      Block
    </Button> */}
    </>
  )
}
