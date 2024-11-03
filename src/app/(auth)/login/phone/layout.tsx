'use client'

import { Status } from '@/app/(auth)/_components/provider/auth'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/app/(auth)/_hooks/use-auth'

// 进入此页面时，如果不为start状态，重置为start状态
export default function PhoneLayout({ children }: LayoutProps) {
  const isReady = useCheckStatus(['start', 'verifying'])
  if (!isReady) return null
  return <>{children}</>
}

// 一个自定义的hook，用于检查status状态，使用时如果status不在statusArr中，会重置为statusArr[0]
function useCheckStatus(statusArr: Status[]) {
  const [isReady, setIsReady] = useState(false)
  const { setStatus, status } = useAuthContext()
  useEffect(() => {
    if (isReady) return
    if (!statusArr.includes(status)) {
      setStatus(statusArr[0])
    }
    setIsReady(true)
  }, [isReady, status, setStatus, statusArr])
  return isReady
}
