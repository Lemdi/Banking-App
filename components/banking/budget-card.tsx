import { Card } from '@/components/ui/card'

interface BudgetCardProps {
  category: string
  spent: number
  budget: number
}

export function BudgetCard({ category, spent, budget }: BudgetCardProps) {
  const percentage = (spent / budget) * 100
  const remaining = budget - spent

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{category}</h3>
        <span className="text-xs font-medium text-primary">{Math.round(percentage)}%</span>
      </div>
      <div className="space-y-2">
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${
              percentage > 90 ? 'bg-destructive' : percentage > 75 ? 'bg-chart-3' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${spent.toFixed(2)} spent</span>
          <span>${remaining.toFixed(2)} left</span>
        </div>
      </div>
    </Card>
  )
}
