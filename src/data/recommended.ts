import { db } from '@/lib/db'

import { getSelf } from './auth'

export const getRecommended = async () => {
  try {
    const self = await getSelf()

    const userId = self?.id

    return []
  } catch {
    return []
  }
}
