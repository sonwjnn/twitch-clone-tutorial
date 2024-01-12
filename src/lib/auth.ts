import { auth } from '@/auth'

export const currentUser = async () => {
  try {
    const session = await auth()
    return session?.user
  } catch (error) {
    console.error('Error getting current user:', error)
    throw error
  }
}

export const currentRole = async () => {
  try {
    const session = await auth()
    return session?.user?.role
  } catch (error) {
    console.error('Error getting current role:', error)
    throw error
  }
}
