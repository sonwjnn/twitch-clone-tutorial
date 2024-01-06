import { LoginButton } from '@/components/auth/login-button'
import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'

export const Actions = async () => {
  const user = await currentUser()

  return (
    <div className="ml-4 flex items-center justify-end gap-x-2 lg:ml-0">
      {!user && (
        <LoginButton mode="modal" asChild>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </LoginButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.name}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton />
        </div>
      )}
    </div>
  )
}
