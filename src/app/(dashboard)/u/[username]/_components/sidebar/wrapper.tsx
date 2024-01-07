'use client'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isCollapsed } = useCreatorSidebar(state => state)

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background transition-all duration-300 ease-in-out lg:w-60',
        isCollapsed && 'lg:w-[70px]'
      )}
    >
      {children}
    </aside>
  )
}
