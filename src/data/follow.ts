import { db } from '@/lib/db'

import { getSelf } from './auth'

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf()

    if (!self) {
      return false
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    })

    if (!otherUser) {
      throw new Error('User not found')
    }

    if (self.id === otherUser.id) {
      return true
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    })

    return !!existingFollow
  } catch {
    return false
  }
}

export const followUser = async (id: string) => {
  const self = await getSelf()

  if (!self) {
    return null
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  })

  if (!otherUser) {
    throw new Error('User not found')
  }

  if (otherUser.id === self?.id) {
    throw new Error('Cannot follow yourself')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  })

  if (existingFollow) {
    throw new Error('Already following')
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  })

  return follow
}
