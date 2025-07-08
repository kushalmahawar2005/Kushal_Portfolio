import { Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import LayoutWrapper from '@/components/LayoutWrapper'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Portfolio Admin",
  description: "Portfolio Admin Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
