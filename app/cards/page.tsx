'use client'

import { mockCards, mockAccounts } from '@/lib/mock-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Lock, Eye, Trash2 } from 'lucide-react'

export default function CardsPage() {
  const debitCards = mockCards.filter(c => c.card_type === 'debit')
  const creditCards = mockCards.filter(c => c.card_type === 'credit')

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Cards</h1>
          <p className="text-muted-foreground mt-2">Manage your debit and credit cards</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Request New Card
        </Button>
      </div>

      {/* Debit Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Debit Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {debitCards.map((card) => {
            const account = mockAccounts.find(a => a.id === card.account_id)
            return (
              <Card key={card.id} className="p-6 bg-gradient-to-br from-chart-1 to-chart-1/80 text-white">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Debit Card</p>
                    <p className="font-semibold">{account?.account_name}</p>
                  </div>
                  <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-sm opacity-75 mb-2">Card Number</p>
                  <p className="font-mono text-lg font-semibold tracking-wider">{card.card_number}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-75">Card Holder</p>
                    <p className="font-semibold">{card.cardholder_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">Expires</p>
                    <p className="font-semibold">{card.expiry_date}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Credit Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Credit Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creditCards.map((card) => {
            const account = mockAccounts.find(a => a.id === card.account_id)
            return (
              <Card key={card.id} className="p-6 bg-gradient-to-br from-chart-4 to-chart-4/80 text-white">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Credit Card</p>
                    <p className="font-semibold">{account?.account_name}</p>
                  </div>
                  <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-sm opacity-75 mb-2">Card Number</p>
                  <p className="font-mono text-lg font-semibold tracking-wider">{card.card_number}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-75">Card Holder</p>
                    <p className="font-semibold">{card.cardholder_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">Expires</p>
                    <p className="font-semibold">{card.expiry_date}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Card Management */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Card Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockCards.map((card) => (
            <div key={card.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium">{card.card_number}</p>
                <p className="text-sm text-muted-foreground capitalize">{card.card_type} Card</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
