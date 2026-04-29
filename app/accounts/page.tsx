'use client'

import { mockAccounts } from '@/lib/mock-data'
import { AccountCard } from '@/components/banking/account-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function AccountsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Accounts</h1>
          <p className="text-muted-foreground mt-2">Manage all your banking accounts in one place</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New Account
        </Button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAccounts.map((account) => (
          <div key={account.id}>
            <AccountCard
              name={account.account_name}
              balance={account.balance}
              accountNumber={account.account_number}
              type={account.account_type}
            />
          </div>
        ))}
      </div>

      {/* Account Details */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockAccounts.map((account) => (
            <div key={account.id} className="space-y-4 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6 last:border-0">
              <h3 className="font-semibold text-lg">{account.account_name}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Account Type</p>
                  <p className="font-medium capitalize">{account.account_type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Account Number</p>
                  <p className="font-mono font-medium">{account.account_number}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Balance</p>
                  <p className="text-xl font-bold">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Currency</p>
                  <p className="font-medium">{account.currency}</p>
                </div>
              </div>
              {account.is_primary && (
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Primary Account
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto flex-col py-4">
            <div className="text-2xl mb-2">📊</div>
            <span>View Analytics</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-4">
            <div className="text-2xl mb-2">💳</div>
            <span>Manage Cards</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-4">
            <div className="text-2xl mb-2">⚙️</div>
            <span>Account Settings</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-4">
            <div className="text-2xl mb-2">📱</div>
            <span>Mobile App</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
