'use client'

import { mockBudgets } from '@/lib/mock-data'
import { BudgetCard } from '@/components/banking/budget-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Plus, TrendingDown } from 'lucide-react'

const categoryColors = {
  'Food & Dining': '#8B5FFF',
  'Entertainment': '#FF6B6B',
  'Shopping': '#FFD93D',
  'Transport': '#6BCB77',
}

export default function BudgetPage() {
  const totalBudget = mockBudgets.reduce((sum, b) => sum + b.budget_amount, 0)
  const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent_amount, 0)

  const budgetVsActual = mockBudgets.map(b => ({
    name: b.category,
    budget: b.budget_amount,
    spent: b.spent_amount,
  }))

  const pieData = mockBudgets.map(b => ({
    name: b.category,
    value: b.spent_amount,
  }))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budget & Insights</h1>
          <p className="text-muted-foreground mt-2">Track your spending and manage your budget</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New Budget
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Budget</p>
          <p className="text-2xl font-bold">${totalBudget.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">For this month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
          <p className="text-2xl font-bold text-chart-1">${totalSpent.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">{Math.round((totalSpent / totalBudget) * 100)}% of budget</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Remaining</p>
          <p className="text-2xl font-bold text-green-600">${(totalBudget - totalSpent).toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">{Math.round(((totalBudget - totalSpent) / totalBudget) * 100)}% left</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Budget Health</p>
          <p className="text-2xl font-bold text-green-600">Good</p>
          <p className="text-xs text-muted-foreground mt-2">On track</p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Budget vs Actual</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetVsActual}>
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
              <Legend />
              <Bar dataKey="budget" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="spent" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Spending Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {mockBudgets.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={categoryColors[entry.category as keyof typeof categoryColors] || '#8884d8'}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Budget Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockBudgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              category={budget.category}
              spent={budget.spent_amount}
              budget={budget.budget_amount}
            />
          ))}
        </div>
      </div>

      {/* Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingDown className="h-5 w-5" />
          Budget Insights
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
            <span className="text-xl">📈</span>
            <div>
              <p className="font-medium">Shopping Category at 99%</p>
              <p className="text-sm text-muted-foreground">You&apos;ve almost reached your shopping budget limit. Consider reducing purchases this week.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-medium">Entertainment Spending Healthy</p>
              <p className="text-sm text-muted-foreground">You&apos;re spending 42% of your entertainment budget. Good pace for the month!</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
            <span className="text-xl">💡</span>
            <div>
              <p className="font-medium">Monthly Savings Tip</p>
              <p className="text-sm text-muted-foreground">If you reduce Food & Dining spending by 10%, you could save an additional $60 this month.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
