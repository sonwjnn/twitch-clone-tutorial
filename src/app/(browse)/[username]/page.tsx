import { StreamPlayer } from '@/components/stream-player'
import { isBlockedByUser } from '@/data/block'
import { isFollowingUser } from '@/data/follow'
import { getUserByUsername } from '@/data/user'
import { notFound } from 'next/navigation'

interface UserPageProps {
  params: {
    username: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user || !user.stream) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  if (isBlocked) {
    notFound()
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  )
}

export default UserPage
