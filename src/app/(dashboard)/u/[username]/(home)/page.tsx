// import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from '@/data/user'
import { currentUser } from '@/lib/auth'

interface CreatorPageProps {
  params: {
    username: string
  }
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser()
  const user = await getUserByUsername(params.username)

  // if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
  //   throw new Error("Unauthorized");
  // }

  return (
    <div className="h-full">
      {/* <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      /> */}
      Creator Page
    </div>
  )
}

export default CreatorPage
