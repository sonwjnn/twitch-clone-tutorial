import { JWT } from '@auth/core/jwt'
import { UserRole } from '@prisma/client'
import NextAuth, { type DefaultSession } from 'next-auth'

declare module '@auth/core/types' {
  export interface Session {
    user: {
      role: UserRole
      isTwoFactorEnabled: boolean
      isOAuth: boolean
    } & DefaultSession['user']
  } 
}

declare module '@auth/core/jwt' {
  interface JWT {
    role?: UserRole
  }
}

