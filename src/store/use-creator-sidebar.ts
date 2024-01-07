import { create } from 'zustand'

interface CreatorSidebarStore {
  isCollapsed: boolean
  onExpand: () => void
  onCollapse: () => void
}

export const useCreatorSidebar = create<CreatorSidebarStore>(set => ({
  isCollapsed: false,
  onExpand: () => set(() => ({ isCollapsed: false })),
  onCollapse: () => set(() => ({ isCollapsed: true })),
}))
