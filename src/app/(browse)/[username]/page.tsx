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

  return (
    <div className="flex flex-col gap-y-4">
      <p>user: {user.name}</p>
      <p>userId: {user.id}</p>
      <p>is fowllowing: {`${isFollowing}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  )
}

export default UserPage
