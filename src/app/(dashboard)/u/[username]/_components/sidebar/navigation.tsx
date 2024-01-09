'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { NavItem, NavItemSkeleton } from './nav-item'

export const Navigation = () => {
  const pathname = usePathname()
  const user = useCurrentUser()

  const routes = [
    {
      label: 'Stream',
      href: `/u/${user?.name}`,
      icon: Fullscreen,
    },
    {
      label: 'Keys',
      href: `/u/${user?.name}/keys`,
      icon: KeyRound,
    },
    {
      label: 'Chat',
      href: `/u/${user?.name}/chat`,
      icon: MessageSquare,
    },
    {
      label: 'Community',
      href: `/u/${user?.name}/community`,
      icon: Users,
    },
  ]

  if (!user?.name) {
    return <NavigationSkeleton />
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map(route => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  )
}

export const NavigationSkeleton = () => {
  return (
    <ul className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <NavItemSkeleton key={i} />
      ))}
    </ul>
  )
}
