import { Card } from '@/components/ui/card'
import { ArrowDownLeft, ArrowUpRight, ShoppingCart, Zap } from 'lucide-react'

interface Transaction {
  id: string
  description: string
  amount: number
  created_at: string
  transaction_type: string
  status: string
}

interface TransactionListProps {
  transactions: Transaction[]
}

function getTransactionIcon(type: string) {
  switch (type) {
    case 'transfer':
      return <ArrowUpRight className="h-5 w-5 text-accent" />
    case 'purchase':
      return <ShoppingCart className="h-5 w-5 text-chart-1" />
    case 'deposit':
      return <ArrowDownLeft className="h-5 w-5 text-green-500" />
    default:
      return <Zap className="h-5 w-5 text-muted-foreground" />
  }
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                {getTransactionIcon(transaction.transaction_type)}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(transaction.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${transaction.transaction_type === 'deposit' ? 'text-green-600' : 'text-foreground'}`}>
                {transaction.transaction_type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{transaction.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
