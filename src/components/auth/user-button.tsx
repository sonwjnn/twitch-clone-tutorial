'use client'

import { LogoutButton } from '@/components/auth/logout-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Clapperboard, DoorOpen, Settings, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { SettingsButton } from './settings-button'

export const UserButton = () => {
  const router = useRouter()
  const user = useCurrentUser()

  const onDasboardClick = () => {
    router.push(`/u/${user?.name}`)
  }

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
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex gap-x-2 p-2">
          <Avatar className="transition hover:brightness-110">
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className="bg-sky-500">
              <UserRound className="text-white" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h3 className="line-clamp-1 text-base font-semibold">
              {user?.name}
            </h3>
            <p className="line-clamp-1 text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <DropdownMenuItem
          className="cursor-pointer px-4 py-3"
          onClick={onDasboardClick}
        >
          <Clapperboard className="mr-2 size-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <SettingsButton mode="modal" asChild>
            <div className="flex w-full cursor-pointer items-center rounded-sm px-4 py-3 text-sm transition hover:bg-accent hover:text-accent-foreground">
              <Settings className="mr-2 mt-0.5 size-4" />
              Manage account
            </div>
          </SettingsButton>
        </DropdownMenuItem>

        <Separator />
        <DropdownMenuItem className="cursor-pointer px-4 py-3 focus:bg-red-400 focus:bg-opacity-10 focus:text-red-500">
          <LogoutButton className="flex w-full">
            <DoorOpen className="mr-2 mt-0.5 size-4" />
            Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
