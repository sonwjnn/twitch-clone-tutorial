'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

const ErrorPage = ({ error }: { error: any }) => {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground">
      <p>Something went wrong</p>
      <Button variant="secondary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
