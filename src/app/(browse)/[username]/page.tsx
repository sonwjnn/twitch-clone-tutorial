import { isBlockedByUser, isBlockingUser } from '@/data/block'
import { isFollowingUser } from '@/data/follow'
import { getUserByUsername } from '@/data/user'
import { notFound } from 'next/navigation'

import { Actions } from './_components/actions'

interface UserPageProps {
  params: {
    username: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)
  const isBlocking = await isBlockingUser(user.id)

  if (isBlocked) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>user: {user.name}</p>
      <p>userId: {user.id}</p>
      <p>is fowllowing: {`${isFollowing}`}</p>
      <Actions
        userId={user.id}
        isFollowing={isFollowing}
        isBlocking={isBlocking}
      />
    </div>
  )
}

export default UserPage
