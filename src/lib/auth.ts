import { auth } from '@/auth'

export const currentUser = async () => {
  try {
    const session = await auth()

    return session?.user
  } catch {
    return null
  }
}

export const currentRole = async () => {
  const session = await auth()

  return session?.user?.role
}
