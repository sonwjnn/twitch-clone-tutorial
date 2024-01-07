'use client'

import { LogoutButton } from '@/components/auth/logout-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/use-current-user'
import { DoorOpen, Settings, UserRound } from 'lucide-react'
import Link from 'next/link'

export const UserButton = () => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="transition hover:brightness-110">
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-sky-500">
            <UserRound className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem className="cursor-pointer">
          <Link className="flex cursor-pointer items-center" href="/settings">
            <Settings className="mr-2 mt-0.5 size-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <LogoutButton className="flex w-full">
            <DoorOpen className="mr-2 mt-0.5 size-4" />
            Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
