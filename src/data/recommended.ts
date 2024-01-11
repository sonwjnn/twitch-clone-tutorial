import { db } from '@/lib/db'

import { getSelf } from './auth'

export const getRecommended = async () => {
  try {
    const self = await getSelf()

    return []
  } catch {
    return []
  }
}
