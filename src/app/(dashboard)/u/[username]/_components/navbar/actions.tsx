import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/">
          <LogOut className="mr-2 h-5 w-5" />
          Exit
        </Link>
      </Button>
      <UserButton />
    </div>
  )
}
