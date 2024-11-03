'use client'
import 'client-only'
import { useLooseUserContext } from '@/hooks/use-user'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createQueryFromSearchParams } from '@/lib/client'
import { useLooseGroupContext } from '@/hooks/use-group'

// 未登录重定向，如果此组件已经加载则不会再次重定向
export default function OnlyLogin({ children, rPathname }: Readonly<{ children: React.ReactNode; rPathname: string }>) {
  const userCtx = useLooseUserContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (!userCtx?.user && !isReady) {
      router.replace(createQueryFromSearchParams({ searchParams, prefix: rPathname }))
    } else {
      setIsReady(true)
    }
    return () => {
      setIsReady(false)
    }
  }, [router, userCtx, rPathname, searchParams, isReady])
  if (!userCtx?.user) {
    return null
  }
  return <>{children}</>
}

// 登录重定向, 如果此组件已经加载则不会再次重定向
export function OnlyLogout({ children, rPathname }: Readonly<{ children: React.ReactNode; rPathname: string }>) {
  const userCtx = useLooseUserContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (userCtx?.user && !isReady) {
      router.replace(createQueryFromSearchParams({ searchParams, prefix: rPathname }))
    } else {
      setIsReady(true)
    }
    return () => {
      setIsReady(false)
    }
  }, [router, userCtx, rPathname, searchParams, isReady])
  if (userCtx?.user) {
    return null
  }
  return <>{children}</>
}

// 只有Owner才能访问，否则重定向
export function OnlyOwner({ children, rPathname }: { children: React.ReactNode; rPathname: string }) {
  const { group } = useLooseGroupContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (group?.role !== 'OWNER') {
      router.replace(createQueryFromSearchParams({ searchParams, prefix: rPathname }))
    }
  }, [router, group, rPathname, searchParams])
  if (group?.role !== 'OWNER') {
    return null
  }
  return <>{children}</>
}
