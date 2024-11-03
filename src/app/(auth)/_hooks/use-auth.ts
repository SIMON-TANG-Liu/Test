'use client'
import 'client-only'
import { useContext } from 'react'
import { AuthContext } from '@/app/(auth)/_components/provider/auth'

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}
