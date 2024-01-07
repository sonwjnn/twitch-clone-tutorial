'use server'

import { followUser, unfollowUser } from '@/data/follow'
import { revalidatePath } from 'next/cache'

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id)

    revalidatePath('/')

    if (followedUser) {
      revalidatePath(`/${followedUser.following.name}`)
    }

    return followedUser
  } catch (error) {
    throw new Error('Interal Error')
  }
}

export const onUnfollow = async (id: string) => {
  try {
    const followedUser = await unfollowUser(id)

    revalidatePath('/')

    if (followedUser) {
      revalidatePath(`/${followedUser.following.name}`)
    }

    return followedUser
  } catch (error) {
    throw new Error('Interal Error')
  }
}
