import { getSelf } from '@/data/auth'
import { getStreamByUserId } from '@/data/stream'

import { ConnectModal } from './_components/connect-modal'
import { KeyCard } from './_components/key-card'
import { UrlCard } from './_components/url-card'

const KeysPage = async () => {
  const self = await getSelf()

  if (!self) {
    throw new Error('User not found')
  }

  const stream = await getStreamByUserId(self.id)

  if (!stream) {
    throw new Error('Stream not found')
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  )
}

export default KeysPage
