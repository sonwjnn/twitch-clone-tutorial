'use server'

import { getSelf } from '@/data/auth'
import { blockUser, unblockUser } from '@/data/block'
// import { RoomServiceClient } from 'livekit-server-sdk'
import { revalidatePath } from 'next/cache'

// const roomService = new RoomServiceClient(
//   process.env.LIVEKIT_API_URL!,
//   process.env.LIVEKIT_API_KEY!,
//   process.env.LIVEKIT_API_SECRET!
// )

export const onBlock = async (id: string) => {
  const self = await getSelf()

  if (!self) {
    return null
  }

  let blockedUser

  try {
    blockedUser = await blockUser(id)
  } catch (error) {
    console.log(error)
    // This means user is a guest
  }

  // try {
  //   await roomService.removeParticipant(self.id, id)
  // } catch {
  // }
  // This means user is not in the room

  revalidatePath(`/u/${self.name}/community`)

  return blockedUser
}

export const onUnblock = async (id: string) => {
  const self = await getSelf()

  if (!self) {
    return null
  }

  const unblockedUser = await unblockUser(id)

  revalidatePath(`/u/${self.name}/community`)
  return unblockedUser
}
