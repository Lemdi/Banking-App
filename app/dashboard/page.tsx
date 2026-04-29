'use client'

import { AccountCard } from '@/components/banking/account-card'
import { TransactionList } from '@/components/banking/transaction-list'
import { BudgetCard } from '@/components/banking/budget-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { mockAccounts, mockTransactions, mockBudgets } from '@/lib/mock-data'
import { Plus, ArrowUpRight, Send } from 'lucide-react'

const spendingData = [
  { name: 'Mon', spending: 120 },
  { name: 'Tue', spending: 95 },
  { name: 'Wed', spending: 180 },
  { name: 'Thu', spending: 140 },
  { name: 'Fri', spending: 220 },
  { name: 'Sat', spending: 100 },
  { name: 'Sun', spending: 60 },
]

const savingsData = [
  { name: 'Week 1', savings: 2500 },
  { name: 'Week 2', savings: 5200 },
  { name: 'Week 3', savings: 8100 },
  { name: 'Week 4', savings: 12400 },
]

export default function DashboardPage() {
  const primaryAccount = mockAccounts[0]
  const recentTransactions = mockTransactions.slice(0, 4)
  const budgets = mockBudgets.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground mt-2">Here's your financial overview for today</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4" />
            New Account
          </Button>
          <Button variant="outline">
            <Send className="h-4 w-4" />
            Send Money
          </Button>
        </div>
      </div>

      {/* Primary Account Card */}
      <AccountCard
        name={primaryAccount.account_name}
        balance={primaryAccount.balance}
        accountNumber={primaryAccount.account_number}
        type={primaryAccount.account_type}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
          <p className="text-2xl font-bold">${(mockAccounts.reduce((sum, acc) => sum + acc.balance, 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-green-600 mt-2">+2.5% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Monthly Spending</p>
          <p className="text-2xl font-bold">$1,245.99</p>
          <p className="text-xs text-destructive mt-2">+15% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Savings Rate</p>
          <p className="text-2xl font-bold">32%</p>
          <p className="text-xs text-green-600 mt-2">On track for goals</p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Weekly Spending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Bar dataKey="spending" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Savings Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Budget and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionList transactions={recentTransactions} />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Monthly Budget</h2>
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              category={budget.category}
              spent={budget.spent_amount}
              budget={budget.budget_amount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
