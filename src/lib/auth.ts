import { auth } from '@/auth'

const testUser = {
  name: 'sonwin111',
  email: 'nguyenlehoangson2106@gmail.com',
  image: null,
  id: 'clr7mclbe000012d77p333jre',
  role: 'USER',
  isTwoFactorEnabled: false,
  isOAuth: false,
  stream: { name: "sonwin111's stream", isLive: false },
}

export const currentUser = async () => {
  const session = await auth()
  // return session?.user
  return testUser
}

export const currentRole = async () => {
  const session = await auth()
  return testUser.role
  // return session?.user?.role
}
