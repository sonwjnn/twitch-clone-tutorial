import { JWT } from '@auth/core/jwt'
import { UserRole } from '@prisma/client'
import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole
  stream: {
    isLive: boolean
    name: string
  } | null
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}

declare module '@auth/core/types' {
  interface Session {
    user: ExtendedUser
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends ExtendedUser {}
}
