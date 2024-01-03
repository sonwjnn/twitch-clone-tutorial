import { UserInfo } from '@/components/user-info'
import { currentUser } from '@/lib/auth'

interface ServerPageProps {}

const ServerPage = async ({}: ServerPageProps) => {
  const user = await currentUser()
  return <UserInfo label="💻 Server component" user={user} />
}

export default ServerPage
