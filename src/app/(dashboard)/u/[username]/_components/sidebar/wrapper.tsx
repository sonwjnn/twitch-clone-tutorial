'use client'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { useIsClient } from 'usehooks-ts'

import { NavigationSkeleton } from './navigation'
import { ToggleSkeleton } from './toggle'

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isCollapsed } = useCreatorSidebar(state => state)

  const isClient = useIsClient()

  if (!isClient) {
    return (
      <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
        <ToggleSkeleton />
        <NavigationSkeleton />
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60',
        isCollapsed && 'lg:w-[70px]'
      )}
    >
      {children}
    </aside>
  )
}
