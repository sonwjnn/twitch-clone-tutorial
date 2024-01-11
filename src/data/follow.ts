import { db } from '@/lib/db'

import { getSelf } from './auth'

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf()

    console.log(self)

    if (!self) {
      return []
    }

    // Search for records that the current user is following
    // and aren't blocked by the person they're following.
    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    })

    return followedUsers
  } catch {
    return []
  }
}

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

    const existingFollow = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: self.id,
          followingId: otherUser.id,
        },
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

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: self.id,
        followingId: otherUser.id,
      },
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

export const unfollowUser = async (id: string) => {
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

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    },
  })

  if (!existingFollow) {
    throw new Error('Not following')
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  })

  return follow
}
