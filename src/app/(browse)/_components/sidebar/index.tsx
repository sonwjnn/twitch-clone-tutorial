import { getFollowedUsers } from '@/data/follow'
import { getRecommended } from '@/data/recommended'

import { Following, FollowingSkeleton } from './following'
import { Recommended, RecommendedSkeleton } from './recommended'
import { Toggle, ToggleSkeleton } from './toggle'
import { Wrapper } from './wrapper'

export const Sidebar = async () => {
  // const recommended = await getRecommended()
  // const following = await getFollowedUsers()

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={[]} />
        <Recommended data={[]} />
      </div>
    </Wrapper>
  )
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}
