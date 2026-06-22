"use client"

import QueryProvider from "./query-provider"

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  )
}
