import { WifiOff } from 'lucide-react'

interface OfflineVideoProps {
  username: string
}

export const OfflineVideo = ({ username }: OfflineVideoProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <WifiOff className="size-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offline</p>
    </div>
  )
}
