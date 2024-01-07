'use client'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  const { isCollapsed, onCollapse, onExpand } = useCreatorSidebar(
    state => state
  )
  const matches = useMediaQuery(`(max-width: 1024px)`)

  useEffect(() => {
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches, onCollapse, onExpand])

  return (
    <div
      className={cn('flex-1', isCollapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}
    >
      {children}
    </div>
  )
}
