import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

interface AccountCardProps {
  name: string
  balance: number
  accountNumber: string
  type: string
}

export function AccountCard({ name, balance, accountNumber, type }: AccountCardProps) {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary-foreground/10 -mr-16 -mt-16" />
      
      <div className="relative flex flex-col justify-between h-40">
        <div>
          <p className="text-sm font-medium opacity-90">{type.charAt(0).toUpperCase() + type.slice(1)} Account</p>
          <h3 className="mt-1 text-xl font-bold">{name}</h3>
        </div>

        <div>
          <p className="text-xs opacity-75 mb-2">Account Balance</p>
          <p className="text-3xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs opacity-75">Account Number</p>
            <p className="font-mono text-sm font-semibold">{accountNumber}</p>
          </div>
          <ChevronRight className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}
