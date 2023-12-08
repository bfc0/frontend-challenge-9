import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import DataContextProvider from "@/context/data-context"
import { Toaster } from "react-hot-toast"

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Comments section',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <DataContextProvider>
        <body className={rubik.className}>
          <Toaster position="top-center" />
          {children}
        </body>
      </DataContextProvider>
    </html>
  )
}
