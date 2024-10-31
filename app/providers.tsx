'use client'

import type { ReactNode } from 'react'

import { ThemeProvider } from '@/components/theme/theme-provider'

interface ProviderProps {
  children: ReactNode
}

export function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
