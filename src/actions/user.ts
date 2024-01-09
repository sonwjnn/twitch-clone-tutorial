'use server'

import { getSelf } from '@/data/auth'
import { db } from '@/lib/db'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf()

  if (!self) throw new Error('Not logged in')

  const validData = {
    bio: values.bio,
  }

  const user = await db.user.update({
    where: { id: self.id },
    data: { ...validData },
  })

  revalidatePath(`/${self.name}`)
  revalidatePath(`/u/${self.name}`)

  return user
}
