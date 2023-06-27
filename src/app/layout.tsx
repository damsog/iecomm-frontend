'use client';

import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <html lang="en">
      <head>
        <body className=" bg-gradient-to-br from-[#09070f] from-50% to-[#071920]">
          <SessionProvider refetchOnWindowFocus={false}>
            {children}
          </SessionProvider>
        </body>
      </head>
    </html>
    </QueryClientProvider>
  )
}
