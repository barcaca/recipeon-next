import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { Toaster } from '@/components/ui/sonner'
import { cinzel, poppins, raleway } from '@/fonts/font'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Provider } from './providers'

export const metadata: Metadata = {
  title: 'Recipeon',
  description: 'Recipeon é um app de receitas para o seu dia a dia.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${raleway.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Provider>
          <Navbar />
          {children}
          <Footer />
          <Toaster richColors position="top-center" />
        </Provider>
      </body>
    </html>
  )
}
