import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Sidebar } from '@/components/banking/sidebar'
import { Menu, DollarSign } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FinanceHub - Personal Banking App',
  description: 'Manage your finances with ease. Track accounts, budgets, and transactions.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <div className="flex h-screen bg-background overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0 border-r border-sidebar-border">
            <Sidebar />
          </div>

          <main className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-sidebar text-sidebar-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                  <DollarSign className="h-5 w-5 text-sidebar-primary-foreground" />
                </div>
                <h1 className="text-lg font-bold">FinanceHub</h1>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent/10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 border-r-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-8">
              {children}
            </div>
          </main>
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
