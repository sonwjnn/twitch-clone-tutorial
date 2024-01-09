import { Spinner } from '@/components/spinner'

interface LoadingVideoProps {
  label: string
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Spinner size="icon" className="dark:text-muted-foreground" />
      <p className="capitalize text-muted-foreground">{label}</p>
    </div>
  )
}
