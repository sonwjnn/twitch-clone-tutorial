'use server'

import { getSelf } from '@/data/auth'
import { isBlockedByUser } from '@/data/block'
import { getUserById } from '@/data/user'
import { AccessToken } from 'livekit-server-sdk'
import { v4 } from 'uuid'

export const createViewerToken = async (hostIdentity: string) => {
  let self

  self = await getSelf()

  if (!self) {
    const id = v4()
    const name = `guest#${Math.floor(Math.random() * 1000)}`
    self = { id, name }
  }

  const host = await getUserById(hostIdentity)

  if (!host) {
    throw new Error('User not found')
  }

  const isBlocked = await isBlockedByUser(host.id)

  if (isBlocked) {
    throw new Error('User is blocked')
  }

  const isHost = self.id === host.id

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.name || undefined,
    }
  )

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  })

  return await Promise.resolve(token.toJwt())
}
