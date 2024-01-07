import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    })
    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        stream: true,
      },
    })
    return user
  } catch (error) {
    return null
  }
}

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: { name: username },
    })
    return user
  } catch (error) {
    return null
  }
}
