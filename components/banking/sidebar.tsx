'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CreditCard, DollarSign, Eye, Home, LogOut, Pill, Settings, TrendingUp, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Accounts', href: '/accounts', icon: DollarSign },
  { name: 'Transactions', href: '/transactions', icon: Zap },
  { name: 'Transfer', href: '/transfer', icon: TrendingUp },
  { name: 'Bills', href: '/bills', icon: Pill },
  { name: 'Cards', href: '/cards', icon: CreditCard },
  { name: 'Budget', href: '/budget', icon: Eye },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
          <DollarSign className="h-6 w-6 text-sidebar-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold">FinanceHub</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-4 py-6">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/10 transition-colors">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
