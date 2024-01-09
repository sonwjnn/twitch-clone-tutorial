import authConfig from '@/auth.config'
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_SETTINGS_REDIRECT,
  apiAuthPrefix,
  apiUploadthingPrefix,
  apiWebhooksPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'
import NextAuth from 'next-auth'
import { match } from 'path-to-regexp'

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isApiWebhooksRoute = nextUrl.pathname.startsWith(apiWebhooksPrefix)
  const isApiUploadthingRoute =
    nextUrl.pathname.startsWith(apiUploadthingPrefix)
  const isPublicRoute = publicRoutes.some(route => {
    const matchRoute = match(route, { decode: decodeURIComponent })
    return !!matchRoute(nextUrl.pathname)
  })
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute || isApiWebhooksRoute || isApiUploadthingRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  if (nextUrl.pathname === '/settings') {
    return Response.redirect(new URL(DEFAULT_SETTINGS_REDIRECT, nextUrl))
  }

  return null
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
