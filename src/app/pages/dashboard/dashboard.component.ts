import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService } from '../../services/banking.service';
import { CurrencyNairaPipe } from '../../pipes/currency-naira.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyNairaPipe, LucideAngularModule],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground">Dashboard</h1>
        <p class="text-muted-foreground mt-2">Welcome back! Here's your financial overview.</p>
      </div>

      <!-- Total Balance Card -->
      <div class="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 shadow-lg">
        <p class="text-sm opacity-90 mb-2">Total Balance</p>
        <h2 class="text-4xl font-bold">{{ totalBalance | currencyNaira }}</h2>
        <div class="mt-6 flex justify-between items-end">
          <div>
            <p class="text-xs opacity-75">Account Type</p>
            <p class="font-semibold">Multi-Account</p>
          </div>
          <i-lucide name="trend-up-icon" size="32" class="opacity-50"></i-lucide>
        </div>
      </div>

      <!-- Accounts Overview -->
      <div>
        <h3 class="text-2xl font-semibold text-foreground mb-4">Your Accounts</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div *ngFor="let account of accounts" class="bg-card border border-border rounded-lg p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <p class="text-sm text-muted-foreground">{{ account.name }}</p>
                <p class="font-semibold text-foreground">{{ account.balance | currencyNaira }}</p>
              </div>
              <i-lucide name="credit-card" size="20" class="text-primary"></i-lucide>
            </div>
            <p class="text-xs text-muted-foreground">Account: {{ account.accountNumber }}</p>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div>
        <h3 class="text-2xl font-semibold text-foreground mb-4">Recent Transactions</h3>
        <div class="bg-card border border-border rounded-lg overflow-hidden">
          <div class="divide-y divide-border">
            <div *ngFor="let transaction of (transactions | slice:0:5)" class="p-4 flex justify-between items-center hover:bg-secondary/30 transition-colors">
              <div class="flex items-center gap-4">
                <div [ngClass]="{
                  'bg-destructive/10': transaction.type === 'debit',
                  'bg-accent/10': transaction.type === 'credit'
                }" class="p-3 rounded-lg">
                  <i-lucide [name]="transaction.type === 'debit' ? 'arrow-down' : 'arrow-up'" size="20"
                    [ngClass]="{ 'text-destructive': transaction.type === 'debit', 'text-accent': transaction.type === 'credit' }"></i-lucide>
                </div>
                <div>
                  <p class="font-semibold text-foreground">{{ transaction.description }}</p>
                  <p class="text-sm text-muted-foreground">{{ transaction.category }}</p>
                </div>
              </div>
              <p [ngClass]="{
                'text-destructive': transaction.type === 'debit',
                'text-accent': transaction.type === 'credit'
              }" class="font-semibold">
                {{ transaction.type === 'debit' ? '-' : '+' }}{{ transaction.amount | currencyNaira }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  totalBalance = 0;
  accounts: any[] = [];
  transactions: any[] = [];

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.bankingService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
      this.totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    });

    this.bankingService.transactions$.subscribe(transactions => {
      this.transactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }
}
