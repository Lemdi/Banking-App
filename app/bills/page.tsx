'use client'

import { mockBills } from '@/lib/mock-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, CheckCircle2, AlertCircle } from 'lucide-react'

const categories = {
  utility: '⚡',
  insurance: '🛡️',
  subscription: '🔔',
}

export default function BillsPage() {
  const pendingBills = mockBills.filter(b => b.status === 'pending')
  const paidBills = mockBills.filter(b => b.status === 'paid')

  const totalPending = pendingBills.reduce((sum, bill) => sum + bill.amount, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bills</h1>
          <p className="text-muted-foreground mt-2">Track and pay your bills on time</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Add Bill
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Bills</p>
          <p className="text-2xl font-bold">{mockBills.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending Amount</p>
          <p className="text-2xl font-bold text-destructive">${totalPending.toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Payment Success Rate</p>
          <p className="text-2xl font-bold text-green-600">100%</p>
        </Card>
      </div>

      {/* Upcoming Bills */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming Bills</h2>
        <div className="space-y-3">
          {pendingBills.map((bill) => {
            const dueDate = new Date(bill.due_date)
            const today = new Date()
            const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
            const isOverdue = daysUntilDue < 0
            const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

            return (
              <Card key={bill.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {categories[bill.category as keyof typeof categories] || '📄'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{bill.biller_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">${bill.amount.toFixed(2)}</p>
                    <p className={`text-xs font-medium ${
                      isOverdue ? 'text-destructive' : isDueSoon ? 'text-chart-3' : 'text-muted-foreground'
                    }`}>
                      {isOverdue ? '🔴 Overdue' : isDueSoon ? '🟡 Due soon' : `In ${daysUntilDue} days`}
                    </p>
                  </div>
                  <Button size="sm" variant={isDueSoon || isOverdue ? 'default' : 'outline'}>
                    Pay Now
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Paid Bills */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recently Paid</h2>
        <div className="space-y-3">
          {paidBills.map((bill) => (
            <Card key={bill.id} className="p-4 flex items-center justify-between opacity-75">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-semibold">{bill.biller_name}</p>
                  <p className="text-sm text-muted-foreground">Paid on {new Date(bill.due_date).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="font-semibold">${bill.amount.toFixed(2)}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
