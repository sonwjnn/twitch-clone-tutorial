import { db } from '@/lib/db'

import { getSelf } from './auth'

export const getRecommended = async () => {
  const self = await getSelf()

  if (!self) {
    return []
  }

  let users = []

  if (self.id) {
    //Find users that current (self) users are not following and are not blocked
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: self.id,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: self.id,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: self.id,
                },
              },
            },
          },
        ],
      },
    })
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  return users
}
