import { db } from '@/lib/db'

import { getSelf } from './auth'

export const getRecommended = async () => {
  const self = await getSelf()

  if (!self) {
    return []
  }

  const userId = self.id

  let users = []

  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
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
