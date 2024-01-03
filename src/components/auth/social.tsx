'use client'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

interface SocialProps {}

export const Social = ({}: SocialProps) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        onClick={() => onClick('google')}
        size="lg"
        className="w-full"
        variant="outline"
      >
        <FcGoogle />
      </Button>
      <Button
        onClick={() => onClick('github')}
        size="lg"
        className="w-full"
        variant="outline"
      >
        <FaGithub />
      </Button>
    </div>
  )
}
