'use client'

import { mockTransactions } from '@/lib/mock-data'
import { TransactionList } from '@/components/banking/transaction-list'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download } from 'lucide-react'

export default function TransactionsPage() {
  const totalSpent = mockTransactions.reduce((sum, t) => sum + (t.transaction_type !== 'deposit' ? t.amount : 0), 0)
  const totalReceived = mockTransactions.reduce((sum, t) => sum + (t.transaction_type === 'deposit' ? t.amount : 0), 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground mt-2">View and manage all your transactions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Transactions</p>
          <p className="text-2xl font-bold">{mockTransactions.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
          <p className="text-2xl font-bold text-destructive">${totalSpent.toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Received</p>
          <p className="text-2xl font-bold text-green-600">+${totalReceived.toFixed(2)}</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Transactions List */}
      <TransactionList transactions={mockTransactions} />
    </div>
  )
}
