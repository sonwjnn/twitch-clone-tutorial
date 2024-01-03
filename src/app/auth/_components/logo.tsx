import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

interface LogoProps {}

export const Logo = ({}: LogoProps) => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="rounded-full bg-white p-1">
        <Image
          src={'/spooky.svg'}
          alt="sonwin-gamehub"
          height={80}
          width={80}
        />
      </div>

      <div className={cn('flex flex-col items-center', font.className)}>
        <p className="text-xl font-semibold">Sonwin Gamehub</p>
        <p className="text-sm text-muted-foreground">Let&apos;s play</p>
      </div>
    </div>
  )
}
