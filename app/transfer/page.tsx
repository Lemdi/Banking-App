'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { mockAccounts } from '@/lib/mock-data'
import { ArrowRight } from 'lucide-react'

export default function TransferPage() {
  const [amount, setAmount] = useState('')
  const [fromAccount, setFromAccount] = useState(mockAccounts[0].id)
  const [toAccount, setToAccount] = useState(mockAccounts[1].id)
  const [description, setDescription] = useState('')

  const handleTransfer = () => {
    console.log({
      amount,
      fromAccount,
      toAccount,
      description,
    })
  }

  const from = mockAccounts.find(acc => acc.id === fromAccount)
  const to = mockAccounts.find(acc => acc.id === toAccount)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Send Money</h1>
        <p className="text-muted-foreground mt-2">Transfer funds between your accounts or to other people</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-6">Transfer Details</h2>
            <div className="space-y-4">
              {/* From Account */}
              <div>
                <label className="block text-sm font-medium mb-2">From Account</label>
                <select 
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                >
                  {mockAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.account_name} - ${acc.balance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Account */}
              <div>
                <label className="block text-sm font-medium mb-2">To Account</label>
                <select 
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                >
                  {mockAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.account_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground">$</span>
                  <Input 
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <Input 
                  placeholder="e.g., Monthly savings transfer"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Transfer Button */}
              <Button onClick={handleTransfer} className="w-full">
                <ArrowRight className="h-4 w-4" />
                Send Money
              </Button>
            </div>
          </Card>

          {/* Recent Transfers */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-4">Your Recent Transfers</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 border border-border rounded-lg gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-secondary flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Transfer to Savings</p>
                    <p className="text-xs text-muted-foreground truncate">2 days ago</p>
                  </div>
                </div>
                <p className="font-semibold text-right shrink-0">-$500.00</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transfer Summary */}
        <div className="space-y-4">
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold mb-4">Transfer Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">From</p>
                <p className="font-medium">{from?.account_name}</p>
                <p className="text-sm text-muted-foreground">${from?.balance.toFixed(2)}</p>
              </div>

              <div className="flex justify-center py-4">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">To</p>
                <p className="font-medium">{to?.account_name}</p>
                <p className="text-sm text-muted-foreground">${to?.balance.toFixed(2)}</p>
              </div>

              {amount && (
                <>
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-1">Transfer Amount</p>
                    <p className="text-2xl font-bold">${parseFloat(amount || '0').toFixed(2)}</p>
                  </div>

                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Fee</p>
                    <p className="font-medium">Free</p>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-secondary">
            <h3 className="font-semibold mb-3">Transfer Tips</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>✓ Transfers are instant</li>
              <li>✓ No fees for internal transfers</li>
              <li>✓ Schedule transfers for later</li>
              <li>✓ Set up recurring transfers</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
